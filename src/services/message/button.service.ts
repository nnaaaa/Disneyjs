

export class MessageButton{
    private _name!: string;
    private _customId!: string;
    setName(name: string) {
        this._name = name;
        return this
    }

    setCustomId(customId: string) {
        this._customId = customId;
        return this
    }

    getData() {
        return {
            name: this._name,
            customId: this._customId
        }
    }
}