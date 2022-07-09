import axios from "axios";
import { Manager } from "socket.io-client";
import { Config } from "../shared";
import { BotEntity } from "../shared/entities/bot.entity";
import { MessageService, MessageWorker } from "./services";

class Client {
  private _accessToken!: string;
  private _gateway!: Manager;
  private _messageService!: MessageService;
  private _bot!: BotEntity;

  private _messageWorker!: MessageWorker;

  constructor() {}

  async login(token: string) {
    try {
      this._accessToken = token;
      try {
        this._bot = (
          await axios.get<BotEntity>(`${Config.SERVER_HOST}/bot`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ).data;
      } catch {
        throw new Error("Token is invalid or expired");
      }
      this._gateway = new Manager(Config.SERVER_HOST, {
        transportOptions: {
          polling: { extraHeaders: { authorization: `Bearer ${token}` } },
        },
      });
      // const botInfo = await new Promise(resolve => {
      //   this._gateway.socket('/bot').emit('doesOtherSocketAgree', 'test', (answer:any) => {
      //     resolve(answer);
      //   });
      // });

      // console.log(botInfo)

      this._messageService = new MessageService(this);
      console.log("💖 Login successfully");

      for (const command of this._bot.commands) {
        if (!(this as any)[command.name as any]) {
          throw new Error(
            `${this._bot.name}.[${command.name}] command is not implemented`
          );
        }
      }

      this._messageService.onCreate((worker) => {
        this._bot.commands.forEach((command) => {
          if (worker.commandName && command.name === worker.commandName) {
            this._messageWorker = worker;
            (this as any)[command.name as any](...worker.args);
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  public get msgService() {
    if (!this._accessToken) throw new Error("Token is required");
    if (!this._messageService)
      throw new Error("Message Service is not initialized");
    return this._messageService;
  }

  public get Bot() {
    if (!this._accessToken) throw new Error("Token is required");
    if (!this._bot) throw new Error("Bot is not identified");

    return this._bot;
  }

  public get gateway() {
    if (!this._accessToken) throw new Error("Token is required");
    if (!this._gateway) throw new Error("Gateway is not initialized");

    return this._gateway;
  }

  public get onCreateMessage() {
    return this.msgService.onCreate;
  }

  public get msgWorker() {
    if (!this._messageWorker)
      throw new Error("Worker is not initialized because no event listened");

    return this._messageWorker;
  }
}

export { Client };
export * from "./services";
