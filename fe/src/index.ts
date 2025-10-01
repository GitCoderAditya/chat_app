import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

var user = 0;

wss.on("connection", (ws) => {
   user = user + 1;

   console.log(`user ${user} connected`)
});
