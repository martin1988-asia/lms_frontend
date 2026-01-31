import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function Gradebook() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("grades/")
      .then((res) => {
        setGrades(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load gradebook.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading gradebook...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Gradebook</h2>

        {grades.length > 0 ? (
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <thead style={{ background: "#3498db", color: "#fff" }}>
              <tr>
                <th style={{ padding: "10px", textAlign: "left" }}>Student</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Course</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Assignment</th>
                <th style={{ padding: "10px", textAlign: "left" }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <tr key={grade.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{grade.student_name}</td>
                  <td style={{ padding: "10px" }}>{grade.course_title}</td>
                  <td style={{ padding: "10px" }}>{grade.assignment_title}</td>
                  <td style={{ padding: "10px" }}>{grade.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No grades available.</p>
        )}
      </div>
    </div>
  );
}

export default Gradebook;
