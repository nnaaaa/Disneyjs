import { ChannelCategoryEntity } from './channelCategory.entity';
import { MemberEntity } from './member.entity';
import { MessageEntity } from './message.entity';
import { RoleEntity } from './role.entity';

export interface ChannelEntity {
  channelId: string;

  name: string;

  isPrivate: boolean;

  /** @relationship */
  messages: MessageEntity[];

  members: MemberEntity[];

  category: ChannelCategoryEntity;

  roles: RoleEntity[];
}
