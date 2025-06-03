import React, { useState } from "react";
import "../css/ScheduleMessage.css";

const ScheduleMessage = () => {
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [response, setResponse] = useState(null);

  const scheduleMessage = async () => {
    const token = localStorage.getItem("slack_token");

    if (!token || !channel || !message || !time) {
      alert("Please fill all fields");
      return;
    }

    const unixTime = Math.floor(new Date(time).getTime() / 1000); 
       
    try {  
      if(unixTime <= Math.floor(Date.now() / 1000)){ alert("Please select a future time to schedule message.");}

      else{
      const res = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel: channel,
          text: message,
          post_at: unixTime,
        }),
      });

      const data = await res.json();
      setResponse(data);

    }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="schedule-container">
      <h2>⏰ Schedule Message</h2>
      <input
        type="text"
        placeholder="Channel ID"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        className="schedule-input"
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="schedule-textarea"
      />
      <input
        type="datetime-local"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="schedule-input"
      />
      <button onClick={scheduleMessage} className="schedule-button">
        Schedule
      </button>

      {response && (
        <p
          className="schedule-response"
          style={{ color: response.ok ? "lime" : "red" }}
        >
          {response.ok
            ? "✅ Message Scheduled!"
            : `❌ ${response.error}`}
        </p>
      )}
    </div>
  );
};

export default ScheduleMessage;
