import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(to right, #e74c3c, #c0392b)",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.1)",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        maxWidth: "600px"
      }}>
        <h1 style={{ fontSize: "72px", marginBottom: "20px" }}>404</h1>
        <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          style={{
            background: "#2ecc71",
            color: "#fff",
            padding: "12px 25px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
