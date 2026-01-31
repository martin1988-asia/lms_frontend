import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to right, #3498db, #2ecc71)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Welcome to the Learning Management System
      </h1>
      <p style={{ fontSize: "20px", marginBottom: "40px", maxWidth: "600px" }}>
        Manage courses, assignments, grades, and analytics all in one place.
        Empower teachers, engage students, and simplify administration.
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/login"
          style={{
            background: "#2980b9",
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

export default LandingPage;
