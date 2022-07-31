import { Connection } from "../../client";
import { EmojiEntity, ReactEntity } from "../../shared";
import { ActionEntity } from "../../shared/entities/action.entity";
import { ButtonEntity } from "../../shared/entities/button.entity";
import { OptionEntity } from "../../shared/entities/option.entity";
import { SelectEntity } from "../../shared/entities/select.entity";
import { ButtonSocketEmit, ReactSocketEmit, SelectSocketEmit } from "../../shared/socket/emit";
import { SocketNamespace } from "../../shared/socket/namespace";
import { MessageButton } from "./button.service";
import { MessageSelect } from "./select.service";


export class MessageAction implements Partial<ActionEntity>{
    buttons: Partial<ButtonEntity>[] = [];
    reacts: Partial<ReactEntity>[] = [];
    selects: Partial<SelectEntity>[] = [];
    private _actionId!: string
    private _connection!: Connection

    clearButton() {
        this.buttons = []
        return this
    }
    clearReact(){
        this.reacts = []
        return this
    }
    clearSelect() {
        this.selects = []
        return this
    }
    clearAction() {
        this.clearButton()
        this.clearReact()
        this.clearSelect()
        return this
    }

    addButton(button: MessageButton) {
        this.buttons.push(button.getData());
        return this
    }
    addButtons(buttons: MessageButton[]) {
        this.buttons = this.buttons.concat(buttons.map(button => button.getData()))
        return this
    }
    

    addReact(emoji: EmojiEntity) {
        this.reacts.push({
            emoji,
        })
        return this
    }
    addReacts(emojis: EmojiEntity[]) {
        this.reacts = this.reacts.concat(emojis.map(emoji => ({
            emoji,
        })))
        return this
    }

    addSelect(select: MessageSelect) {
        this.selects.push(select.getData())
        return this
    }

    getData() {
        return {
            buttons: this.buttons,
            reacts: this.reacts,
            selects: this.selects,
        }
    }

    setId(id: string) {
        this._actionId = id
        return this
    }
    setConnection(connection: Connection) {
        this._connection = connection
        return this
    }

    onButtonClick(callback: (button: ButtonEntity) => void) {
        this.checkId()
        this._connection.button.on(`${this._actionId}/${SocketNamespace.BUTTON}/${ButtonSocketEmit.CLICK}`, (button: ButtonEntity) => {
            callback(button)
        })
    }

    onReactCreate(callback: (react: ReactEntity) => void) {
        this.checkId()
        this._connection.react.on(`${this._actionId}/${SocketNamespace.REACT}/${ReactSocketEmit.CREATE}`, (react: ReactEntity) => {
            callback(react)
        })
    }

    onReactDelete(callback: (react: ReactEntity) => void) {
        this.checkId()
        this._connection.react.on(`${this._actionId}/${SocketNamespace.REACT}/${ReactSocketEmit.DELETE}`, (react: ReactEntity) => {
            callback(react)
        })
    }

    onSelect(callback: (option: OptionEntity) => void) {
        this.checkId()
        this._connection.select.on(`${this._actionId}/${SocketNamespace.SELECT}/${SelectSocketEmit.SELECT}`, (option: OptionEntity) => {
            callback(option)
        })
    }

    private checkId() {
        if (!this._actionId) throw new Error('Listener must be start in advance the message sent')
    }
}