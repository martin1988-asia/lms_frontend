import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ role, darkMode }) {
  const linkStyle = {
    display: "block",
    padding: "10px 15px",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "8px"
  };

  const activeLinkStyle = {
    background: darkMode ? "#3498db" : "#1abc9c",
    fontWeight: "bold"
  };

  const sidebarStyles = {
    width: "220px",
    background: darkMode ? "#111" : "#34495e",
    color: "#fff",
    minHeight: "100vh",
    padding: "20px",
    boxSizing: "border-box"
  };

  return (
    <aside style={sidebarStyles}>
      <h3 style={{ marginBottom: "20px" }}>Navigation</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {role === "student" && (
          <>
            <li><NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink></li>
            <li><NavLink to="/courses" style={linkStyle} activeStyle={activeLinkStyle}>Courses</NavLink></li>
            <li><NavLink to="/assignments" style={linkStyle} activeStyle={activeLinkStyle}>Assignments</NavLink></li>
            <li><NavLink to="/grades" style={linkStyle} activeStyle={activeLinkStyle}>Grades</NavLink></li>
          </>
        )}
        {role === "instructor" && (
          <>
            <li><NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink></li>
            <li><NavLink to="/manage-courses" style={linkStyle} activeStyle={activeLinkStyle}>Manage Courses</NavLink></li>
            <li><NavLink to="/grade-submissions" style={linkStyle} activeStyle={activeLinkStyle}>Grade Submissions</NavLink></li>
          </>
        )}
        {role === "admin" && (
          <>
            <li><NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink></li>
            <li><NavLink to="/users" style={linkStyle} activeStyle={activeLinkStyle}>User Management</NavLink></li>
            <li><NavLink to="/analytics" style={linkStyle} activeStyle={activeLinkStyle}>Analytics</NavLink></li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
