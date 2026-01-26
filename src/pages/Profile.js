import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get("/accounts/me/")
      .then((res) => {
        setProfile(res.data);
        setEmail(res.data.email);
        setUsername(res.data.username);
        setRole(res.data.role);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validateForm()) return;

    setSaving(true);

    try {
      const payload = { email, username };
      if (password) payload.password = password;
      if (profile.role === "admin") payload.role = role;

      await api.patch("/accounts/me/", payload);

      setSuccess("Profile updated successfully!");
      setPassword("");
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading profile...</h2>
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
        <div style={{ background: "#eee", height: "40px", borderRadius: "4px", marginBottom: "10px" }} />
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Profile</h2>

      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}

      <form onSubmit={handleSave} autoComplete="off" style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px"
      }}>
        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        {/* Username */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
        </div>

        {/* Role (admin only) */}
        {profile.role === "admin" && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        {/* Password */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Change Password</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              style={{
                flex: "1",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              style={{
                marginLeft: "10px",
                background: "#bdc3c7",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          style={{
            background: saving ? "#95a5a6" : "#3498db",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: "bold",
            width: "100%",
            transition: "background 0.3s ease"
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
