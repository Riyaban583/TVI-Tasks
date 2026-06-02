import { useState, useEffect } from "react";

import {
  sendMessage,
  subscribeToMessages,
} from "../services/messageService";
import { logMessageSent } from "../services/analyticsService";

function Chat({ user, handleLogout }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(
      (data) => {
        setMessages(data);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(message, user);
    logMessageSent();
    setMessage("");
  };

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>

      <button onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <h3>Messages</h3>

      <div
        style={{
          border: "1px solid black",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.name}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default Chat;