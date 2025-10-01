import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

var user = 0;

var allSockets: WebSocket[] = [];

wss.on("connection", (ws) => {

   allSockets.push(ws);
   user = user + 1;

   console.log(`user ${user} connected`)

   ws.on("message", (message) => {
      console.log(`received: ${message}`);

      for(let i = 0; i < allSockets.length; i++){
         const s = allSockets[i];
         if (s) {
            s.send(`${message} : sent from server `)
         }
      }
   })

});
