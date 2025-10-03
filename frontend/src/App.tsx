
import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [messages, setMessages] = useState(["hi there","woo shang"]);

 const wsRef = useRef(WebSocket);
 
  

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/');


    ws.onmessage = ((event) => {
      setMessages((prev) => [...prev, event.data])
    })
    wsRef.current = ws;

    ws.onopen = (() => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    })

  },[])
  

  return (
    <div className="h-screen bg-black">
      
      <div className="h-[90vh]  p-4">

        {messages.map((msg, index) => (
          <span key={index} className="text-black rounded-md bg-white p-2 h-[5vh] flex  items-center mb-2 w-fit">
            {msg}
            
          </span>
        ))}
      </div>
      <div className="w-full h-[10vh] bg-white flex">
        <input id='message' type="text" className="flex-1 p" />
        <button onClick={() => {
          const message = document.getElementById('message')?.value;
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }));
        }} className="bg-purple-600 text-white p-4">Send message</button>
      </div>
    </div>
  );
}

export default App
