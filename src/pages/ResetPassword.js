import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { uidb64, token } = useParams(); // ✅ both come from reset link

  const validateForm = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
      // ✅ Call backend reset password endpoint with uid + token in URL
      const res = await api.post(`/accounts/reset-password/${uidb64}/${token}/`, {
        password,
      });

      console.log("Reset response:", res.data);

      setSuccess("✅ Password reset successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset error:", err.response?.data || err.message);
      if (err.response?.status === 400) {
        setError(err.response?.data?.error || "Invalid or expired reset link.");
      } else {
        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Server error. Please try again later."
        );
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
      background: "linear-gradient(to right, #2ecc71, #27ae60)",
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
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Reset Password</h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* New Password */}
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>New Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  flex: "1",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                style={{
                  marginLeft: "10px",
                  background: "#bdc3c7",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Confirm Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  flex: "1",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
                style={{
                  marginLeft: "10px",
                  background: "#bdc3c7",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#95a5a6" : "#27ae60",
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Back to{" "}
          <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
