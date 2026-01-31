import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      textAlign: "center",
      padding: "15px 30px",
      marginTop: "auto"
    }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Learning Management System. All rights reserved.
      </p>
      <p style={{ margin: "5px 0" }}>
        <a href="/privacy" style={{ color: "#ecf0f1", textDecoration: "none", marginRight: "15px" }}>
          Privacy Policy
        </a>
        <a href="/terms" style={{ color: "#ecf0f1", textDecoration: "none" }}>
          Terms of Service
        </a>
      </p>
    </footer>
  );
}

export default Footer;
