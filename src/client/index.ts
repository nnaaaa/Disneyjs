import { Manager, Socket } from "socket.io-client";
import { Config } from "../shared";
import { MessageService } from "./services/message.service";



class Client {
  private _accessToken!: string;
  private _gateway!: Manager;
  private _messageService!: MessageService;

  constructor() {}

  login(token: string) {
    if (!token) throw new Error("Token is required");

    this._accessToken = token;
    this._gateway = new Manager(Config.SERVER_HOST, {
      transportOptions: {
        polling: { extraHeaders: { authorization: `Bearer ${token}` } },
      },
    });
    this._messageService = new MessageService(this._gateway);
    console.log("💖 Login with token:", token);
  }

  public get MessageService() {
    if (!this._accessToken) throw new Error("Token is required");
    return this._messageService;
  }
}

export { Client };
