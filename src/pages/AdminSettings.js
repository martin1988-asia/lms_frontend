import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "",
    allowSignups: true,
    theme: "light",
    emailNotifications: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
      return;
    }

    api.get("/api/settings/")
      .then((res) => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings.");
        setLoading(false);
      });
  }, [role, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.patch("/api/settings/", settings);
      setSuccess("Settings updated successfully!");
    } catch {
      setError("Failed to update settings.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading settings...</h2>
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
      </div>
    );
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
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Admin Settings</h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <form onSubmit={handleSave} style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.allowSignups}
              onChange={(e) => setSettings({ ...settings, allowSignups: e.target.checked })}
              style={{ marginRight: "8px" }}
            />
            Allow User Signups
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              style={{ marginRight: "8px" }}
            />
            Enable Email Notifications
          </label>
        </div>

        <button
          type="submit"
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
      </form>
    </div>
  );
}

export default AdminSettings;
