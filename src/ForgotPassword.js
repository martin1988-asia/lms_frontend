import React, { useState } from "react";
import api from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Corrected endpoint
    api.post("accounts/forgot-password/", { email })
      .then(() => {
        setMessage("Password reset instructions have been sent to your email.");
        setError("");
      })
      .catch(() => {
        setError("Failed to send reset instructions. Please try again.");
        setMessage("");
      });
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px"
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>
          Forgot Password
        </h2>

        {message && <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
