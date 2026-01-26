import React, { useEffect, useState } from "react";
import api from "../api/axios";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    api.post("/users/courses/", { title, description })
      .then((res) => {
        setSuccess("Course created successfully!");
        setCourses([...courses, res.data]);
        setTitle("");
        setDescription("");
      })
      .catch(() => {
        setError("Failed to create course. Only instructors can add courses.");
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/users/courses/${id}/`);
      setCourses(courses.filter((course) => course.id !== id));
    } catch {
      alert("Failed to delete course.");
    }
  };

  const handleEditSave = async () => {
    try {
      const res = await api.patch(`/users/courses/${editingCourse.id}/`, {
        title: editTitle,
        description: editDescription,
      });
      setCourses(courses.map((course) =>
        course.id === editingCourse.id ? res.data : course
      ));
      setSuccess("Course updated successfully!");
      setEditingCourse(null);
    } catch {
      alert("Failed to update course.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading courses...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              background: "#eee",
              height: "120px",
              borderRadius: "8px"
            }} />
          ))}
        </div>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Manage Courses</h2>

      {/* Course creation form */}
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <h3 style={{ marginBottom: "15px", color: "#27ae60" }}>Add New Course</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Create Course
        </button>
      </form>

      {/* Course list */}
      <h3 style={{ color: "#2980b9", marginBottom: "15px" }}>Your Courses</h3>
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
              transition: "transform 0.2s ease"
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <h4 style={{ color: "#2980b9" }}>{course.title}</h4>
              <p style={{ color: "#555" }}>{course.description}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDelete(course.id)}
                  style={{
                    background: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setEditTitle(course.title);
                    setEditDescription(course.description);
                  }}
                  style={{
                    background: "#f39c12",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}

      {/* Edit Modal */}
      {editingCourse && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            width: "400px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            <h3 style={{ marginBottom: "15px" }}>Edit Course</h3>
            <div style={{ marginBottom: "15px" }}>
              <label>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                onClick={() => setEditingCourse(null)}
                style={{
                  background: "#95a5a6",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                style={{
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCourses;
