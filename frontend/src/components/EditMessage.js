import React, { useState } from "react";
import "../css/EditMessage.css";

const EditMessage = () => {
  const [channel, setChannel] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [response, setResponse] = useState(null);

  const updateMessage = async () => {
    const token = localStorage.getItem("slack_token");

    if (!token || !channel || !timestamp || !newMessage) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://slackify-messenger-backend.onrender.com/api/edit", {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channel,
          ts: timestamp,
          text: newMessage,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="edit-container">
      <h2>✏️ Edit Message</h2>
      <input
        type="text"
        placeholder="Channel ID"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="edit-input"
      />
      <input
        type="text"
        placeholder="Message Timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        className="edit-input"
      />
      <textarea
        placeholder="New message content"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="edit-textarea"
      />
      <button onClick={updateMessage} className="edit-button">
        Update
      </button>

      {response && (
        <p
          className="edit-response"
          style={{ color: response.ok ? "lime" : "red" }}
        >
          {response.ok
            ? "✅ Message Updated Successfully!"
            : `❌ ${response.error}`}
        </p>
      )}
    </div>
  );
};

export default EditMessage;
