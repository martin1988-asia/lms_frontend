import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const role = localStorage.getItem("role");

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to right, #3498db, #2ecc71)",
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Welcome to the LMS Project</h1>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          A modern learning management system for students, instructors, and admins.
        </p>
        <div>
          <Link to="/login" style={{
            background: "#2c3e50",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            marginRight: "15px",
            transition: "background 0.3s ease"
          }}>Login</Link>
          <Link to="/signup" style={{
            background: "#27ae60",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            transition: "background 0.3s ease"
          }}>Sign Up</Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "1000px"
      }}>
        <div style={{
          background: "#fff",
          color: "#2c3e50",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}>
          <h3>Courses</h3>
          <p>Browse and enroll in courses tailored to your role.</p>
        </div>
        <div style={{
          background: "#fff",
          color: "#2c3e50",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}>
          <h3>Assignments</h3>
          <p>Track, submit, and grade assignments with ease.</p>
        </div>
        <div style={{
          background: "#fff",
          color: "#2c3e50",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}>
          <h3>Grades</h3>
          <p>View grades and feedback instantly.</p>
        </div>
        <div style={{
          background: "#fff",
          color: "#2c3e50",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}>
          <h3>Analytics</h3>
          <p>Admins can oversee system performance and user activity.</p>
        </div>
      </div>

      {/* Role-based Quick Links */}
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        {role === "student" && (
          <p>
            Quick access: <Link to="/dashboard" style={{ color: "#fff", textDecoration: "underline" }}>Student Dashboard</Link>
          </p>
        )}
        {role === "instructor" && (
          <p>
            Quick access: <Link to="/manage-courses" style={{ color: "#fff", textDecoration: "underline" }}>Instructor Dashboard</Link>
          </p>
        )}
        {role === "admin" && (
          <p>
            Quick access: <Link to="/analytics" style={{ color: "#fff", textDecoration: "underline" }}>Admin Dashboard</Link>
          </p>
        )}
      </div>

      {/* Footer attribution */}
      <p style={{ marginTop: "60px", fontSize: "12px", fontStyle: "italic" }}>
        Built with React, Chart.js, and ❤️ by Higino
      </p>
    </div>
  );
}

export default Home;
