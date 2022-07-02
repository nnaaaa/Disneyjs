import { Manager, Socket } from "socket.io-client";


export abstract class Service {
    protected connection: Socket;
    abstract onCreate(callback: (args: any) => void): void;
    abstract onUpdate(callback: (args: any) => void): void;
    abstract onDelete(callback: (args: any) => void): void;

    constructor(gateway: Manager, serviceName: string) {
        this.connection = gateway.socket(`/${serviceName}`);
    }
}
