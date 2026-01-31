import React, { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardSidebar from "./DashboardSidebar";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // ✅ Corrected endpoint
    api.get("messages/")
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load messages.");
        setLoading(false);
      });
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    api.post("messages/", { content: newMessage })
      .then((res) => {
        setMessages([...messages, res.data]);
        setNewMessage("");
      })
      .catch(() => {
        setError("Failed to send message.");
      });
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading messages...</p>;
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
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Messages</h2>

        <div style={{ marginBottom: "20px" }}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px"
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              background: "#27ae60",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>

        {messages.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {messages.map((msg) => (
              <li key={msg.id} style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                marginBottom: "10px"
              }}>
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                  {msg.sender_name}
                </p>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  {msg.content}
                </p>
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#95a5a6" }}>
                  {new Date(msg.sent_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages available.</p>
        )}
      </div>
    </div>
  );
}

export default Messages;
