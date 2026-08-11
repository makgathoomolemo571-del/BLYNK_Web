// modules/verification/constants/verification.constants.js

const VERIFICATION_TYPES = Object.freeze({
  IDENTITY: "identity",
  CREATOR: "creator",
  BUSINESS: "business",
  VENUE: "venue",
  PODCAST: "podcast",
});

const VERIFICATION_STATUS = Object.freeze({
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  APPROVED: "approved",
  REJECTED: "rejected",
});

const VERIFICATION_ENDPOINTS = Object.freeze({
  CREATE: "/verification",
  MY_REQUESTS: "/verification/me",
  APPROVE: (id) => `/verification/${id}/approve`,
  REJECT: (id) => `/verification/${id}/reject`,
  ALL: "/verification/admin/all",
  STATS: "/verification/admin/stats",
});

export {
  VERIFICATION_TYPES,
  VERIFICATION_STATUS,
  VERIFICATION_ENDPOINTS,
};