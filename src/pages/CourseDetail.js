
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    Promise.all([
      api.get(`/courses/${id}/`),
      api.get(`/courses/${id}/assignments/`)
    ])
      .then(([courseRes, assignmentsRes]) => {
        setCourse(courseRes.data);
        setAssignments(assignmentsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load course details.");
        setLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    setError("");
    setSuccess("");
    try {
      await api.post(`/courses/${id}/enroll/`);
      setSuccess("Successfully enrolled in this course!");
    } catch {
      setError("Failed to enroll. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading course...</h2>
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>{course.title}</h2>
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      <p style={{ marginBottom: "10px", color: "#555" }}>
        {course.description || "No description provided."}
      </p>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#888" }}>
        Instructor: {course.instructor_name || "Unknown"}
      </p>
      <p style={{ marginBottom: "20px", fontSize: "14px", color: "#888" }}>
        Enrolled Students: {course.enrolled_count || 0}
      </p>

      {/* Role-specific actions */}
      {role === "student" && (
        <button
          onClick={handleEnroll}
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
          Enroll
        </button>
      )}
      {role === "instructor" && (
        <Link
          to={`/courses/${id}/manage`}
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
          Manage Course
        </Link>
      )}
      {role === "admin" && (
        <Link
          to={`/courses/${id}/analytics`}
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

      {/* Assignments List */}
      <h3 style={{ color: "#2980b9", marginTop: "30px" }}>Assignments</h3>
      {assignments.length > 0 ? (
        <ul style={{ marginTop: "10px" }}>
          {assignments.map((a) => (
            <li key={a.id} style={{ marginBottom: "8px" }}>
              {a.title} — Due: {a.due_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments found for this course.</p>
      )}
    </div>
  );
}

export default CourseDetail;
