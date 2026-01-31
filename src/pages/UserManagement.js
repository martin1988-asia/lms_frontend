import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard");
      return;
    }

    // ✅ Corrected endpoint (matches DRF router)
    api.get("users/")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err.response?.data || err.message);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [role, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setError("");
    setSuccess("");
    try {
      // ✅ Corrected endpoint
      await api.delete(`users/${id}/`);
      setUsers(users.filter((user) => user.id !== id));
      setSuccess("✅ User deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setError("Failed to delete user.");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    if (!window.confirm(`Change role to ${newRole}?`)) return;
    setError("");
    setSuccess("");
    try {
      // ✅ Corrected endpoint
      await api.patch(`users/${id}/`, { role: newRole });
      setUsers(users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      ));
      setSuccess("✅ Role updated successfully!");
    } catch (err) {
      console.error("Role update error:", err.response?.data || err.message);
      setError("Failed to update role.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading users...</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              background: "#eee",
              height: "40px",
              borderRadius: "4px"
            }} />
          ))}
        </div>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>User Management</h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {users.length > 0 ? (
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          <thead>
            <tr style={{ background: "#2c3e50", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Role</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #ddd", transition: "background 0.2s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f4f6f7"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px" }}>{user.id}</td>
                <td style={{ padding: "12px" }}>{user.email}</td>
                <td style={{ padding: "12px" }}>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    style={{
                      padding: "6px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      background: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserManagement;
