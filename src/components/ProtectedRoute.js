import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ decode JWT payload

// ✅ Utility: check if JWT token is expired
function isTokenExpired(token) {
  try {
    const payload = jwtDecode(token);
    const expiry = payload.exp * 1000; // convert to ms
    return Date.now() > expiry;
  } catch {
    return true; // if parsing fails, treat as expired
  }
}

// ✅ Utility: get token from storage
function getToken() {
  return (
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken")
  );
}

// ✅ Utility: get role (from storage or token payload)
function getUserRole() {
  const role =
    localStorage.getItem("role") || sessionStorage.getItem("role");
  const token = getToken();

  if (role) return role;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.role || null; // adjust if backend encodes role differently
    } catch {
      return null;
    }
  }
  return null;
}

function ProtectedRoute({ children, allowedRoles }) {
  const token = getToken();

  // 🚫 No token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Expired token → clear auth keys & redirect to login
  if (isTokenExpired(token)) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role not allowed → redirect to dashboard
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // ✅ Token valid & role allowed → allow access
  return children;
}

export default ProtectedRoute;
