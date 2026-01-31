import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// ✅ Environment variable
const API_URL = process.env.REACT_APP_API_URL;

function LandingPage() {
  // --- Test login function ---
  const testLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        email: "arautos@hotmail.com",
        password: "Felicia@2025"
      });

      console.log("Login success:", response.data);

      // Save tokens in localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      alert("✅ Login successful! Tokens saved in Local Storage.");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("❌ Login failed — check console for details.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to right, #3498db, #9b59b6)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff"
      }}
    >
      {/* Hero Section */}
      <header style={{ padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Welcome to LMS</h1>
        <p style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>
          A modern Learning Management System for students, instructors, and admins.  
          Manage courses, assignments, grades, and analytics all in one place.
        </p>
        {/* ✅ Show backend URL */}
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#f1f1f1" }}>
          Backend URL: {API_URL || "Not loaded"}
        </p>
      </header>

      {/* Call-to-Action Section */}
      <main
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%"
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Get Started</h2>
          <p style={{ marginBottom: "30px", color: "#f1f1f1" }}>
            Log in to your account or sign up to begin your learning journey.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Link
              to="/login"
              style={{
                background: "#2ecc71",
                color: "#fff",
                padding: "12px 25px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                marginRight: "15px"
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                background: "#e67e22",
                color: "#fff",
                padding: "12px 25px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              Sign Up
            </Link>
          </div>

          {/* ✅ Test login button */}
          <button
            onClick={testLogin}
            style={{
              background: "#3498db",
              color: "#fff",
              padding: "12px 25px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Test Login (Superuser)
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(0,0,0,0.3)",
          padding: "20px",
          textAlign: "center",
          fontSize: "14px"
        }}
      >
        <p>© {new Date().getFullYear()} LMS Project — Built with ❤️ by Higino</p>
        <p>
          <Link to="/login" style={{ color: "#fff", textDecoration: "underline", marginRight: "15px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ color: "#fff", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
