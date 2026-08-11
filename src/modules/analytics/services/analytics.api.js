// modules/analytics/services/analytics.api.js

import api from "../../../config/api";

class AnalyticsAPI {
  /*
  ============================
  TRACK EVENT
  POST /api/analytics/track
  ============================
  */
  async track(data) {
    const response = await api.post(
      "/analytics/track",
      {
        eventType: data.eventType,
        targetId: data.targetId,
        targetType: data.targetType,
        metadata: data.metadata || {}
      }
    );

    return response.data;
  }

  /*
  ============================
  USER ANALYTICS
  GET /api/analytics/user/:id
  ============================
  */
  async getUserAnalytics(userId) {
    const response = await api.get(
      `/analytics/user/${userId}`
    );

    return response.data;
  }

  /*
  ============================
  CREATOR ANALYTICS
  GET /api/analytics/creator/:id
  ============================
  */
  async getCreatorAnalytics(creatorId) {
    const response = await api.get(
      `/analytics/creator/${creatorId}`
    );

    return response.data;
  }

  /*
  ============================
  PLATFORM ANALYTICS
  GET /api/analytics/platform
  ============================
  */
  async getPlatformAnalytics() {
    const response = await api.get(
      "/analytics/platform"
    );

    return response.data;
  }

  /*
  ============================
  DASHBOARD STATS
  GET /api/analytics/stats
  ============================
  */
  async getStats() {
    const response = await api.get(
      "/analytics/stats"
    );

    return response.data;
  }
}

export default new AnalyticsAPI();