import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SendMessage from "./components/SendMessage";
import ScheduleMessage from "./components/ScheduleMessage";
import RetrieveMessage from "./components/RetrieveMessage";
import EditMessage from "./components/EditMessage";
import DeleteMessage from "./components/DeleteMessage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/send" element={<SendMessage />} />
        <Route path="/schedule" element={<ScheduleMessage />} />
        <Route path="/retrieve" element={<RetrieveMessage />} />
        <Route path="/edit" element={<EditMessage />} />
        <Route path="/delete" element={<DeleteMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
