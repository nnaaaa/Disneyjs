import { Client } from "../../client/interface";
import { GuildEntity, MessageEntity } from "../../shared/entities";
import { MessageSocketEvent } from "../../shared/socket/event";
import { Worker } from "../worker";
import { Service } from "../interface";
import { InspectedCommand, BotInputMessage } from "./message.dto";
import { Socket } from "socket.io-client";

export class MessageService extends Service {
  private _message!: MessageEntity;
  private _inspectedCommand!: InspectedCommand;

  constructor(private _client: Client, private _connection: Socket) {
    super();
    this._route = `${_client.bot.botId}/message`;
  }

  onCreate(callback: (props: { worker: Worker }) => void): void {
    this._connection.on(
      `${this._route}/create`,
      (
        message: MessageEntity,
        inspectedCommand: InspectedCommand,
        guild: GuildEntity
      ) => {
        const member = this._client.bot.joinedGuilds.find(
          (g) => g.guild.guildId === guild.guildId
        );

        if (!member) {
          throw new Error("Bot is not in this guild");
        }

        this._inspectedCommand = inspectedCommand;
        this._message = message;

        const worker = new Worker(this._connection, member, guild);

        this.setWorker(worker);

        callback({ worker });
      }
    );
  }

  onUpdate(callback: (args: Partial<MessageEntity>) => void): void {
    this._connection.on(`${this._route}/update`, callback);
  }

  onDelete(callback: (id: string) => void): void {
    this._connection.on(`${this._route}/delete`, callback);
  }

  send(message: BotInputMessage) {
    this._connection.emit(MessageSocketEvent.CREATE, {
      message,
      channel: this._message.channel,
      member: this.worker.botMember,
      memberId: this.worker.botMember.memberId,
    });
  }

  reply(message: BotInputMessage) {
    this._connection.emit(MessageSocketEvent.CREATE, {
      message,
      channel: this._message.channel,
      member: this.worker.botMember,
      replyTo: this._message.messageId,
      memberId: this.worker.botMember.memberId,
    });
  }
  public get data() {
    if (!this._message) throw new Error("Message is not initialized");
    return this._message;
  }

  public get command() {
    return this._inspectedCommand;
  }
}
