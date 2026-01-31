import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("analytics/")
      .then((res) => {
        setAnalytics(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading analytics...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Analytics Overview</h2>

        {analytics ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px"
          }}>
            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3>Average Grade</h3>
              <p>{analytics.average_grade}</p>
            </div>

            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3>Total Submissions</h3>
              <p>{analytics.total_submissions}</p>
            </div>

            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3>Active Students</h3>
              <p>{analytics.active_students}</p>
            </div>

            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <h3>Assignments Graded</h3>
              <p>{analytics.assignments_graded}</p>
            </div>
          </div>
        ) : (
          <p>No analytics data available.</p>
        )}
      </div>
    </div>
  );
}

export default Analytics;
