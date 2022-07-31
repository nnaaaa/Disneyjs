import { Connection } from '../../client';
import { Client } from '../../client/interface';
import { ActionEntity, GuildEntity, MessageEntity } from '../../shared/entities';
import { MessageSocketEvent } from '../../shared/socket/event';
import { SocketNamespace } from '../../shared/socket/namespace';
import { Service } from '../interface';
import { Worker } from '../worker';
import { MessageAction } from './action.service';
import { BotInputMessage, InspectedCommand } from './message.dto';

export class MessageService extends Service {
  private _message!: MessageEntity;
  private _action: MessageAction;
  private _inspectedCommand!: InspectedCommand;

  constructor(private _client: Client, private _connection: Connection, initMessage?: MessageEntity) {
    super();
    this._route = `${_client.bot.info.botId}/${SocketNamespace.MESSAGE}`;
    if (initMessage) {
      this._message = initMessage
    }

    this._action = new MessageAction();
  }


  onCreate(callback: (props: { worker: Worker }) => void): void {
    this._connection.message.on(
      `${this._route}/create`,
      (
        message: MessageEntity,
        inspectedCommand: InspectedCommand,
        guild: GuildEntity
      ) => {
        const member = this._client.bot.info.joinedGuilds.find(
          g => g.guild.guildId === guild.guildId
        );

        if (!member) {
          throw new Error('Bot is not in this guild');
        }

        this._inspectedCommand = inspectedCommand;
        this._message = message;

        const worker = new Worker(this._connection.message, member, guild);

        this.setWorker(worker);

        callback({ worker });
      }
    );
  }

  onUpdate(callback: (args: Partial<MessageEntity>) => void): void {
    this._connection.message.on(`${this._route}/update`, callback);
  }

  onDelete(callback: (id: string) => void): void {
    this._connection.message.on(`${this._route}/delete`, callback);
  }


  async send(message: BotInputMessage) {
    const m = await new Promise<MessageEntity>(resolve => {
      this._connection.message.emit(MessageSocketEvent.CREATE, {
        message:{...message, action:this._action.getData()},
        channel: this._message.channel,
        member: this.worker.botMember,
        memberId: this.worker.botMember.memberId,
      }, (m: MessageEntity) => resolve(m));
    })
    this.updateAction(m.action)

    return this.clone().setMessage(m)
  }

  async edit(message: BotInputMessage) {
    const m = await new Promise<MessageEntity>(resolve => {
      this._connection.message.emit(MessageSocketEvent.UPDATE, {
        message: {
          ...message,
          action:message.action?.getData(),
          messageId: this._message.messageId,
        },
        memberId: this.worker.botMember.memberId,
      }, (m: MessageEntity) => resolve(m));
    })
    this.updateAction(m.action)

    return this.clone().setMessage(m)

  }

  public async reply(message: BotInputMessage) {
    const m = await new Promise<MessageEntity>(resolve => {
      this._connection.message.emit(MessageSocketEvent.CREATE, {
        message: {
          ...message,
          action:message.action?.getData(),
          messageId: this._message.messageId,
        },
        member: this.worker.botMember,
        replyTo: this._message.messageId,
        memberId: this.worker.botMember.memberId,
      }, (m: MessageEntity) => resolve(m));
    })
    this.updateAction(m.action)

    return this.clone().setMessage(m)
  }

  public setMessage(message: MessageEntity) {
    this._message = message
    return this
  }
  public setAction(action:MessageAction) {
    this._action = action
  }
  public updateAction(action: ActionEntity) {
    this._action.setId(action.actionId).setConnection(this._connection);
  }
  public get data() {
    if (!this._message) throw new Error('Message is not initialized');
    return this._message;
  }

  public get command() {
    return this._inspectedCommand;
  }

  public get action() {
    return this._action
  }

  clone() {
    const newService = new MessageService(this._client, this._connection);
    newService.setWorker(this.worker);
    newService.setMessage(this._message);
    newService._action = this._action;
    return newService
  }
}
