import api from "../../../config/api";

const notificationApi = {
  async getNotifications() {
    const { data } = await api.get("/notifications");
    return { data };
  },

  async markAsRead(id) {
    const { data } = await api.patch(`/notifications/${id}/read`);
    return { data };
  },
};

export default notificationApi;