import { ActionEntity } from "./action.entity"
import { OptionEntity } from "./option.entity"

export enum SelectStyle{
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export interface SelectEntity{
    selectId: string

    customId: string

    isDisabled: boolean

    style: SelectStyle

    action: ActionEntity

    options: Partial<OptionEntity>[]
}