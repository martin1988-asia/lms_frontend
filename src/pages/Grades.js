import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Grades() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // ✅ Removed unused setter
  const [success] = useState("");
  const role = localStorage.getItem("role"); // role stored after login

  useEffect(() => {
    api.get("/users/submissions/") // ✅ endpoint for student submissions/grades
      .then((res) => {
        setGrades(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load grades.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading grades...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              background: "#eee",
              height: "40px",
              borderRadius: "4px"
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (error && !success) {
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
        {role === "student" ? "Your Grades" : "Grades Overview"}
      </h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {grades.length > 0 ? (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Course</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Assignment</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Grade</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Feedback</th>
              {role !== "student" && <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {grades.map((submission) => (
              <tr key={submission.id} style={{ borderBottom: "1px solid #ddd", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f4f6f7"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px" }}>
                  {submission.assignment?.course_title || "Unknown Course"}
                </td>
                <td style={{ padding: "12px" }}>
                  {submission.assignment?.title || "Assignment"}
                </td>
                <td style={{
                  padding: "12px",
                  color: submission.grade !== null ? "#27ae60" : "#e74c3c",
                  fontWeight: "bold"
                }}>
                  {submission.grade !== null ? submission.grade : "Not graded yet"}
                </td>
                <td style={{ padding: "12px", color: "#555" }}>
                  {submission.feedback || "No feedback"}
                </td>

                {/* Role-specific actions */}
                {role === "instructor" && (
                  <td style={{ padding: "12px" }}>
                    <Link
                      to={`/grades/${submission.id}/edit`}
                      style={{
                        background: "#8e44ad",
                        color: "#fff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        textDecoration: "none"
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                )}

                {role === "admin" && (
                  <td style={{ padding: "12px" }}>
                    <Link
                      to={`/grades/${submission.id}/analytics`}
                      style={{
                        background: "#e67e22",
                        color: "#fff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        textDecoration: "none"
                      }}
                    >
                      View Analytics
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades found.</p>
      )}
    </div>
  );
}

export default Grades;
