// modules/verification/services/verification.api.js

import api from "../../../config/api";

const BASE = "/verification";

const verificationAPI = {

  submit(data) {
    return api.post(BASE, data);
  },

  getMine() {
    return api.get(`${BASE}/mine`);
  },

  approve(id) {
    return api.patch(`${BASE}/${id}/approve`);
  },

  reject(id, rejectionReason) {
    return api.patch(`${BASE}/${id}/reject`, {
      rejectionReason
    });
  },

  getAll() {
    return api.get(`${BASE}/admin`);
  },

  getStats() {
    return api.get(`${BASE}/admin/stats`);
  }

};

export default verificationAPI;