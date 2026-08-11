import api from "../../config/api";

export const verificationService = {

  requestVerification: async (data) => {
    const res = await api.post("/verification/request", data);
    return res.data;
  },

  getMyRequest: async () => {
    const res = await api.get("/verification/my");
    return res.data;
  },

  adminGetRequests: async () => {
    const res = await api.get("/verification");
    return res.data;
  },

  approve: async (id) => {
    const res = await api.patch(`/verification/${id}/approve`);
    return res.data;
  },

  reject: async (id, reason) => {
    const res = await api.patch(`/verification/${id}/reject`, { reason });
    return res.data;
  }

};