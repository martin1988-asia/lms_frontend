import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get(`courses/${id}/`)
      .then((res) => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load course details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading course details...</p>;
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Course Detail</h2>

      {course ? (
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <p><strong>Title:</strong> {course.title}</p>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Instructor:</strong> {course.instructor?.email || "Unknown Instructor"}</p>
          <p><strong>Created At:</strong> {course.created_at}</p>
          <p><strong>Updated At:</strong> {course.updated_at}</p>
        </div>
      ) : (
        <p>No course details found.</p>
      )}
    </div>
  );
}

export default CourseDetail;
