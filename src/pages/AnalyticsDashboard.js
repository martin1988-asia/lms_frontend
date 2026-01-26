import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
      return;
    }

    api.get("/analytics/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load analytics data.");
        setLoading(false);
      });
  }, [role, navigate]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading analytics...</h2>
        <div style={{ background: "#eee", height: "200px", borderRadius: "8px", marginBottom: "20px" }} />
        <div style={{ background: "#eee", height: "200px", borderRadius: "8px", marginBottom: "20px" }} />
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Analytics Dashboard</h2>

      {data && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}>
          {/* Courses Bar Chart */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "10px" }}>Courses Overview</h3>
            <Bar
              data={{
                labels: data.courses.map(c => c.title),
                datasets: [{
                  label: "Enrollments",
                  data: data.courses.map(c => c.enrollment_count),
                  backgroundColor: "#3498db"
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>

          {/* Students Pie Chart */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "10px" }}>Students by Role</h3>
            <Pie
              data={{
                labels: ["Students", "Instructors", "Admins"],
                datasets: [{
                  data: [data.students, data.instructors, data.admins],
                  backgroundColor: ["#27ae60", "#8e44ad", "#e67e22"]
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>

          {/* Submissions Line Chart */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "10px" }}>Submissions Over Time</h3>
            <Line
              data={{
                labels: data.submissions.map(s => s.date),
                datasets: [{
                  label: "Submissions",
                  data: data.submissions.map(s => s.count),
                  borderColor: "#2ecc71",
                  backgroundColor: "rgba(46, 204, 113, 0.2)"
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>

          {/* Grades Distribution */}
          <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <h3 style={{ marginBottom: "10px" }}>Grades Distribution</h3>
            <Bar
              data={{
                labels: data.grades.map(g => g.range),
                datasets: [{
                  label: "Count",
                  data: data.grades.map(g => g.count),
                  backgroundColor: "#9b59b6"
                }]
              }}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
