// modules/support/services/support.api.js

import api from "../../../config/api";

const BASE = "/support";

const supportAPI = {
  createTicket: (payload) =>
    api.post(`${BASE}`, payload),

  getMyTickets: () =>
    api.get(`${BASE}/my`),

  getAllTickets: () =>
    api.get(`${BASE}`),

  getTicket: (ticketId) =>
    api.get(`${BASE}/${ticketId}`),

  assignTicket: (ticketId, agentId) =>
    api.patch(`${BASE}/${ticketId}/assign`, {
      agentId,
    }),

  updateStatus: (ticketId, status) =>
    api.patch(`${BASE}/${ticketId}/status`, {
      status,
    }),

  resolveTicket: (ticketId, resolutionNotes) =>
    api.patch(`${BASE}/${ticketId}/resolve`, {
      resolutionNotes,
    }),

  closeTicket: (ticketId) =>
    api.patch(`${BASE}/${ticketId}/close`),

  getStats: () =>
    api.get(`${BASE}/stats`),
};

export default supportAPI;