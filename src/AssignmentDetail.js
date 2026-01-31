import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function AssignmentDetail() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get(`assignments/${id}/`)
      .then((res) => {
        setAssignment(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assignment details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading assignment details...</p>;
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Assignment Detail</h2>

      {assignment ? (
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <p><strong>Title:</strong> {assignment.title}</p>
          <p><strong>Description:</strong> {assignment.description}</p>
          <p><strong>Course:</strong> {assignment.course?.title || "Unknown Course"}</p>
          <p><strong>Due Date:</strong> {assignment.due_date}</p>
          <p><strong>Max Score:</strong> {assignment.max_score}</p>
        </div>
      ) : (
        <p>No assignment details found.</p>
      )}
    </div>
  );
}

export default AssignmentDetail;
