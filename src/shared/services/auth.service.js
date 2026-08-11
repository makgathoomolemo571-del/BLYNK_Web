import api from "./apiClient";

export const authService = {

  login: (data) =>
    api.post("/auth/login", data),

  register: (data) =>
    api.post("/auth/register", data),

  logout: () =>
    api.post("/auth/logout"),

  refreshToken: () =>
    api.post("/auth/refresh"),

  verifyEmail: (token) =>
    api.post("/auth/verify-email", { token }),

  forgotPassword: (email) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (data) =>
    api.post("/auth/reset-password", data)

};