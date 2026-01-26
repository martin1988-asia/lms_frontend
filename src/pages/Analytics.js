import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get("/api/analytics/") // ✅ backend endpoint for analytics
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics.");
        setLoading(false);
      });
  }, []);

  // 🚫 Restrict access to admins
  if (role !== "admin") {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Access denied. Admins only.</p>;
  }

  // ⏳ Loading skeletons
  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "20px" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            background: "#eee",
            height: "120px",
            borderRadius: "8px"
          }} />
        ))}
      </div>
    );
  }

  // ❌ Error recovery
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

  // 🎨 Dynamic colors
  const colors = ["#3498db", "#27ae60", "#8e44ad", "#e67e22"];

  // 📊 Chart data
  const rolePieData = {
    labels: ["Users", "Courses", "Assignments", "Submissions"],
    datasets: [
      {
        data: [
          stats?.users || 0,
          stats?.courses || 0,
          stats?.assignments || 0,
          stats?.submissions || 0
        ],
        backgroundColor: colors
      }
    ]
  };

  const courseBarData = {
    labels: ["Courses"],
    datasets: [
      {
        label: "Total Courses",
        data: [stats?.courses || 0],
        backgroundColor: colors[1]
      }
    ]
  };

  const submissionLineData = {
    labels: stats?.submissionTimeline?.map((s) => s.date) || [],
    datasets: [
      {
        label: "Submissions Over Time",
        data: stats?.submissionTimeline?.map((s) => s.count) || [],
        borderColor: colors[3],
        backgroundColor: "rgba(230, 126, 34, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>System Analytics</h2>

      {stats ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
          gap: "30px"
        }}>
          {/* Stats cards */}
          {[
            { label: "Users", value: stats.users, color: colors[0] },
            { label: "Courses", value: stats.courses, color: colors[1] },
            { label: "Assignments", value: stats.assignments, color: colors[2] },
            { label: "Submissions", value: stats.submissions, color: colors[3] }
          ].map((card, i) => (
            <div key={i} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.2s ease"
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <h3 style={{ color: card.color }}>{card.label}</h3>
              <p style={{ fontSize: "24px", fontWeight: "bold" }}>{card.value}</p>
            </div>
          ))}

          {/* Charts */}
          <div style={{ gridColumn: "span 2", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "15px" }}>System Overview</h3>
            <Pie data={rolePieData} />
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "15px" }}>Courses Overview</h3>
            <Bar data={courseBarData} />
          </div>

          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "15px" }}>Submissions Timeline</h3>
            <Line data={submissionLineData} />
          </div>
        </div>
      ) : (
        <p>No analytics data available.</p>
      )}
    </div>
  );
}

export default Analytics;
