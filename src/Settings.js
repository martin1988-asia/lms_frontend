import React, { useState, useEffect } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("settings/")
      .then((res) => {
        setSettings(res.data);
        setTheme(res.data.theme || "light");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings.");
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    api.put("settings/", { theme })
      .then(() => {
        alert("Settings updated successfully!");
      })
      .catch(() => {
        setError("Failed to update settings.");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading settings...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <DashboardSidebar />
      <div style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
      }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Settings</h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
