import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function AssignmentDetail() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get(`/assignments/${id}/`)
      .then((res) => {
        setAssignment(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assignment details.");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      await api.post(`/assignments/${id}/submit/`);
      setSuccess("Assignment submitted successfully!");
      setAssignment({ ...assignment, status: "submitted" });
    } catch {
      setError("Failed to submit assignment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading assignment...</h2>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>{assignment.title}</h2>
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <p style={{ marginBottom: "10px", color: "#555" }}>
        {assignment.description || "No description provided."}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#888" }}>
        Course: {assignment.course_title || "Unknown"}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#888" }}>
        Due Date: {assignment.due_date}
      </p>
      <p style={{
        marginBottom: "20px",
        fontSize: "14px",
        color: assignment.status === "submitted" ? "#27ae60" : "#e74c3c",
        fontWeight: "bold"
      }}>
        Status: {assignment.status || "Pending"}
      </p>

      {/* Role-specific actions */}
      {role === "student" && (
        <button
          onClick={handleSubmit}
          disabled={assignment.status === "submitted"}
          style={{
            background: assignment.status === "submitted" ? "#95a5a6" : "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: assignment.status === "submitted" ? "not-allowed" : "pointer",
            marginBottom: "20px"
          }}
        >
          {assignment.status === "submitted" ? "Submitted" : "Submit Assignment"}
        </button>
      )}
      {role === "instructor" && (
        <Link
          to={`/assignments/${id}/grade`}
          style={{
            display: "inline-block",
            background: "#8e44ad",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            textDecoration: "none",
            marginBottom: "20px"
          }}
        >
          Grade Assignment
        </Link>
      )}
      {role === "admin" && (
        <Link
          to={`/assignments/${id}/analytics`}
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
    </div>
  );
}

export default AssignmentDetail;
