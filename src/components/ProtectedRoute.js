import React from "react";
import { Navigate } from "react-router-dom";

// ✅ Utility: check if JWT token is expired
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // convert to ms
    return Date.now() > expiry;
  } catch {
    return true; // if parsing fails, treat as expired
  }
}

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // 🚫 No token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Expired token → clear storage & redirect to login
  if (isTokenExpired(token)) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed → redirect to dashboard
  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Token valid & role allowed → allow access
  return children;
}

export default ProtectedRoute;
