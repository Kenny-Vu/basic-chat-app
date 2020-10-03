import React, { useState, useContext, useEffect } from "react";
import io from "socket.io-client";

import "./Chat.css";
import { UserContext } from "./UserContext";

const BASE_URL = "http://localhost:8000/"; //PORT of the server

let socket;

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("user-connects", {
      username: userInfo.username,
      room: userInfo.room,
    });
    socket.on("welcome-user", ({ text }) => {
      setMessages((prev) => [...prev, text]);
    });
    socket.on("display-message", ({ text, username }) => {
      setMessages((prev) => [...prev, text]);
    });
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setMessages((prev) => [...prev, input]);
    socket.emit("send-message", {
      text: input,
      username: userInfo.username,
      room: userInfo.room,
    });
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <span key={`message-${index}`} className="message">
            {message}
          </span>
        ))}
      </div>
      <form className="chat-form">
        <textarea
          className="chat-input"
          placeholder="write something bro..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitMessage(e);
            }
          }}
        ></textarea>
        <button
          className="chat-button"
          onClick={(e) => {
            submitMessage(e);
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
