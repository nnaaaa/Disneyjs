import { ActionEntity } from "./action.entity"

export enum ButtonStyle{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface ButtonEntity {
    buttonId: string

    customId: string

    name: string

    isDisabled: boolean

    style: ButtonStyle
    
    action: ActionEntity
}
