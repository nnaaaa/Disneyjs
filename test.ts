

import { ButtonStyle, MessageButton, MessageClient, MessageSelect, MessageSelectOption } from "./src";


class TestClient extends MessageClient{
    async ping() {
        this.message.action
            .addButton(new MessageButton().setName('ping'))
            .addButton(new MessageButton().setName('pong').setStyle(ButtonStyle.SECONDARY))
            .addSelect(new MessageSelect().addOptions([
                new MessageSelectOption().setValue('ping'),
                new MessageSelectOption().setValue('pong'),
            ]))
        const message = await this.message.send({ content: 'Ping to server' })
        
        message.action.onButtonClick(button => {
            console.log(button)
        })

        message.action.onSelect(option => {
            console.log(option)
        })
    }
}

const client = new TestClient()

client.login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6IjQ4MmZlNWEyLWVmMWYtNDUxMC1hZWI4LTY4MDE1MmU2N2E5MCIsImlhdCI6MTY1OTI3Nzg1Nn0.a5XlS9PFLtOdh9UsmUPWTWhWgZWdR0MKjCTYwmyWHB4');

