import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    color: location.pathname === path ? "#3498db" : "#2c3e50",
    textDecoration: "none",
    margin: "0 15px",
    fontWeight: location.pathname === path ? "bold" : "normal",
    transition: "color 0.2s ease"
  });

  return (
    <nav style={{
      background: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 style={{ color: "#3498db", marginRight: "20px" }}>LMS</h2>
        <div style={{ display: menuOpen ? "block" : "flex" }}>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
          {role === "student" && (
            <>
              <Link to="/courses" style={linkStyle("/courses")}>Courses</Link>
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
              <Link to="/users" style={linkStyle("/users")}>Users</Link>
              <Link to="/analytics" style={linkStyle("/analytics")}>Analytics</Link>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Notifications (future-proof hook) */}
        <button
          style={{
            background: "transparent",
            border: "none",
            marginRight: "15px",
            cursor: "pointer",
            fontSize: "18px"
          }}
          title="Notifications"
        >
          🔔
        </button>

        {/* Profile dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "#3498db",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
          {menuOpen && (
            <div style={{
              position: "absolute",
              right: 0,
              top: "40px",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "4px",
              overflow: "hidden",
              zIndex: 1000
            }}>
              <Link to="/profile" style={{
                display: "block",
                padding: "10px 20px",
                color: "#2c3e50",
                textDecoration: "none"
              }}>Profile</Link>
              <Link to="/settings" style={{
                display: "block",
                padding: "10px 20px",
                color: "#2c3e50",
                textDecoration: "none"
              }}>Settings</Link>
              <button
                onClick={handleLogout}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {error && <p style={{ color: "red", position: "absolute", top: "60px", right: "20px" }}>{error}</p>}
      {success && <p style={{ color: "green", position: "absolute", top: "60px", right: "20px" }}>{success}</p>}
    </nav>
  );
}

export default Navbar;
