import { ButtonEntity, ButtonStyle } from "../../shared/entities/button.entity";


export class MessageButton{
    private _name!: string;
    private _customId!: string;
    private _isDisabled!: boolean;
    private _style!: ButtonStyle;

    setName(name: string) {
        this._name = name;
        return this
    }

    setCustomId(customId: string) {
        this._customId = customId;
        return this
    }
    setDisabled(disabled: boolean) {
        this._isDisabled = disabled;
        return this
    }
    setStyle(style: ButtonStyle) {
        this._style = style;
        return this
    }

    getData():Partial<ButtonEntity> {
        return {
            name: this._name,
            customId: this._customId,
            isDisabled: this._isDisabled,
            style: this._style
        }
    }
}

export { ButtonStyle }
