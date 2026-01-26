import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function GradeDetail() {
  const { id } = useParams();
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get(`/grades/${id}/`)
      .then((res) => {
        setGrade(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load grade details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading grade...</h2>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Grade Details</h2>
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <p style={{ marginBottom: "10px", color: "#555" }}>
        Course: {grade.assignment?.course_title || "Unknown Course"}
      </p>
      <p style={{ marginBottom: "10px", color: "#555" }}>
        Assignment: {grade.assignment?.title || "Unknown Assignment"}
      </p>
      <p style={{
        marginBottom: "10px",
        fontSize: "16px",
        fontWeight: "bold",
        color: grade.grade !== null ? "#27ae60" : "#e74c3c"
      }}>
        Grade: {grade.grade !== null ? grade.grade : "Not graded yet"}
      </p>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Feedback: {grade.feedback || "No feedback provided."}
      </p>

      {/* Role-specific actions */}
      {role === "instructor" && (
        <Link
          to={`/grades/${id}/edit`}
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
          Edit Grade
        </Link>
      )}
      {role === "admin" && (
        <Link
          to={`/grades/${id}/analytics`}
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

export default GradeDetail;
