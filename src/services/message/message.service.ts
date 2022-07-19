import { Connection } from '../../client';
import { Client } from '../../client/interface';
import { GuildEntity, MessageEntity } from '../../shared/entities';
import { MessageSocketEvent } from '../../shared/socket/event';
import { SocketNamespace } from '../../shared/socket/namespace';
import { Service } from '../interface';
import { Worker } from '../worker';
import { BotInputMessage, InspectedCommand } from './message.dto';

export class MessageService extends Service {
  private _message!: MessageEntity;
  private _inspectedCommand!: InspectedCommand;

  constructor(private _client: Client, private _connection: Connection) {
    super();
    this._route = `${_client.bot.info.botId}/${SocketNamespace.MESSAGE}`;
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
        message,
        channel: this._message.channel,
        member: this.worker.botMember,
        memberId: this.worker.botMember.memberId,
      }, (m: MessageEntity) => resolve(m));
    })

    if (m.action.actionId && message.action) {
      message.action
        .setId(m.action.actionId)
        .setConnection(this._connection);
    }
    const newService = new MessageService(this._client, this._connection);
    newService.setWorker(this.worker);
    newService._message = m;

    return newService
  }

  async edit(message: BotInputMessage) {
    const m = await new Promise<MessageEntity>(resolve => {
      this._connection.message.emit(MessageSocketEvent.UPDATE, {
        message: {
          ...message,
          messageId: this._message.messageId,
        },
        memberId: this.worker.botMember.memberId,
      }, (m: MessageEntity) => resolve(m));
    })

    const newService = new MessageService(this._client, this._connection);
    newService.setWorker(this.worker);
    newService._message = m;

    return newService
  }

  reply(message: BotInputMessage) {
    this._connection.message.emit(MessageSocketEvent.CREATE, {
      message,
      channel: this._message.channel,
      member: this.worker.botMember,
      replyTo: this._message.messageId,
      memberId: this.worker.botMember.memberId,
    });
  }
  public get data() {
    if (!this._message) throw new Error('Message is not initialized');
    return this._message;
  }

  public get command() {
    return this._inspectedCommand;
  }
}
