import React, { useEffect, useState } from "react";
import api from "../api/axios";

function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get("/api/notifications/")
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
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading notifications...</h2>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Notification Center</h2>

      {notifications.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li key={n.id} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "10px",
              transition: "background 0.2s ease"
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f4f6f7"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
            >
              <h4 style={{ margin: "0 0 5px", color: "#3498db" }}>{n.title}</h4>
              <p style={{ margin: "0 0 5px", color: "#555" }}>{n.message}</p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                {new Date(n.created_at).toLocaleString()}
              </p>
              {role === "student" && n.type === "assignment" && (
                <p style={{ fontSize: "13px", color: "#27ae60" }}>
                  Reminder: Submit your assignment before the deadline!
                </p>
              )}
              {role === "instructor" && n.type === "submission" && (
                <p style={{ fontSize: "13px", color: "#8e44ad" }}>
                  New submission received. Review and grade promptly.
                </p>
              )}
              {role === "admin" && n.type === "system" && (
                <p style={{ fontSize: "13px", color: "#e67e22" }}>
                  System alert: {n.message}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
  );
}

export default NotificationCenter;
