import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>
        Welcome to the LMS
      </h1>
      <p style={{ marginBottom: "30px", fontSize: "18px", color: "#34495e" }}>
        A centralized platform for courses, assignments, grades, and analytics.
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/login"
          style={{
            background: "#3498db",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          Login
        </Link>
        <Link
          to="/signup"
          style={{
            background: "#27ae60",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
