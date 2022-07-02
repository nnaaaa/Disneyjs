import { Manager, Socket } from "socket.io-client";
import { MessageEntity } from "../../entities/message.entity";
import { ServiceName } from "../../shared/constant";
import { MessageSocketEvent } from "../../shared/socket/event";
import { Service } from "./interface";


export class MessageWorker{
    constructor(private _connection: Socket,private _message: Partial<MessageEntity>) {

    }

    send(message: Partial<Pick<MessageEntity, 'content' | 'images'>>) {
        console.log(message)
        this._connection.emit(MessageSocketEvent.CREATE, { message, channel: this._message.channel,member: this._message.author });
    }

    public get data(){return this._message}
}


export class MessageService extends Service {

    constructor(gateway: Manager) {
        super(gateway, ServiceName.MESSAGE);

    }

    onCreate(callback: (worker: MessageWorker) => void): void {
        this.connection.on("create", (message: MessageEntity) => callback(new MessageWorker(this.connection, message)));
    }

    onUpdate(callback: (args: Partial<MessageEntity>) => void): void {
        this.connection.on("update", callback);
    }

    onDelete(callback: (id: string) => void): void {
        this.connection.on("delete", callback);
    }

    send(message: MessageEntity): void {
        this.connection.emit('create', message);
    }
}