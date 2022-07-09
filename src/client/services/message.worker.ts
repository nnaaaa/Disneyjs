import { Socket } from "socket.io-client";
import { GuildEntity } from "../../shared/entities/guild.entity";
import { MemberEntity } from "../../shared/entities/member.entity";
import { MessageEntity } from "../../shared/entities/message.entity";
import { MessageSocketEvent } from "../../shared/socket/event";
import { InspectedCommand } from "./message.dto";

export class MessageWorker {
  constructor(
    private _connection: Socket,
    private _botMember: MemberEntity,
    private _message: Partial<MessageEntity>,
    private _inspectedCommand: InspectedCommand,
    private _guild: GuildEntity
  ) {}

  send(message: Partial<Pick<MessageEntity, "content" | "images">>) {
    this._connection.emit(MessageSocketEvent.CREATE, {
      message,
      channel: this._message.channel,
      member: this._botMember,
      memberId: this._botMember.memberId,
    });
  }

  reply(message: Partial<Pick<MessageEntity, "content" | "images">>) {
    this._connection.emit(MessageSocketEvent.CREATE, {
      message,
      channel: this._message.channel,
      member: this._botMember,
      replyTo: this._message.messageId,
      memberId: this._botMember.memberId,
    });
  }

  public get message() {
    return this._message;
  }
  public get guild() {
    return this._guild;
  }

  public get args() {
    return this._inspectedCommand.args;
  }

  public get commandName() {
    return this._inspectedCommand.commandName;
  }
}
