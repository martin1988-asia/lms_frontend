import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // ✅ Corrected endpoint
    api.post("accounts/signup/", { name, email, password })
      .then(() => {
        alert("Account created successfully! Please login.");
        navigate("/login");
      })
      .catch(() => {
        setError("Failed to create account. Please try again.");
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
        onSubmit={handleSignup}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px"
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>
          Sign Up
        </h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
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
          Sign Up
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
