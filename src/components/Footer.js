import React from "react";
import { NavLink } from "react-router-dom";

function Footer({ darkMode }) {
  const role = localStorage.getItem("role");

  const linkStyle = {
    color: "#3498db",
    textDecoration: "none",
    marginRight: "15px"
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline"
  };

  return (
    <footer style={{
      background: darkMode ? "#111" : "#2c3e50",
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      marginTop: "40px",
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 -2px 6px rgba(0,0,0,0.1)"
    }}>
      <p style={{ margin: "5px 0" }}>
        © {new Date().getFullYear()} LMS Project — Built with ❤️ by Higino
      </p>

      {/* Navigation Links */}
      <p style={{ margin: "5px 0", fontSize: "14px" }}>
        <NavLink to="/dashboard" style={linkStyle} activeStyle={activeLinkStyle}>Dashboard</NavLink>
        <NavLink to="/courses" style={linkStyle} activeStyle={activeLinkStyle}>Courses</NavLink>
        <NavLink to="/assignments" style={linkStyle} activeStyle={activeLinkStyle}>Assignments</NavLink>
        <NavLink to="/grades" style={linkStyle} activeStyle={activeLinkStyle}>Grades</NavLink>
      </p>

      {/* Compliance Links */}
      <p style={{ margin: "5px 0", fontSize: "13px" }}>
        <NavLink to="/terms" style={linkStyle} activeStyle={activeLinkStyle}>Terms of Service</NavLink>
        <NavLink to="/privacy" style={linkStyle} activeStyle={activeLinkStyle}>Privacy Policy</NavLink>
        <NavLink to="/support" style={linkStyle} activeStyle={activeLinkStyle}>Support</NavLink>
      </p>

      {/* Role-specific notes */}
      {role === "student" && (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Need help? Visit the <NavLink to="/help" style={linkStyle}>Help Center</NavLink>.
        </p>
      )}
      {role === "instructor" && (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Instructor resources available in the <NavLink to="/resources" style={linkStyle}>Resources Hub</NavLink>.
        </p>
      )}
      {role === "admin" && (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          System Version: 1.0.0 | Admin Dashboard
        </p>
      )}

      {/* Tech attribution */}
      <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "12px" }}>
        Powered by React & Chart.js ✨
      </p>
    </footer>
  );
}

export default Footer;
