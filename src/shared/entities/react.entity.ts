import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'
import { MessageEntity } from './message.entity'

export interface ReactEntity {
    reactId: string

    author: MemberEntity

    message: MessageEntity

    emoji: EmojiEntity
}
