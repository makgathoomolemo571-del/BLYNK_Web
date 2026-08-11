// modules/moderation/services/moderation.api.js

import api from "../../../config/api";

const BASE = "/moderation";

const moderationApi = {
  // ===========================
  // REPORTS
  // ===========================

  submitReport(data) {
    return api.post(`${BASE}/report`, data);
  },

  getReports(params = {}) {
    return api.get(`${BASE}`, { params });
  },

  getReport(id) {
    return api.get(`${BASE}/${id}`);
  },

  // ===========================
  // REVIEW
  // ===========================

  reviewReport(id, payload) {
    return api.patch(`${BASE}/${id}/review`, payload);
  },

  approveReport(id) {
    return api.patch(`${BASE}/${id}/approve`);
  },

  rejectReport(id) {
    return api.patch(`${BASE}/${id}/reject`);
  },

  // ===========================
  // DASHBOARD
  // ===========================

  getStats() {
    return api.get(`${BASE}/stats`);
  }
};

export default moderationApi;