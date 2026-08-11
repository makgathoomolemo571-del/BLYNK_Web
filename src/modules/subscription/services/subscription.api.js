// modules/subscription/services/subscription.api.js

import api from "../../../config/api";

const BASE_URL = "/subscriptions";

const subscriptionApi = {
  /**
   * Get my current subscription
   */
  getMine: async () => {
    const { data } = await api.get(`${BASE_URL}/me`);
    return data;
  },

  /**
   * Create subscription
   */
  create: async (plan) => {
    const { data } = await api.post(BASE_URL, {
      plan,
    });

    return data;
  },

  /**
   * Upgrade current subscription
   */
  upgrade: async (plan) => {
    const { data } = await api.patch(
      `${BASE_URL}/upgrade`,
      {
        plan,
      }
    );

    return data;
  },

  /**
   * Cancel subscription
   */
  cancel: async () => {
    const { data } = await api.patch(
      `${BASE_URL}/cancel`
    );

    return data;
  },
};

export default subscriptionApi;