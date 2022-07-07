import { Manager, Socket } from "socket.io-client";
import { Client } from "..";

export abstract class Service {
  protected connection: Socket;
  abstract onCreate(callback: (args: any) => void): void;
  abstract onUpdate(callback: (args: any) => void): void;
  abstract onDelete(callback: (args: any) => void): void;

  constructor(client: Client, serviceName: string) {
    this.connection = client.gateway.socket(`/${serviceName}`);
  }
}
