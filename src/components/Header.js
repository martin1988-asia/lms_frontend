import React from "react";
import { NavLink } from "react-router-dom";

function Header({ role, onLogout, onToggleTheme, darkMode }) {
  const linkStyle = {
    marginRight: "20px",
    color: "#fff",
    textDecoration: "none"
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline"
  };

  const navStyles = {
    background: darkMode ? "#111" : "#2c3e50",
    padding: "15px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  };

  return (
    <nav style={navStyles}>
      <span style={{ fontWeight: "bold", fontSize: "18px" }}>LMS Frontend</span>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {role === "student" && (
          <>
            <NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink>
            <NavLink to="/courses" style={linkStyle} activeStyle={activeLinkStyle}>Courses</NavLink>
            <NavLink to="/assignments" style={linkStyle} activeStyle={activeLinkStyle}>Assignments</NavLink>
            <NavLink to="/grades" style={linkStyle} activeStyle={activeLinkStyle}>Grades</NavLink>
          </>
        )}
        {role === "instructor" && (
          <>
            <NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink>
            <NavLink to="/manage-courses" style={linkStyle} activeStyle={activeLinkStyle}>Manage Courses</NavLink>
            <NavLink to="/grade-submissions" style={linkStyle} activeStyle={activeLinkStyle}>Grade Submissions</NavLink>
          </>
        )}
        {role === "admin" && (
          <>
            <NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink>
            <NavLink to="/users" style={linkStyle} activeStyle={activeLinkStyle}>User Management</NavLink>
            <NavLink to="/analytics" style={linkStyle} activeStyle={activeLinkStyle}>Analytics</NavLink>
          </>
        )}
        <button
          onClick={onToggleTheme}
          style={{
            background: darkMode ? "#3498db" : "#9b59b6",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "15px"
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={onLogout}
          style={{
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            padding: "8px 15px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
