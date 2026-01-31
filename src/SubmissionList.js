import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function SubmissionList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("submissions/")
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load submissions.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading submissions...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Submissions</h2>

        {submissions.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {submissions.map((submission) => (
              <li key={submission.id} style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "10px"
              }}>
                <Link
                  to={`/submissions/${submission.id}`}
                  style={{ textDecoration: "none", color: "#2980b9", fontWeight: "bold" }}
                >
                  {submission.assignment_title}
                </Link>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  Submitted by: {submission.student_name}
                </p>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  Date: {new Date(submission.submitted_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No submissions available.</p>
        )}
      </div>
    </div>
  );
}

export default SubmissionList;
