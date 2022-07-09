import { Client, MarkdownBuilder } from "./src";

class DatabaseClient extends Client {
  update() {}

  find(count: string, length: string) {
    this.msgWorker.reply({
      content: MarkdownBuilder.codeBlock(
        `const count = ${count}` + "\n" + `const length = ${length}`,
        "javascript"
      ),
    });
  }
}

const client = new DatabaseClient();

client.login(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3RJZCI6ImFjOTEyYzk5LTlhOWEtNDMzZS04ZWE4LWU1MmJhMDQ5MTA3ZCIsImlhdCI6MTY1NzMzMjk3NX0.MOIUY-R1uWKaPQY7VfelQRIoW6a2uFJ2uq9vJbLrlHw"
);
