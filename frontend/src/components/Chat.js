import React, { useState } from "react";

import "./Chat.css";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const submitMessage = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setMessages((prev) => [...prev, input]);
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
