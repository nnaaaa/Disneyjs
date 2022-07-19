import { ButtonEntity } from "./button.entity"
import { MessageEntity } from "./message.entity"
import { ReactEntity } from "./react.entity"

export interface ActionEntity {
    actionId: string

    reacts: ReactEntity[]

    buttons: Partial<ButtonEntity>[]

    message: MessageEntity
}
