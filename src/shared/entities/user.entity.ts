import { BotEntity } from './bot.entity'
import { MemberEntity } from './member.entity'
import { UserBeFriendEntity } from './userBeFriend.entity'

export interface UserEntity {
    userId: string

    account: string

    name: string

    avatarUrl: string

    lastLogin: Date

    isOnline: boolean

    friends: UserBeFriendEntity[]

    joinedGuilds: MemberEntity[]

    createdBots: BotEntity[]
}
