const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ======================
// CORE URL BUILDER
// ======================

export const buildUrl = (path) => {
  return `${BASE_URL}${path}`;
};

// ======================
// MODULE ENDPOINTS
// ======================

export const URLS = {

  auth: {
    login: buildUrl("/auth/login"),
    register: buildUrl("/auth/register"),
    refresh: buildUrl("/auth/refresh"),
    logout: buildUrl("/auth/logout"),
  },

  user: {
    profile: buildUrl("/user/profile"),
  },

  post: {
    create: buildUrl("/post"),
    feed: buildUrl("/post/feed"),
  },

  reel: {
    create: buildUrl("/reel"),
    feed: buildUrl("/reel/feed"),
  },

  story: {
    create: buildUrl("/story/create"),
    feed: buildUrl("/story/feed"),
  },

  wallet: {
    get: buildUrl("/wallet"),
    transactions: buildUrl("/wallet/transactions"),
  },

  notification: {
    get: buildUrl("/notifications"),
  },

  admin: {
    dashboard: buildUrl("/admin/dashboard"),
  }

};