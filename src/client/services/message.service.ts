import { Client } from "..";
import { SocketNamespace } from "../../shared/constant";
import { GuildEntity } from "../../shared/entities/guild.entity";
import { MessageEntity } from "../../shared/entities/message.entity";
import { Service } from "./interface";
import { InspectedCommand } from "./message.dto";
import { MessageWorker } from "./message.worker";

export class MessageService extends Service {
  private _route!: string;
  constructor(private _client: Client) {
    super(_client, SocketNamespace.MESSAGE);
    this._route = `${_client.Bot.botId}/message`;
  }

  onCreate(callback: (worker: MessageWorker) => void): void {
    this.connection.on(
      `${this._route}/create`,
      (
        message: MessageEntity,
        inspectedCommand: InspectedCommand,
        guild: GuildEntity
      ) => {
        const member = this._client.Bot.joinedGuilds.find(
          (g) => g.guild.guildId === guild.guildId
        );

        if (!member) {
          throw new Error("Bot is not in this guild");
        }

        callback(
          new MessageWorker(
            this.connection,
            member,
            message,
            inspectedCommand,
            guild
          )
        );
      }
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
