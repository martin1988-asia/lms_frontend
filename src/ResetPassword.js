import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // token from reset link
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ✅ Corrected endpoint
    api.post("accounts/reset-password/", { token, password })
      .then(() => {
        setMessage("Password reset successful! You can now login.");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch(() => {
        setError("Failed to reset password. Please try again.");
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
          Reset Password
        </h2>

        {message && <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <div style={{ marginBottom: "15px" }}>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
