import React from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>💬 Slack Messaging Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/login">🔐 Login</Link>
        <Link to="/send">📤 Send Message</Link>
        <Link to="/schedule">⏰ Schedule Message</Link>
        <Link to="/retrieve">📩 Retrieve Message</Link>
        <Link to="/edit">✏️ Edit Message</Link>
        <Link to="/delete">🗑️ Delete Message</Link>
      </div>
    </div>
  );
};

export default Dashboard;
