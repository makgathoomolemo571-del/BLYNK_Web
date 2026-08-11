import api from "../../config/api";

export const recommendationService = {

  getFeed: async (page = 1) => {
    const res = await api.get(`/recommendations/feed?page=${page}`);
    return res.data;
  },

  getTrending: async () => {
    const res = await api.get("/recommendations/trending");
    return res.data;
  },

  getSuggestedUsers: async () => {
    const res = await api.get("/recommendations/users");
    return res.data;
  },

  getSuggestedCreators: async () => {
    const res = await api.get("/recommendations/creators");
    return res.data;
  }

};