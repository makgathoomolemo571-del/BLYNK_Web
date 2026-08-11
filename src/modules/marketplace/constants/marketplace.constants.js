// modules/marketplace/constants/marketplace.constants.js

export const MARKETPLACE_TYPES = [
  "creator_service",
  "business_opportunity",
  "sponsorship",
  "collaboration",
  "freelance_service",
  "event_opportunity"
];

export const MARKETPLACE_VISIBILITY = [
  "public",
  "members",
  "subscribers"
];

export const APPLICATION_STATUS = [
  "pending",
  "accepted",
  "rejected"
];

export const MARKETPLACE_SORT = {
  NEWEST: "newest",
  OLDEST: "oldest",
  PRICE_ASC: "price_asc",
  PRICE_DESC: "price_desc"
};

export const MARKETPLACE_ENDPOINTS = {

  CREATE: "/marketplace",

  LIST: "/marketplace",

  MY_LISTINGS: "/marketplace/my",

  DETAILS: (id) => `/marketplace/${id}`,

  UPDATE: (id) => `/marketplace/${id}`,

  DELETE: (id) => `/marketplace/${id}`,

  APPLY: (id) => `/marketplace/${id}/apply`,

  APPLICATIONS: (id) =>
    `/marketplace/${id}/applications`
};

export default {
  MARKETPLACE_TYPES,
  MARKETPLACE_VISIBILITY,
  APPLICATION_STATUS,
  MARKETPLACE_SORT,
  MARKETPLACE_ENDPOINTS
};