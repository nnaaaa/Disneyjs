import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EmojiEntity } from './emoji.entity'
import { MemberEntity } from './member.entity'
import { MessageEntity } from './message.entity'

@Entity()
export class ReactEntity {
    @PrimaryGeneratedColumn('uuid')
    reactId: string

    @ManyToOne(() => MemberEntity, (type) => type.sentReacts, { onDelete: 'CASCADE' })
    author: MemberEntity

    @ManyToOne(() => MessageEntity, (type) => type.reacts, { onDelete: 'CASCADE' })
    message: MessageEntity

    @ManyToOne(() => EmojiEntity, (type) => type.reacts, { onDelete: 'CASCADE' })
    emoji: EmojiEntity
}
