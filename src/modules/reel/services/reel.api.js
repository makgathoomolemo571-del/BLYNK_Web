import api from "../../../config/api";

const BASE_URL = "/reels";

const reelApi = {
  // ==========================
  // CRUD
  // ==========================

  createReel: async (payload) => {
    const { data } = await api.post(
        `${BASE_URL}/create`,
        payload
    );

    return data;
},

 getReels: async () => {
  const { data } = await api.get("/reels/feed");
  return data;
},

  getReelById: async (id) => {
  const { data } = await api.get(`/reels/${id}`);
  return data;
},

  updateReel: async (id, payload) => {
    const { data } = await api.patch(`${BASE_URL}/${id}`, payload);
    return data;
  },

  deleteReel: async (id) => {
    const { data } = await api.delete(`${BASE_URL}/${id}`);
    return data;
  },

  // ==========================
  // Like
  // ==========================

  likeReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/like`);
    return data;
  },

  unlikeReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/unlike`);
    return data;
  },

  // ==========================
  // Comment
  // ==========================

  commentReel: async (id, text) => {
    const { data } = await api.post(
      `${BASE_URL}/${id}/comment`,
      { text }
    );

    return data;
  },

  // ==========================
  // Share
  // ==========================

  shareReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/share`);
    return data;
  },

  // ==========================
  // Save
  // ==========================

  saveReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/save`);
    return data;
  },

  unsaveReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/unsave`);
    return data;
  },

  // ==========================
  // View
  // ==========================

  viewReel: async (id) => {
    const { data } = await api.post(`${BASE_URL}/${id}/view`);
    return data;
  },
};

export default reelApi;