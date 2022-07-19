import { Connection } from "../../client";
import { ActionEntity } from "../../shared/entities/action.entity";
import { ButtonEntity } from "../../shared/entities/button.entity";
import { ButtonSocketEmit } from "../../shared/socket/emit";
import { SocketNamespace } from "../../shared/socket/namespace";
import { MessageButton } from "./button.service";


export class MessageAction implements Partial<ActionEntity>{
    buttons: Partial<ButtonEntity>[] = [];
    private _actionId!: string
    private _connection!: Connection

    addButton(button: MessageButton){
        this.buttons.push(button.getData());
        return this
    }

    getData() {
        return {
            buttons: this.buttons
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
        this._connection.button.on(`${this._actionId}/${SocketNamespace.BUTTON}/${ButtonSocketEmit.CLICK}`, (button: ButtonEntity) => {
            callback(button)
        })
    }
}