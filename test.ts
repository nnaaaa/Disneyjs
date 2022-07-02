import { Client } from "./src";

const client = new Client();

client.login("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZWI0MjgyZS04MjBlLTQxZmQtOGI3Zi1lNDYyNmY1YjY3YTEiLCJpYXQiOjE2NTY2Nzc4NjAsImV4cCI6MTY1Njc2NDI2MH0.oaqBygXZBat6Hl5aQP5QuWb66YezOM6DCoV3h8ZrbT0");

const { MessageService } = client

MessageService.onCreate((newMessage) => {
  if (newMessage.data.content?.startsWith('.')) {
    newMessage.send({content:`Hello ${newMessage.data.author?.memberId}`})

  }
});
