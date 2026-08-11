import axios from "../../../config/api";

export const authAPI = {

  login: (data) =>
    axios.post("/auth/login", data),

  register: (data) =>
    axios.post("/auth/register", data),

  refresh: (token) =>
    axios.post("/auth/refresh", { token }),

  logout: () =>
    axios.post("/auth/logout"),

  forgotPassword: (email) =>
    axios.post("/auth/forgot-password", { email }),

  resetPassword: (data) =>
    axios.post("/auth/reset-password", data),

  verifyEmail: (token) =>
    axios.post("/auth/verify-email", { token }),

  getMe: () =>
    axios.get("/auth/me")

};