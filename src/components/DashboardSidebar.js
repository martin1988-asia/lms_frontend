import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
      setSuccess("Logged out successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch {
      setError("Failed to log out. Please try again.");
    }
  };

  const linkStyle = (path) => ({
    display: "block",
    padding: "12px 20px",
    color: location.pathname === path ? "#3498db" : "#2c3e50",
    background: location.pathname === path ? "#ecf0f1" : "transparent",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "8px",
    transition: "background 0.2s ease, color 0.2s ease"
  });

  return (
    <div style={{
      width: collapsed ? "70px" : "220px",
      background: "#fff",
      boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
      minHeight: "100vh",
      padding: "20px 10px",
      transition: "width 0.3s ease",
      fontFamily: "Arial, sans-serif"
    }}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: "#3498db",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
          width: "100%"
        }}
      >
        {collapsed ? "Expand" : "Collapse"}
      </button>

      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "10px" }}>{success}</p>}

      {/* Common Links */}
      <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
      <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>
      <Link to="/settings" style={linkStyle("/settings")}>Settings</Link>

      {/* Role-specific Links */}
      {role === "student" && (
        <>
          <Link to="/courses" style={linkStyle("/courses")}>My Courses</Link>
          <Link to="/assignments" style={linkStyle("/assignments")}>Assignments</Link>
          <Link to="/grades" style={linkStyle("/grades")}>Grades</Link>
        </>
      )}

      {role === "instructor" && (
        <>
          <Link to="/manage-courses" style={linkStyle("/manage-courses")}>Manage Courses</Link>
          <Link to="/grade-submissions" style={linkStyle("/grade-submissions")}>Grade Submissions</Link>
        </>
      )}

      {role === "admin" && (
        <>
          <Link to="/users" style={linkStyle("/users")}>User Management</Link>
          <Link to="/analytics" style={linkStyle("/analytics")}>Analytics</Link>
        </>
      )}

      <button
        onClick={handleLogout}
        style={{
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
          width: "100%"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardSidebar;
