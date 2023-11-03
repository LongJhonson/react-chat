import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { socket } from "./socket.js";
function App() {
  const input = useRef(null);
  const [messages, setMessages] = useState([]);

  socket.on("connect", () => {
    console.log("connected to server");
  });

  const handleChatMessage = (e) => {
    e.preventDefault();
    console.log("ref", input.current.value);
    socket.emit("chat message", input.current.value);
    input.current.value = "";
  };

  socket.on("chat message", (msg) => {
    setMessages([...messages, msg]);
  });

  return (
    <>
      <div className="form">
        <div className="messages">
          {messages.map((msg) => {
            return <div>{msg}</div>;
          })}
        </div>
        {/* <div className="input"> */}
          <form className="input" onSubmit={e => handleChatMessage(e)}>
            <input
              ref={input}
              type="text"
              placeholder="Type your message here"
            />
            <button type="submit">Send</button>
          </form>
        {/* </div> */}
      </div>
    </>
  );
}

export default App;
