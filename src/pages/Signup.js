import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
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
      // ✅ Call backend signup endpoint
      const res = await api.post("/accounts/signup/", {
        email,
        username,
        password,
        role,
      });

      // ✅ Save tokens and role in localStorage
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);

      setSuccess("Account created successfully! Redirecting...");

      // ✅ Redirect based on role
      setTimeout(() => {
        switch (res.data.role) {
          case "admin":
            navigate("/analytics");
            break;
          case "instructor":
            navigate("/manage-courses");
            break;
          default:
            navigate("/dashboard");
        }
      }, 1500);
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Signup failed. Please check your details and try again.");
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
      background: "linear-gradient(to right, #9b59b6, #3498db)",
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
        <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>Sign Up</h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
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
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
          </div>
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Password</label>
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
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#95a5a6" : "#9b59b6",
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>Login</a>
        </p>
        <p style={{ marginTop: "10px", fontSize: "12px", color: "#777" }}>
          By signing up, you agree to our{" "}
          <a href="/terms" style={{ color: "#9b59b6", textDecoration: "none" }}>Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" style={{ color: "#3498db", textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
