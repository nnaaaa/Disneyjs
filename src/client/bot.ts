import axios from "axios";
import { Config } from "../shared";
import { BotEntity, MemberEntity } from "../shared/entities";
import { MemberSocketEmit } from "../shared/socket/emit";
import { SocketNamespace } from "../shared/socket/namespace";
import { Connection } from "./connection";

export class BotInfo {
    private _info!: BotEntity
    constructor(private _connection: Connection) {

    }
    async getInfo(token: string) {
        try {
            this._info = (
                await axios.get<BotEntity>(`${Config.SERVER_HOST}/bot`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
            ).data;
        } catch {
            throw new Error('Token is invalid or expired');
        }
    }

    listenUpdate() {
        this._connection.member.on(`${this._info.botId}/${SocketNamespace.MEMBER}/${MemberSocketEmit.JOIN}`, (member: MemberEntity) => {
            this._info.joinedGuilds.push(member);
        })
        this._connection.member.on(`${this._info.botId}/${SocketNamespace.MEMBER}/${MemberSocketEmit.LEAVE}`, (member: MemberEntity) => {
            this._info.joinedGuilds = this._info.joinedGuilds.filter(m => m.memberId !== member.memberId);
        })
    }

    public get info() {
        return this._info;
    }
}