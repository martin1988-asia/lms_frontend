import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" });

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("users/")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;

    api.post("users/", newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        setNewUser({ name: "", email: "", role: "student" });
      })
      .catch(() => {
        setError("Failed to add user.");
      });
  };

  const handleDeleteUser = (id) => {
    api.delete(`users/${id}/`)
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch(() => {
        setError("Failed to delete user.");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading users...</p>;
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
    <div style={{ display: "flex" }}>
      <DashboardSidebar />
      <div style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh"
      }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>User Management</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Enter name"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Enter email"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleAddUser}
            style={{
              background: "#27ae60",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Add User
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span>{user.name} ({user.email}) - {user.role}</span>
              <button
                onClick={() => handleDeleteUser(user.id)}
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
    </div>
  );
}

export default UserManagement;
