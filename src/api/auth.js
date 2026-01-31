import api from "./axios";

// ✅ JWT Login function (now using username)
export const login = (username, password) => {
  return api.post("token/", {
    username,
    password,
  });
};

// Signup function (update if backend expects username instead of email)
export const signup = (username, password, role) => {
  return api.post("auth/signup/", {
    username,
    password,
    role,
  });
};
