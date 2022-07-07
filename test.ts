import { Client } from "./src";


class DatabaseClient extends Client {
    update() {
        console.log(this.msgWorker.guild)
    }

    find() {
        console.log(this.msgWorker.message)
    }
}


const client = new DatabaseClient();

client.login(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6IjUxMDFhYjIwLTVlNTEtNGYxNi1hMTgyLTg0YzhjMmI4ZTU5ZSIsImlhdCI6MTY1NzE2NTc3MX0.QzweoN6o0QZNJPL6myzh5AP2Dd20uy6eXZ1dqCMcukE"
);

