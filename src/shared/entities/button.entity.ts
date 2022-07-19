import { ActionEntity } from "./action.entity"

export interface ButtonEntity {
    buttonId: string

    customId: string

    name: string

    action: ActionEntity
}
