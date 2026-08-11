// modules/recommendation/services/recommendation.api.js

import api from "../../../config/api";

const BASE = "/recommendations";

const recommendationAPI = {

  getRecommendations: async () => {

    const {data} =
      await api.get("/recommendations");

    return data;

  },

  generate(limit = 20) {
    return api.get(`${BASE}?limit=${limit}`);
  },

  trackView(id) {
    return api.post(`${BASE}/${id}/view`);
  },

  trackClick(id) {
    return api.post(`${BASE}/${id}/click`);
  },

  stats() {
    return api.get(`${BASE}/stats`);
  }

};

export default recommendationAPI;