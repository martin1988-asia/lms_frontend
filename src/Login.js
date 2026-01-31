import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");  // use username for Django JWT
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    api.post("/api/token/", { username, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.access);
        localStorage.setItem("refreshToken", res.data.refresh);

        // Attach token globally
        api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

        navigate("/dashboard");
      })
      .catch(() => {
        setError("Invalid username or password.");
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
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px"
        }}
      >
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>
          Login
        </h2>

        {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

        <div style={{ marginBottom: "15px" }}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            background: "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
