import React, { useState } from "react";
import "../css/SendMessage.css";

const SendMessage = () => {
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);

  const sendMessage = async () => {
    const token = localStorage.getItem("slack_token");

    if (!token || !channel || !message) {
      alert("Please fill all fields and login first");
      return;
    }

    try {
      const res = await fetch("https://slackify-messenger-backend.onrender.com/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channel,
          text: message,
        }),
      });

      const data = await res.json();
      console.log(data);
      
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="send-container">
      <h2>📤 Send Message</h2>
      <input
        type="text"
        placeholder="Channel ID (e.g., #general or C01...)"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="send-input"
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="send-textarea"
      />
      <button onClick={sendMessage} className="send-button">
        Send Message
      </button>

      {response && (
        <p
          className="send-response"
          style={{ color: response.ok ? "lime" : "red" }}
        >
          {response.ok ? "✅ Message Sent!" : `❌ ${response.error}`}
        </p>
      )}
    </div>
  );
};

export default SendMessage;
