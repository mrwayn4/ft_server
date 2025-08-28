"use client"

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([])
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  function sendMessage() {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  }

  return (
    <div>
      <h1>Chat app</h1>
      <input
        type="text"
        value={messageInput}
        className="bg-amber-100"
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button className="bg-amber-500"onClick={sendMessage}>Send</button>

      <section>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </section>
    </div>
  );
}
