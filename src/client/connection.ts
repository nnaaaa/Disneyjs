import { Manager, Socket } from 'socket.io-client';
import { SocketNamespace } from '../shared/socket/namespace';

export class Connection {
  readonly message!: Socket;
  readonly channel!: Socket;
  readonly role!: Socket;
  readonly member!: Socket;
  readonly action!: Socket;
  readonly button!: Socket;
  constructor(gateway: Manager) {
    this.message = gateway.socket(`/${SocketNamespace.MESSAGE}`);
    this.channel = gateway.socket(`/${SocketNamespace.CHANNEL}`);
    this.role = gateway.socket(`/${SocketNamespace.ROLE}`);
    this.member = gateway.socket(`/${SocketNamespace.MEMBER}`);
    this.action = gateway.socket(`/${SocketNamespace.ACTION}`);
    this.button = gateway.socket(`/${SocketNamespace.BUTTON}`);
  }
}
