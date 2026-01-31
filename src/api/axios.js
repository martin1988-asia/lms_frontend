import axios from "axios";

// ✅ Create Axios instance with base URL
const api = axios.create({
  baseURL: "https://pok-uncubic-pearlie.ngrok-free.dev/api/",  // ✅ Ngrok backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Helper: clear all auth keys
function clearAuth() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("role");
}

// ✅ Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and refresh token exists, try refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken =
          localStorage.getItem("refreshToken") ||
          sessionStorage.getItem("refreshToken");

        if (refreshToken) {
          // ✅ Detect storage type (local vs session)
          const storage = localStorage.getItem("refreshToken")
            ? localStorage
            : sessionStorage;

          // ✅ Correct SimpleJWT refresh endpoint
          const res = await axios.post(
            "https://pok-uncubic-pearlie.ngrok-free.dev/api/token/refresh/",
            { refresh: refreshToken }
          );

          // Save new tokens in the same storage type
          storage.setItem("accessToken", res.data.access);
          if (res.data.refresh) {
            storage.setItem("refreshToken", res.data.refresh);
          }

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        clearAuth();
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
