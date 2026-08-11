// modules/businessFind/services/businessFind.api.js

import api from "../../../config/api";

/**
 * BUSINESS FIND API
 * Mirrors backend routes.
 */

const BASE = "/business-find";

const businessFindApi = {
  // =====================================================
  // Campaigns
  // =====================================================

  create(data) {
    return api.post(BASE, data);
  },

  getAll() {
    return api.get("/business-find");
},

  // =====================================================
  // Statistics
  // =====================================================

  // Statistics
getStats() {
  return api.get(`${BASE}/stats`);
},

  getMyCampaigns() {
    return api.get(`${BASE}/my`);
  },

  getById(id) {
    return api.get(`${BASE}/${id}`);
  },

  updateStatus(id, status) {
    return api.patch(`${BASE}/${id}/status`, {
      status,
    });
  },

  remove(id) {
  return api.delete(`${BASE}/${id}`);
},

  // =====================================================
  // Creator Applications
  // =====================================================

  apply(id, application) {
    return api.post(
      `${BASE}/${id}/apply`,
      application
    );
  },


};

export default businessFindApi;