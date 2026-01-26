import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? "#1e1e1e" : "#f9f9f9";
    document.body.style.color = !darkMode ? "#f9f9f9" : "#2c3e50";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
    color: darkMode ? "#f9f9f9" : "#2c3e50",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif"
  };

  const navStyles = {
    background: darkMode ? "#111" : "#2c3e50",
    padding: "15px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000
  };

  const footerStyles = {
    background: darkMode ? "#111" : "#2c3e50",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    marginTop: "auto"
  };

  const sidebarStyles = {
    position: "fixed",
    top: 0,
    left: sidebarOpen ? 0 : "-250px",
    width: "250px",
    height: "100%",
    background: darkMode ? "#111" : "#2c3e50",
    color: "#fff",
    padding: "20px",
    transition: "left 0.3s ease",
    zIndex: 999
  };

  const linkStyle = {
    display: "block",
    margin: "15px 0",
    color: "#fff",
    textDecoration: "none"
  };

  const activeLinkStyle = {
    fontWeight: "bold",
    textDecoration: "underline"
  };

  return (
    <div style={themeStyles}>
      {/* Top Navigation Bar */}
      <nav style={navStyles}>
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>LMS Frontend</span>
        <div>
          <button
            onClick={toggleSidebar}
            style={{
              background: "#16a085",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "15px"
            }}
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
          <button
            onClick={toggleTheme}
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
            onClick={handleLogout}
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

      {/* Sidebar */}
      <div style={sidebarStyles}>
        <h3 style={{ marginBottom: "20px" }}>Navigation</h3>
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
      </div>

      {/* Page Content */}
      <div style={{
        flex: "1",
        padding: "20px",
        marginLeft: sidebarOpen ? "250px" : "0",
        transition: "margin-left 0.3s ease"
      }}>
        {children}
      </div>

      {/* Footer */}
      <footer style={footerStyles}>
        <p style={{ margin: "5px 0" }}>
          © {new Date().getFullYear()} LMS Project — Built with ❤️ by Higino
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <NavLink to="/dashboard" style={{ color: "#3498db", textDecoration: "none", marginRight: "15px" }} activeStyle={activeLinkStyle}>Dashboard</NavLink>
          <NavLink to="/courses" style={{ color: "#3498db", textDecoration: "none", marginRight: "15px" }} activeStyle={activeLinkStyle}>Courses</NavLink>
          <NavLink to="/assignments" style={{ color: "#3498db", textDecoration: "none", marginRight: "15px" }} activeStyle={activeLinkStyle}>Assignments</NavLink>
          <NavLink to="/grades" style={{ color: "#3498db", textDecoration: "none" }} activeStyle={activeLinkStyle}>Grades</NavLink>
        </p>
      </footer>
    </div>
  );
}

export default Layout;
