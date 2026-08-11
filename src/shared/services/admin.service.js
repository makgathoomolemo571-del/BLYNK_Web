import api from "../../config/api";

export const getDashboard = () =>
  api.get("/admin/dashboard");

export const getUsers = () =>
  api.get("/admin/users");

export const suspendUser = (id) =>
  api.patch(`/admin/users/${id}/suspend`);

export const unsuspendUser = (id) =>
  api.patch(`/admin/users/${id}/unsuspend`);

export const changeRole = (id, role) =>
  api.patch(`/admin/users/${id}/role`, { role });

export const getReports = () =>
  api.get("/admin/reports");

export const getSupport = () =>
  api.get("/admin/support");

export const getVerification = () =>
  api.get("/admin/verification");