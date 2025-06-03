import React, { useState } from "react";
import "../css/RetrieveMessage.css";

const RetrieveMessage = () => {
  const [channel, setChannel] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    const token = localStorage.getItem("slack_token");

    if (!token || !channel) {
      alert("Please enter channel ID and login first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/messages?channel=${channel}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.ok) {
        setMessages(data.messages);
        setError(null);
      } else {
        setError(data.error);
        setMessages([]);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err);
    }
  };

  return (
    <div className="retrieve-container">
      <h2>📩 Retrieve Messages</h2>
      <input
        type="text"
        placeholder="Enter Channel ID"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="retrieve-input"
      />
      <button onClick={fetchMessages} className="retrieve-button">
        Fetch Messages
      </button>

      {error && <p className="retrieve-error">❌ {error}</p>}

      <div className="retrieve-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="message-item">
            <p>{msg.text}</p>
            <small>⏱ {new Date(msg.ts * 1000).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetrieveMessage;
