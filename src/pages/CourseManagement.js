import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin" && role !== "instructor") {
      navigate("/dashboard");
      return;
    }

    api.get("/api/courses/")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load courses.");
        setLoading(false);
      });
  }, [role, navigate]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newCourse.title || !newCourse.description) {
      setError("Title and description are required.");
      return;
    }
    try {
      const res = await api.post("/api/courses/", newCourse);
      setCourses([...courses, res.data]);
      setNewCourse({ title: "", description: "" });
      setSuccess("Course created successfully!");
    } catch {
      setError("Failed to create course.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setError("");
    setSuccess("");
    try {
      await api.delete(`/api/courses/${id}/`);
      setCourses(courses.filter((c) => c.id !== id));
      setSuccess("Course deleted successfully!");
    } catch {
      setError("Failed to delete course.");
    }
  };

  const handleEdit = async (id, updatedCourse) => {
    setError("");
    setSuccess("");
    try {
      const res = await api.patch(`/api/courses/${id}/`, updatedCourse);
      setCourses(courses.map((c) => c.id === id ? res.data : c));
      setSuccess("Course updated successfully!");
    } catch {
      setError("Failed to update course.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading courses...</h2>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Course Management</h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {/* Create Course Form */}
      <form onSubmit={handleCreate} style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Create New Course</h3>
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <textarea
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <button
          type="submit"
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Create Course
        </button>
      </form>

      {/* Courses Table */}
      {courses.length > 0 ? (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Title</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Description</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px" }}>{c.id}</td>
                <td style={{ padding: "12px" }}>{c.title}</td>
                <td style={{ padding: "12px" }}>{c.description}</td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "10px"
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      const newTitle = prompt("Enter new title:", c.title);
                      const newDescription = prompt("Enter new description:", c.description);
                      if (newTitle && newDescription) {
                        handleEdit(c.id, { title: newTitle, description: newDescription });
                      }
                    }}
                    style={{
                      background: "#3498db",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default CourseManagement;
