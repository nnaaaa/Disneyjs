import { Socket } from "socket.io-client";
import { GuildEntity } from "../shared/entities/guild.entity";
import { MemberEntity } from "../shared/entities/member.entity";

export class Worker {
  constructor(
    private _connection: Socket,
    private _botMember: MemberEntity,
    private _guild: GuildEntity
  ) {}

  public get connection() {
    return this._connection;
  }

  public get botMember() {
    return this._botMember;
  }

  public get guild() {
    return this._guild;
  }
}
