import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setProfile({ email: "Not logged in", role: "Unknown" });
      return;
    }

    // ✅ Fetch current user
    api.get("/api/accounts/users/me/")
      .then((res) => setProfile(res.data))
      .catch(() => {
        setError("Failed to fetch user profile.");
        setProfile({ email: "Error fetching user", role: "Error" });
      });

    // ✅ Fetch courses
    api.get("/users/courses/")
      .then((res) => setCourses(res.data))
      .catch(() => {});

    // ✅ Fetch assignments
    api.get("/users/assignments/")
      .then((res) => setAssignments(res.data))
      .catch(() => {});
  }, []);

  if (!profile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading dashboard...</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "20px" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              background: "#eee",
              height: "120px",
              borderRadius: "8px"
            }} />
          ))}
        </div>
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

  // Prepare line chart data (assignments due dates)
  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.due_date) - new Date(b.due_date)
  );

  const chartData = {
    labels: sortedAssignments.map((a) => a.due_date),
    datasets: [
      {
        label: "Assignments Due",
        data: sortedAssignments.map((a, i) => i + 1),
        borderColor: "#2980b9",
        backgroundColor: "rgba(41, 128, 185, 0.2)",
        tension: 0.3,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Assignments Timeline" }
    },
    scales: {
      x: { title: { display: true, text: "Due Date" } },
      y: { title: { display: true, text: "Assignments Count" }, beginAtZero: true }
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#2c3e50" }}>Welcome, {profile.email}</h2>
      <p style={{ color: "#555" }}>Role: {profile.role || "Unknown"}</p>

      {/* Stats cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div style={{
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
          <h3 style={{ color: "#27ae60" }}>Courses</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{courses.length}</p>
        </div>
        <div style={{
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
          <h3 style={{ color: "#2980b9" }}>Assignments</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>{assignments.length}</p>
        </div>
      </div>

      {/* Student Dashboard */}
      {profile.role === "student" && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>Student Dashboard</h3>
          <p>View your courses and assignments here.</p>

          {assignments.length > 0 && (
            <div style={{ marginTop: "30px", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          )}

          <div style={{ marginTop: "15px" }}>
            <h4>Your Courses</h4>
            {courses.length > 0 ? (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>{course.title}</li>
                ))}
              </ul>
            ) : (
              <p>No courses found.</p>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            <h4>Your Assignments</h4>
            {assignments.length > 0 ? (
              <ul>
                {assignments.map((a) => (
                  <li key={a.id}>
                    {a.title} — Due: {a.due_date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No assignments found.</p>
            )}
          </div>
        </div>
      )}

      {/* Instructor Dashboard */}
      {profile.role === "instructor" && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#27ae60" }}>Instructor Dashboard</h3>
          <p>Manage your courses and grade submissions here.</p>
          <ul style={{ marginTop: "15px" }}>
            <li><a href="/manage-courses" style={{ color: "#27ae60" }}>Manage Courses</a></li>
            <li><a href="/grade-submissions" style={{ color: "#27ae60" }}>Grade Submissions</a></li>
          </ul>
        </div>
      )}

      {/* Admin Dashboard */}
      {profile.role === "admin" && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#8e44ad" }}>Admin Dashboard</h3>
          <p>Oversee all users, courses, and analytics here.</p>
          <ul style={{ marginTop: "15px" }}>
                        <li><a href="/users" style={{ color: "#8e44ad" }}>User Management</a></li>
            <li><a href="/analytics" style={{ color: "#8e44ad" }}>System Analytics</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
