import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#2c3e50",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#ecf0f1"
    }}>
      <h1 style={{ margin: 0, fontSize: "22px" }}>LMS</h1>
      <ul style={{
        listStyle: "none",
        display: "flex",
        gap: "20px",
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/courses" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Courses
          </Link>
        </li>
        <li>
          <Link to="/assignments" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Assignments
          </Link>
        </li>
        <li>
          <Link to="/grades" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Gradebook
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Settings
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" style={{ color: "#ecf0f1", textDecoration: "none" }}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
