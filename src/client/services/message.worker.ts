import { Socket } from "socket.io-client";
import { GuildEntity } from "../../shared/entities/guild.entity";
import { MessageEntity } from "../../shared/entities/message.entity";
import { MessageSocketEvent } from "../../shared/socket/event";

export class MessageWorker {
    constructor(
        private _connection: Socket,
        private _message: Partial<MessageEntity>,
        private _guild: GuildEntity
    ) { }

    send(message: Partial<Pick<MessageEntity, "content" | "images">>) {
        this._connection.emit(MessageSocketEvent.CREATE, {
            message,
            channel: this._message.channel,
            member: this._message.author,
        })
    }

    reply(message: Partial<Pick<MessageEntity, "content" | "images">>) {
        this._connection.emit(MessageSocketEvent.CREATE, {
            message,
            channel: this._message.channel,
            member: this._message.author,
            replyTo: this._message.messageId,
        });
    }

    public get message() {
        return this._message;
    }
    public get guild() {
        return this._guild;
    }
}