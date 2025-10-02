import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });



interface User{
   socket : WebSocket;
   room : string; 
}

var allSockets: User[] = [];

wss.on("connection", (ws) => {

   
   

   ws.on("message", (message) => {
      
      const parsedMessage = JSON.parse(message as unknown as string);
      if(parsedMessage.type === "join"){
            allSockets.push({
               socket: ws,
               room: parsedMessage.payload.roomId
            })
      }

      if(parsedMessage.type === "chat"){
         
         let currentUserRoom = null;

         for(let i = 0; i < allSockets.length; i++){
            if(allSockets[i]?.socket === ws){
               currentUserRoom = allSockets[i]?.room;
            }
         }

         for(let i = 0; i < allSockets.length; i++){
            if(allSockets[i]?.room == currentUserRoom){
               allSockets[i]?.socket.send(parsedMessage.payload.message)
            }
         }
      }


      
   })

});
