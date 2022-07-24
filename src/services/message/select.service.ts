import { OptionEntity } from "../../shared/entities/option.entity";
import { SelectEntity, SelectStyle } from "../../shared/entities/select.entity";

export class MessageSelect{
    private _customId!: string;
    private _isDisabled!: boolean;
    private _style!: SelectStyle;
    private _options: Partial<OptionEntity>[] = []

    clearOption() {
        this._options = []
        return this
    }
    addOption(option: MessageSelectOption) {
        this._options.push(option.getData())
        return this
    }
    addOptions(options: MessageSelectOption[]) {
        this._options = this._options.concat(options.map(option => option.getData()))
        return this
    }


    setDisabled(disabled: boolean) {
        this._isDisabled = disabled;
        return this
    }

    setStyle(style: SelectStyle) {
        this._style = style;
        return this
    }

    setCustomId(customId: string) {
        this._customId = customId;
        return this
    }

    getData(): Partial<SelectEntity> {
        return {
            customId: this._customId,
            isDisabled: this._isDisabled,
            style: this._style,
            options: this._options
        }
    }

}

export class MessageSelectOption{
    private _description!: string;
    private _value!: string;

    setDescription(description: string) {
        this._description = description;
        return this
    }

    setValue(value: string) {
        this._value = value;
        return this
    }

    getData(): Partial<OptionEntity> {
        return {
            description: this._description,
            value: this._value
        }
    }
}

export { SelectStyle }
