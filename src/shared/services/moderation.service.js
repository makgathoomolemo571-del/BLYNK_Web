import api from "../../config/api";

export const moderationService = {

  reportUser: async (data) => {
    const res = await api.post("/moderation/report-user", data);
    return res.data;
  },

  reportPost: async (data) => {
    const res = await api.post("/moderation/report-post", data);
    return res.data;
  },

  getReports: async () => {
    const res = await api.get("/moderation/reports");
    return res.data;
  },

  takeAction: async (id, action) => {
    const res = await api.patch(`/moderation/${id}/action`, { action });
    return res.data;
  }

};