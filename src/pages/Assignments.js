import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role"); // role stored after login

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get("assignments/");
        console.log("Assignments API response:", res.data);

        // ✅ Normalize response to always be an array
        if (Array.isArray(res.data)) {
          setAssignments(res.data);
        } else if (Array.isArray(res.data.assignments)) {
          setAssignments(res.data.assignments);
        } else {
          setAssignments([]);
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleSubmit = async (assignmentId) => {
    setError("");
    setSuccess("");
    try {
      await api.post(`assignments/${assignmentId}/submit/`);
      setSuccess("Assignment submitted successfully!");
      setAssignments(assignments.map(a =>
        a.id === assignmentId ? { ...a, status: "submitted" } : a
      ));
    } catch {
      setError("Failed to submit assignment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading assignments...</h2>
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
        {role === "student" ? "Your Assignments" : "Assignments"}
      </h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {assignments.length > 0 ? (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Course</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Due Date</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id} style={{ borderBottom: "1px solid #ddd", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f4f6f7"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px" }}>{a.title}</td>
                <td style={{ padding: "12px" }}>{a.course_title || "Unknown"}</td>
                <td style={{ padding: "12px" }}>{a.due_date}</td>
                <td style={{
                  padding: "12px",
                  color: a.status === "submitted" ? "#27ae60" : "#e74c3c",
                  fontWeight: "bold"
                }}>
                  {a.status || "Pending"}
                </td>
                <td style={{ padding: "12px" }}>
                  {role === "student" && (
                    <button
                      onClick={() => handleSubmit(a.id)}
                      disabled={a.status === "submitted"}
                      style={{
                        background: a.status === "submitted" ? "#95a5a6" : "#27ae60",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        cursor: a.status === "submitted" ? "not-allowed" : "pointer"
                      }}
                    >
                      {a.status === "submitted" ? "Submitted" : "Submit"}
                    </button>
                  )}
                  {role === "instructor" && (
                    <Link
                      to={`/assignments/${a.id}/grade`}
                      style={{
                        background: "#8e44ad",
                        color: "#fff",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        textDecoration: "none"
                      }}
                    >
                      Grade
                    </Link>
                  )}
                  {role === "admin" && (
                    <Link
                      to={`/assignments/${a.id}/analytics`}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assignments found.</p>
      )}
    </div>
  );
}

export default Assignments;
