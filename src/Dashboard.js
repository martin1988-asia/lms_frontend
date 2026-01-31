import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";
import AnalyticsDashboard from "./AnalyticsDashboard";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("analytics/")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <DashboardSidebar />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Dashboard</h2>
        {stats ? (
          <AnalyticsDashboard stats={stats} />
        ) : (
          <p>No dashboard data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
