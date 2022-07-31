import { ActionEntity } from './action.entity';
import { ChannelEntity } from './channel.entity';
import { MemberEntity } from './member.entity';

export interface MessageEntity {
  messageId: string;

  content: string;

  images: string[];

  createdAt: Date;

  channel: ChannelEntity;

  author: MemberEntity;

  action: ActionEntity;

  replyTo: MessageEntity;
}
