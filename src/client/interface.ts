import axios from 'axios';
import { Manager } from 'socket.io-client';
import { Config } from '../shared';
import { BotEntity } from '../shared/entities/bot.entity';
import { Connection } from './connection';
import { MessageService, ChannelService } from '../services';

export abstract class Client {
  private _connection!: Connection;
  private _accessToken!: string;
  private _gateway!: Manager;
  private _bot!: BotEntity;

  private _messageService!: MessageService;
  private _channalService!: ChannelService;

  constructor() {}

  async login(token: string) {
    try {
      this._accessToken = token;
      try {
        this._bot = (
          await axios.get<BotEntity>(`${Config.SERVER_HOST}/bot`, {
            headers: { Authorization: `Bearer ${this._accessToken}` },
          })
        ).data;
      } catch {
        throw new Error('Token is invalid or expired');
      }

      this._gateway = new Manager(Config.SERVER_HOST, {
        transportOptions: {
          polling: {
            extraHeaders: { authorization: `Bearer ${this._accessToken}` },
          },
        },
      });

      this._connection = new Connection(this._gateway);

      this._messageService = new MessageService(this, this._connection.message);
      this._channalService = new ChannelService(this, this._connection);
      console.log('💖 Login successfully');

      //validate commands which user created to bot manager
      for (const command of this._bot.commands) {
        if (!(this as any)[command.name as any]) {
          throw new Error(
            `${this._bot.name}.[${command.name}] command is not implemented`
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**@return message received: MessageEntity */
  public get message() {
    if (!this._messageService)
      throw new Error('Message Service is not initialized');
    return this._messageService;
  }

  /**@return channel which received message: ChannelEntity */
  public get channel() {
    if (!this._channalService)
      throw new Error('Channel Service is not initialized');

    return this._channalService;
  }

  /**@return currentBot: BotEntity */
  public get bot() {
    if (!this._bot) throw new Error('Bot is not identified');

    return this._bot;
  }

  // public get onCreateMessage() {
  //   return this.msgService.onCreate;
  // }
}
