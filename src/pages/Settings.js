import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get("/accounts/settings/")
      .then((res) => {
        setSettings(res.data);
        setTheme(res.data.theme || "light");
        setNotifications(res.data.notifications ?? true);
        setLanguage(res.data.language || "en");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.patch("/accounts/settings/", {
        theme,
        notifications,
        language,
      });
      setSuccess("Settings updated successfully!");
    } catch {
      setError("Failed to update settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading settings...</h2>
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Settings</h2>

      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}

      <form onSubmit={handleSave} style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px"
      }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Notifications</label>
          <label style={{ display: "flex", alignItems: "center", color: "#555" }}>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              style={{ marginRight: "8px" }}
            />
            Enable notifications
          </label>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>

        {role === "admin" && (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Admin Options</label>
            <p style={{ fontSize: "14px", color: "#777" }}>
              As an admin, you can configure global system settings here.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#95a5a6" : "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: "bold",
            width: "100%",
            transition: "background 0.3s ease"
          }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

export default Settings;
