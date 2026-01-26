import React, { useState } from "react";
import api from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      // ✅ Call backend forgot password endpoint
      await api.post("/accounts/forgot-password/", { email });

      setSuccess("Password reset link sent! Check your email.");
    } catch (err) {
      if (err.response?.status === 404) {
        setError("No account found with this email.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #f39c12, #d35400)",
      fontFamily: "Arial, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Forgot Password</h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#95a5a6" : "#f39c12",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              width: "100%",
              transition: "background 0.3s ease"
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Remembered your password?{" "}
          <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>Login</a>
        </p>
        <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#27ae60", textDecoration: "none" }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
