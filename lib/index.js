"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const manager = new socket_io_client_1.Manager("http://localhost:5000");
const client = manager.socket("/message");
client.on("connect", () => {
  console.log("💚 connected");
});
client.on("disconnect", () => {
  console.log("💛 disconnected");
});
client.on("1c76c87b-aa26-4e62-a378-1f563f0d5b6e/create", (data) => {
  console.log(data);
});
