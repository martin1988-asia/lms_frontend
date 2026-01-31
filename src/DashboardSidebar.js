import React from "react";
import { Link } from "react-router-dom";

function DashboardSidebar() {
  return (
    <div style={{
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      minHeight: "100vh",
      padding: "20px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ marginBottom: "30px", textAlign: "center" }}>Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/dashboard" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Overview
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/analytics" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Analytics
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/courses" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Courses
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/assignments" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Assignments
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/submissions" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Submissions
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/grades" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Gradebook
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/users" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            User Management
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/settings" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Settings
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/notifications" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Notifications
          </Link>
        </li>
        <li style={{ marginBottom: "15px" }}>
          <Link to="/messages" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Messages
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
