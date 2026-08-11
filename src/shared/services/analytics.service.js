import api from "../../config/api";

export const getPlatformAnalytics = () =>
  api.get("/admin/analytics");

export const getUserAnalytics = () =>
  api.get("/analytics/user");

export const getCreatorAnalytics = () =>
  api.get("/analytics/creator");