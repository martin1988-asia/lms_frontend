import React, { useEffect, useState } from "react";
import api from "../api/axios";

function MessageCenter() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newMessage, setNewMessage] = useState({ recipient: "", text: "" });
  const role = localStorage.getItem("role");

  useEffect(() => {
    api.get("/api/messages/")
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load messages.");
        setLoading(false);
      });
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!newMessage.recipient || !newMessage.text) {
      setError("Recipient and message text are required.");
      return;
    }
    try {
      const res = await api.post("/api/messages/", newMessage);
      setMessages([...messages, res.data]);
      setNewMessage({ recipient: "", text: "" });
      setSuccess("Message sent successfully!");
    } catch {
      setError("Failed to send message.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Loading messages...</h2>
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
      <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>Message Center</h2>

      {success && <p style={{ color: "green", marginBottom: "15px" }}>{success}</p>}
      {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

      {/* Send Message Form */}
      <form onSubmit={handleSend} style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <h3 style={{ marginBottom: "10px" }}>Send New Message</h3>
        <input
          type="text"
          placeholder="Recipient"
          value={newMessage.recipient}
          onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <textarea
          placeholder="Message text"
          value={newMessage.text}
          onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })}
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
          Send Message
        </button>
      </form>

      {/* Messages List */}
      {messages.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {messages.map((m) => (
            <li key={m.id} style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              marginBottom: "10px"
            }}>
              <p style={{ margin: "0 0 5px", color: "#3498db" }}>
                From: {m.sender_name} → To: {m.recipient_name}
              </p>
              <p style={{ margin: "0 0 5px", color: "#555" }}>{m.text}</p>
              <p style={{ fontSize: "12px", color: "#888" }}>
                {new Date(m.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages found.</p>
      )}
    </div>
  );
}

export default MessageCenter;
