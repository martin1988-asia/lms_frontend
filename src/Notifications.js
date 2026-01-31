import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("notifications/")
      .then((res) => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notifications.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading notifications...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Notifications</h2>

        {notifications.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {notifications.map((note) => (
              <li key={note.id} style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "10px"
              }}>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>{note.title}</p>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>{note.message}</p>
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#95a5a6" }}>
                  {new Date(note.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
