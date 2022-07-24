import { SelectEntity } from "./select.entity"


export interface OptionEntity{
    optionId: string

    value: string

    description: string

    select: SelectEntity
}