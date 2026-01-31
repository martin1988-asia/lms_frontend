import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("assignments/")
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load assignments.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading assignments...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Assignments</h2>

        {assignments.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {assignments.map((assignment) => (
              <li key={assignment.id} style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "10px"
              }}>
                <Link
                  to={`/assignments/${assignment.id}`}
                  style={{ textDecoration: "none", color: "#2980b9", fontWeight: "bold" }}
                >
                  {assignment.title}
                </Link>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  Due: {new Date(assignment.due_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </div>
  );
}

export default AssignmentList;
