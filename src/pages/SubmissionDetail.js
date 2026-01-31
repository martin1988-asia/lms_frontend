import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function SubmissionDetail() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get(`submissions/${id}/`)
      .then((res) => {
        setSubmission(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load submission details.");
        setLoading(false);
      });
  }, [id]);

  const handleResubmit = async () => {
    setError("");
    setSuccess("");
    try {
      // ✅ Corrected endpoint
      await api.post(`submissions/${id}/resubmit/`);
      setSuccess("Submission resubmitted successfully!");
      setSubmission({ ...submission, status: "resubmitted" });
    } catch {
      setError("Failed to resubmit. Please try again.");
    }
  };

  const handleGrade = async () => {
    const grade = prompt("Enter grade:");
    const feedback = prompt("Enter feedback:");
    if (!grade) return;
    setError("");
    setSuccess("");
    try {
      // ✅ Corrected endpoint
      await api.post(`submissions/${id}/grade/`, { grade, feedback });
      setSuccess("Submission graded successfully!");
      setSubmission({ ...submission, grade, feedback });
    } catch {
      setError("Failed to grade submission.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading submission...</h2>
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Submission Details</h2>
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <p style={{ marginBottom: "10px", color: "#555" }}>
        Assignment: {submission.assignment_title || "Unknown"}
      </p>
      <p style={{ marginBottom: "10px", color: "#555" }}>
        Student: {submission.student_name || "Unknown"}
      </p>
      <p style={{ marginBottom: "10px", color: "#555" }}>
        Submitted At: {submission.submitted_at}
      </p>
      <p style={{
        marginBottom: "20px",
        fontSize: "14px",
        color: submission.status === "submitted" ? "#27ae60" : "#e74c3c",
        fontWeight: "bold"
      }}>
        Status: {submission.status || "Pending"}
      </p>

      {submission.file_url && (
        <p style={{ marginBottom: "20px" }}>
          <a href={submission.file_url} target="_blank" rel="noopener noreferrer" style={{ color: "#3498db" }}>
            View Submitted File
          </a>
        </p>
      )}

      {/* Role-specific actions */}
      {role === "student" && (
        <button
          onClick={handleResubmit}
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Resubmit
        </button>
      )}
      {role === "instructor" && (
        <button
          onClick={handleGrade}
          style={{
            background: "#8e44ad",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Grade Submission
        </button>
      )}
      {role === "admin" && (
        <Link
          to={`/submissions/${id}/analytics`}
          style={{
            display: "inline-block",
            background: "#e67e22",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            marginBottom: "20px"
          }}
        >
          View Analytics
        </Link>
      )}

      {submission.feedback && (
        <p style={{ marginTop: "20px", color: "#555" }}>
          Feedback: {submission.feedback}
        </p>
      )}
      {submission.grade && (
        <p style={{ marginTop: "10px", fontWeight: "bold", color: "#27ae60" }}>
          Grade: {submission.grade}
        </p>
      )}
    </div>
  );
}

export default SubmissionDetail;
