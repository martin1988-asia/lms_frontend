import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function GradeDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get(`submissions/${id}/`)
      .then((res) => {
        setSubmission(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load grade details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading grade details...</p>;
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Grade Detail</h2>

      {submission ? (
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <p><strong>Course:</strong> {submission.assignment?.course_title || "Unknown Course"}</p>
          <p><strong>Assignment:</strong> {submission.assignment?.title || "Unknown Assignment"}</p>
          <p><strong>Student:</strong> {submission.student?.email || "Unknown Student"}</p>
          <p><strong>Grade:</strong> {submission.grade !== null ? submission.grade : "Not graded yet"}</p>
          <p><strong>Feedback:</strong> {submission.feedback || "No feedback provided"}</p>
          <p><strong>Submitted At:</strong> {submission.submitted_at}</p>
        </div>
      ) : (
        <p>No grade details found.</p>
      )}
    </div>
  );
}

export default GradeDetail;
