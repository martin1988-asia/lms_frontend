import React, { useEffect, useState } from "react";
import api from "../api/axios";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCourse, setNewCourse] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("courses/")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, []);

  const handleAddCourse = () => {
    if (!newCourse.trim()) return;

    api.post("courses/", { title: newCourse })
      .then((res) => {
        setCourses([...courses, res.data]);
        setNewCourse("");
      })
      .catch(() => {
        setError("Failed to add course.");
      });
  };

  const handleDeleteCourse = (id) => {
    api.delete(`courses/${id}/`)
      .then(() => {
        setCourses(courses.filter((c) => c.id !== id));
      })
      .catch(() => {
        setError("Failed to delete course.");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading courses...</p>;
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Course Management</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Enter new course title"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <button
          onClick={handleAddCourse}
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Add Course
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li key={course.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>{course.title}</span>
            <button
              onClick={() => handleDeleteCourse(course.id)}
              style={{
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                padding: "8px 15px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseManagement;
