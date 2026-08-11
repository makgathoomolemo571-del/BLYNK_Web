export const APP_NAME = "BLYNK";

export const APP_VERSION = "1.0.0";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// ======================
// USER ROLES
// ======================

export const ROLES = {
  MEMBER: "member",
  CREATOR: "creator",
  BUSINESS: "business",
  ADMIN: "admin",
  SUPERADMIN: "superadmin"
};

// ======================
// AUTH STORAGE KEYS
// ======================

export const STORAGE_KEYS = {
  TOKEN: "blynk_token",
  REFRESH_TOKEN: "blynk_refresh_token",
  USER: "blynk_user",
  THEME: "blynk_theme"
};

// ======================
// SUBSCRIPTION PLANS
// ======================

export const PLANS = {
  FREE_MEMBER: "FREE_MEMBER",
  FREE_CREATOR: "FREE_CREATOR",
  FREE_BUSINESS: "FREE_BUSINESS",

  MEMBER_BASIC: "MEMBER_BASIC",
  MEMBER_PLUS: "MEMBER_PLUS",
  MEMBER_VIP: "MEMBER_VIP",

  CREATOR_BASIC: "CREATOR_BASIC",
  CREATOR_PLUS: "CREATOR_PLUS",
  CREATOR_PRO: "CREATOR_PRO",

  BUSINESS_BASIC: "BUSINESS_BASIC",
  BUSINESS_PRO: "BUSINESS_PRO",
  BUSINESS_ENTERPRISE: "BUSINESS_ENTERPRISE"
};

// ======================
// FEATURE FLAGS (Frontend gating)
// ======================

export const FEATURES = {
  CREATE_POST: "CREATE_POST",
  CREATE_REEL: "CREATE_REEL",
  CREATE_PODCAST: "CREATE_PODCAST",
  CREATE_MARKETPLACE_LISTING: "CREATE_MARKETPLACE_LISTING",
  APPLY_CREATOR_HIRE: "APPLY_CREATOR_HIRE",
  APPLY_BUSINESS_FIND: "APPLY_BUSINESS_FIND",
  GO_LIVE: "GO_LIVE",
  SEND_MESSAGE: "SEND_MESSAGE",
  WITHDRAW_FUNDS: "WITHDRAW_FUNDS",
  VIEW_ANALYTICS: "VIEW_ANALYTICS",
  ADMIN_PANEL: "ADMIN_PANEL"
};

// ======================
// MEDIA LIMITS (UI VALIDATION)
// ======================

export const MEDIA_LIMITS = {
  IMAGE_MAX_MB: 15,
  VIDEO_MAX_MB: 500,
  AUDIO_MAX_MB: 250,
  DOC_MAX_MB: 50,
  PROFILE_PIC_MB: 5
};

// ======================
// PAGINATION DEFAULTS
// ======================

export const PAGINATION = {
  FEED_LIMIT: 20,
  SEARCH_LIMIT: 20,
  NOTIFICATION_LIMIT: 30,
  COMMENT_LIMIT: 50
};

// ======================
// STORY SETTINGS
// ======================

export const STORY = {
  LIFETIME_HOURS: 24
};

// ======================
// REWARD SYSTEM
// ======================

export const REWARDS = {
  WALLET_CURRENCY: "TOKENS",
  POINTS_CURRENCY: "VIG_POINTS",
  VOUCHER_CURRENCY: "VOUCHERS"
};

// ======================
// SOCKET EVENTS (Frontend listening layer)
// ======================

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  NOTIFICATION: "notification",
  MESSAGE: "message",

  STORY_CREATED: "STORY_CREATED",
  STORY_VIEWED: "STORY_VIEWED",

  POST_LIKED: "POST_LIKED",
  POST_COMMENTED: "POST_COMMENTED",

  WALLET_UPDATED: "WALLET_UPDATED"
};