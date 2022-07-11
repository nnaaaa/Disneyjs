import { Connection } from "../../client";
import { Client } from "../../client/interface";
import { ChannelEntity } from "../../shared/entities";
import {
  ChannelSocketEvent,
  MessageSocketEvent,
  RoleSocketEvent
} from "../../shared/socket/event";
import { Service } from "../interface";
import { BotInputMessage } from "../message/message.dto";
import { BotInputChannel } from "./channel.dto";

export class ChannelService extends Service {
  private _channel!: ChannelEntity;

  constructor(_client: Client, private _connection: Connection) {
    super();
    this._route = `${_client.bot.botId}/message`;
  }

  public get data() {
    if (!this._channel) throw new Error("Channel is not initialized");
    return this._channel;
  }

  public send(message: BotInputMessage, channel?: ChannelEntity) {
    const existChannel = this.worker.guild.categories
      .map((c) => c.channels)
      .flat()
      .find(
        (c) =>
          c.name.toLowerCase() === channel?.name.toLowerCase() ||
          c.channelId === channel?.channelId
      );
    if (!existChannel) {
      throw new Error("Channel not found");
    }
    this._connection.message.emit(MessageSocketEvent.CREATE, {
      message,
      channel: existChannel ? existChannel : this._channel,
      member: this.worker.botMember,
      memberId: this.worker.botMember.memberId,
    });
  }

  public withIdOrName(channelNameOrId: string) {
    const existChannel = this.worker.guild.categories
      .map((c) => c.channels)
      .flat()
      .find(
        (c) =>
          c.name.toLowerCase() === channelNameOrId.toLowerCase() ||
          c.channelId === channelNameOrId
      );

    if (!existChannel) {
      throw new Error("Channel not found");
    }

    return {
      send: (message: BotInputMessage) => this.send(message, existChannel),
      update: async (channel: BotInputChannel) => {
        this._connection.channel.emit(ChannelSocketEvent.UPDATE, {
          channel: { channelId: existChannel.channelId, ...channel },
          memberId: this.worker.botMember.memberId,
        });
      },
      addMember: async (memberNicknameOrId: string) => {
        await this.updateMemberOfChannel(
          ChannelSocketEvent.ADD_MEMBER,
          existChannel.channelId,
          memberNicknameOrId
        );
      },
      removeMember: async (memberNicknameOrId: string) => {
        await this.updateMemberOfChannel(
          ChannelSocketEvent.REMOVE_MEMBER,
          existChannel.channelId,
          memberNicknameOrId
        );
      },
      addRole: async (roleNameOrId: string) => {
        await this.updateRoleOfChannel(
          RoleSocketEvent.ADD_TO_CHANNEL,
          existChannel.channelId,
          roleNameOrId
        );
      },
      removeRole: async (roleNameOrId: string) => {
        await this.updateRoleOfChannel(
          RoleSocketEvent.REMOVE_FROM_CHANNEL,
          existChannel.channelId,
          roleNameOrId
        );
      },
    };
  }

  public setChannel(channel: ChannelEntity) {
    this._channel = channel;
  }

  public inCategory(categoryNameOrId: string) {
    const category = this.worker.guild.categories.find(
      (c) =>
        c.name.toLowerCase() === categoryNameOrId.toLowerCase() ||
        c.categoryId === categoryNameOrId
    );

    if (!category) {
      throw new Error("Category not found");
    }

    return {
      create: (channel: BotInputChannel) => {
        this._connection.channel.emit("create", {
          channel,
          category,
          firstMember: this.worker.botMember,
          memberId: this.worker.botMember.memberId,
        });
      },
    };
  }

  private async updateMemberOfChannel(
    event: ChannelSocketEvent,
    channelId: string,
    memberNicknameOrId: string
  ) {
    const existMember = this.worker.guild.members.find(
      (m) =>
        m.nickname.toLowerCase() === memberNicknameOrId.toLowerCase() ||
        m.memberId === memberNicknameOrId
    );

    if (!existMember) {
      throw new Error("Member not found");
    }

    this._connection.channel.emit(event, {
      channel: { channelId, memberId: existMember.memberId },
      memberId: this.worker.botMember.memberId,
    });
  }

  private async updateRoleOfChannel(
    event: RoleSocketEvent,
    channelId: string,
    roleNameOrId: string
  ) {
    const existRole = this.worker.guild.roles.find(
      (r) =>
        r.name.toLowerCase() === roleNameOrId.toLowerCase() ||
        r.roleId === roleNameOrId
    );

    if (!existRole) {
      throw new Error("Role not found");
    }

    this._connection.role.emit(event, {
      channel: { channelId, roleId: existRole.roleId },
      memberId: this.worker.botMember.memberId,
    });
  }
}
