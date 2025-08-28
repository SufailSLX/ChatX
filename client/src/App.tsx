import { useEffect, useState } from "react";
import { socket } from "./lib/socket";

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.connect();
    socket.on("chat-message", (msg: string) =>
      setMessages(prev => [...prev, msg])
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat-message", input);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-96 p-4 bg-white shadow rounded">
        <h1 className="text-xl font-bold mb-2">Chat</h1>
        <div className="h-48 overflow-y-auto border mb-2 p-2">
          {messages.map((m, i) => (
            <div key={i} className="p-1 border-b">{m}</div>
          ))}
        </div>
        <div className="flex">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border p-1"
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
