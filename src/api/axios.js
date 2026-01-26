import axios from "axios";

// ✅ Create Axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000", // use env var in production
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor: attach access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
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
        const refreshToken = localStorage.getItem("refresh");
        if (refreshToken) {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/accounts/refresh/`,
            { refresh: refreshToken }
          );

          // Save new tokens
          localStorage.setItem("access", res.data.access);
          if (res.data.refresh) {
            localStorage.setItem("refresh", res.data.refresh);
          }

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
