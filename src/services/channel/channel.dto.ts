import { ChannelEntity } from "../../shared/entities";

export type BotInputChannel = Partial<
  Pick<ChannelEntity, "name" | "isPrivate">
>;
