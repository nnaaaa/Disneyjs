import { Client } from "..";
import { SocketNamespace } from "../../shared/constant";
import { GuildEntity } from "../../shared/entities/guild.entity";
import { MessageEntity } from "../../shared/entities/message.entity";
import { Service } from "./interface";
import { MessageWorker } from "./message.worker";




export class MessageService extends Service {
    private _route!: string
    constructor(client: Client) {
        super(client, SocketNamespace.MESSAGE);
        this._route = `${client.Bot.botId}/message`
    }

    onCreate(callback: (worker: MessageWorker) => void): void {
        this.connection.on(`${this._route}/create`, (message: MessageEntity, guild: GuildEntity) =>
            callback(new MessageWorker(this.connection, message, guild))
        );
    }

    onUpdate(callback: (args: Partial<MessageEntity>) => void): void {
        this.connection.on(`${this._route}/update`, callback);
    }

    onDelete(callback: (id: string) => void): void {
        this.connection.on(`${this._route}/delete`, callback);
    }

    send(message: MessageEntity): void {
        this.connection.emit("create", message);
    }
}
