import React, { useEffect, useState } from "react";
import api from "../api/axios";

function GradeSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editGrade, setEditGrade] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("submissions/")
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load submissions.");
        setLoading(false);
      });
  }, []);

  const handleGrade = async (id, grade) => {
    setError("");
    setSuccess("");

    try {
      // ✅ Corrected endpoint
      await api.patch(`submissions/${id}/`, { grade });
      setSubmissions(
        submissions.map((s) =>
          s.id === id ? { ...s, grade } : s
        )
      );
      setSuccess(`Grade updated successfully for submission ${id}!`);
      setEditingSubmission(null);
    } catch {
      setError("Failed to update grade.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading submissions...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              background: "#eee",
              height: "80px",
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

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Grade Submissions</h2>
      {success && <p style={{ color: "green" }}>{success}</p>}

      {submissions.length > 0 ? (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "#fff" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Student</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Assignment</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Grade</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} style={{ borderBottom: "1px solid #ddd", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f4f6f7"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "10px" }}>{s.id}</td>
                <td style={{ padding: "10px" }}>{s.student?.email || "Unknown"}</td>
                <td style={{ padding: "10px" }}>{s.assignment?.title || "Assignment"}</td>
                <td style={{ padding: "10px", fontWeight: "bold", color: s.grade !== null ? "#27ae60" : "#e74c3c" }}>
                  {s.grade !== null ? s.grade : "Not graded"}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleGrade(s.id, 100)}
                    style={{
                      background: "#27ae60",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Give 100
                  </button>
                  <button
                    onClick={() => {
                      setEditingSubmission(s);
                      setEditGrade(s.grade || "");
                    }}
                    style={{
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Custom Grade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No submissions found.</p>
      )}

      {/* Edit Modal */}
      {editingSubmission && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            width: "400px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            <h3 style={{ marginBottom: "15px" }}>Grade Submission #{editingSubmission.id}</h3>
            <div style={{ marginBottom: "15px" }}>
              <label>Grade</label>
              <input
                type="number"
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setEditingSubmission(null)}
                style={{
                  background: "#95a5a6",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleGrade(editingSubmission.id, editGrade)}
                style={{
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeSubmissions;
