import api from "../../config/api";

export const supportService = {

  createTicket: async (data) => {
    const res = await api.post("/support", data);
    return res.data;
  },

  getMyTickets: async () => {
    const res = await api.get("/support/my");
    return res.data;
  },

  getTicketById: async (id) => {
    const res = await api.get(`/support/${id}`);
    return res.data;
  },

  replyTicket: async (id, message) => {
    const res = await api.post(`/support/${id}/reply`, { message });
    return res.data;
  }

};