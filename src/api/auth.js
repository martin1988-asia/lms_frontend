import api from "./axios";

// Login function
export const login = (email, password) => {
  return api.post("/accounts/login/", {
    email,
    password,
  });
};

// Signup function
export const signup = (email, password, role) => {
  return api.post("/accounts/signup/", {
    email,
    password,
    role,
  });
};
