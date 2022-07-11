import { Manager, Socket } from "socket.io-client";
import { SocketNamespace } from "../shared/constant";

export class Connection {
  readonly message!: Socket;
  readonly channel!: Socket;
  readonly role!: Socket;
  constructor(gateway: Manager) {
    this.message = gateway.socket(`/${SocketNamespace.MESSAGE}`);
    this.channel = gateway.socket(`/${SocketNamespace.CHANNEL}`);
    this.role = gateway.socket(`/${SocketNamespace.ROLE}`);
  }
}
