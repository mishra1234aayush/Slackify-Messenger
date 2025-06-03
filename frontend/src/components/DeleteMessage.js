import React, { useState } from "react";
import "../css/DeleteMessage.css";

const DeleteMessage = () => {
  const [channel, setChannel] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [response, setResponse] = useState(null);

  const deleteMessage = async () => {
    const token = localStorage.getItem("slack_token");
     console.log(channel,timestamp);
     
    if (!token || !channel || !timestamp) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/delete", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channel,
          ts: timestamp,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="delete-container">
      <h2>🗑️ Delete Message</h2>
      <input
        type="text"
        placeholder="Channel ID"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="delete-input"
      />
      <input
        type="text"
        placeholder="Message Timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        className="delete-input"
      />
      <button onClick={deleteMessage} className="delete-button">
        Delete Message
      </button>

      {response && (
        <p
          className="delete-response"
          style={{ color: response.ok ? "lime" : "red" }}
        >
          {response.ok
            ? "✅ Message Deleted Successfully!"
            : `❌ ${response.error}`}
        </p>
      )}
    </div>
  );
};

export default DeleteMessage;
