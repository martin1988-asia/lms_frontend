import React, { useEffect, useState } from "react";
import api from "../api/axios";

function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedSettings, setUpdatedSettings] = useState({});

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("settings/")
      .then((res) => {
        setSettings(res.data);
        setUpdatedSettings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load admin settings.");
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    api.put("settings/", updatedSettings)
      .then((res) => {
        setSettings(res.data);
        alert("Settings updated successfully!");
      })
      .catch(() => {
        setError("Failed to update settings.");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading admin settings...</p>;
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

      {settings ? (
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            System Name:
            <input
              type="text"
              value={updatedSettings.system_name || ""}
              onChange={(e) =>
                setUpdatedSettings({ ...updatedSettings, system_name: e.target.value })
              }
              style={{
                marginLeft: "10px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc"
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Allow Registrations:
            <input
              type="checkbox"
              checked={updatedSettings.allow_registrations || false}
              onChange={(e) =>
                setUpdatedSettings({ ...updatedSettings, allow_registrations: e.target.checked })
              }
              style={{ marginLeft: "10px" }}
            />
          </label>

          <button
            onClick={handleSave}
            style={{
              background: "#27ae60",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "15px"
            }}
          >
            Save Settings
          </button>
        </div>
      ) : (
        <p>No settings available.</p>
      )}
    </div>
  );
}

export default AdminSettings;
