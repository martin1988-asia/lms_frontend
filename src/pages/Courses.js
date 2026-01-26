import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role"); // role stored after login

  useEffect(() => {
    api.get("/users/courses/")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, []);

  const handleEnroll = async (courseId) => {
    setError("");
    setSuccess("");
    try {
      await api.post(`/users/courses/${courseId}/enroll/`);
      setSuccess("Successfully enrolled!");
    } catch {
      setError("Failed to enroll. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", padding: "20px" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            background: "#eee",
            height: "150px",
            borderRadius: "8px"
          }} />
        ))}
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>
        {role === "student" ? "Your Courses" : "Courses"}
      </h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {courses.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          {courses.map((course) => (
            <div key={course.id} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease",
              cursor: "default"
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <h3 style={{ color: "#2980b9", marginBottom: "10px" }}>{course.title}</h3>
              <p style={{ color: "#555", flex: "1" }}>
                {course.description || "No description provided."}
              </p>
              <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
                Instructor: {course.instructor_name || "Unknown"}
              </p>

              {/* Role-specific actions */}
              {role === "student" && (
                <button
                  onClick={() => handleEnroll(course.id)}
                  style={{
                    background: "#27ae60",
                    color: "#fff",
                    border: "none",
                    padding: "10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "15px"
                  }}
                >
                  Enroll
                </button>
              )}

              {role === "instructor" && (
                <Link
                  to={`/courses/${course.id}/manage`}
                  style={{
                    background: "#8e44ad",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    marginTop: "15px"
                  }}
                >
                  Manage Course
                </Link>
              )}

              {role === "admin" && (
                <Link
                  to={`/courses/${course.id}/analytics`}
                  style={{
                    background: "#e67e22",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    marginTop: "15px"
                  }}
                >
                  View Analytics
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default Courses;
