import api from "../../config/api";

export const getNotifications = () =>
  api.get("/notifications");

export const markAsRead = (id) =>
  api.patch(`/notifications/${id}`);

export const broadcastNotification = (data) =>
  api.post("/admin/announcement", data);