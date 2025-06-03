import React, { useState } from "react";
import "../css/Login.css";

const Login = () => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = () => {
    if (!token) {
      setStatus("❌ Please enter your Slack token");
      return;
    }

    localStorage.setItem("slack_token", token);
    setStatus("✅ Login successful! Token saved.");
  };

  return (
    <div className="login-container">
      <h2>🔐 Slack API Login</h2>
      <input
        type="password"
        placeholder="Enter Slack Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="login-status">{status}</div>
    </div>
  );
};

export default Login;
