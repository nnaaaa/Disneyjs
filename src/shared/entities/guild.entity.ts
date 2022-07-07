import { ChannelCategoryEntity } from './channelCategory.entity'
import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'
import { RoleEntity } from './role.entity'

export interface GuildEntity {
    guildId: string

    name: string

    avatarUrl: string

    members: MemberEntity[]

    roles: RoleEntity[]

    emojis: EmojiEntity[]

    categories: ChannelCategoryEntity[]
}
