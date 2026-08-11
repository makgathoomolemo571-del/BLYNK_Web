// modules/businessFind/constants/businessFind.constants.js

const BUSINESS_FIND_STATUS = Object.freeze({
  DRAFT: "draft",
  ACTIVE: "active",
  PAUSED: "paused",
  CLOSED: "closed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const BUSINESS_FIND_VISIBILITY = Object.freeze({
  PUBLIC: "public",
  PRIVATE: "private",
  INVITE_ONLY: "invite_only",
});

const COMPENSATION_TYPES = Object.freeze({
  FIXED: "fixed",
  REVENUE_SHARE: "revenue_share",
  SPONSORSHIP: "sponsorship",
  HYBRID: "hybrid",
  TOKENS: "tokens",
  VIG_POINTS: "vig_points",
});

const APPLICATION_STATUS = Object.freeze({
  PENDING: "pending",
  REVIEWING: "reviewing",
  SHORTLISTED: "shortlisted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
});

const INDUSTRIES = Object.freeze({
  TECHNOLOGY: "Technology",
  FASHION: "Fashion",
  BEAUTY: "Beauty",
  FOOD: "Food",
  EDUCATION: "Education",
  HEALTH: "Health",
  FINANCE: "Finance",
  TRAVEL: "Travel",
  SPORTS: "Sports",
  AUTOMOTIVE: "Automotive",
  ENTERTAINMENT: "Entertainment",
  GAMING: "Gaming",
  MUSIC: "Music",
  REAL_ESTATE: "Real Estate",
  AGRICULTURE: "Agriculture",
  ECOMMERCE: "E-Commerce",
  OTHER: "Other",
});

const SORT_OPTIONS = Object.freeze({
  NEWEST: "newest",
  OLDEST: "oldest",
  POPULAR: "popular",
  BUDGET_HIGH: "budget_high",
  BUDGET_LOW: "budget_low",
});

const DEFAULT_FILTERS = Object.freeze({
  page: 1,
  limit: 20,
  sort: SORT_OPTIONS.NEWEST,
  status: BUSINESS_FIND_STATUS.ACTIVE,
  visibility: BUSINESS_FIND_VISIBILITY.PUBLIC,
});

export {
  BUSINESS_FIND_STATUS,
  BUSINESS_FIND_VISIBILITY,
  COMPENSATION_TYPES,
  APPLICATION_STATUS,
  INDUSTRIES,
  SORT_OPTIONS,
  DEFAULT_FILTERS,
};

export default {
  BUSINESS_FIND_STATUS,
  BUSINESS_FIND_VISIBILITY,
  COMPENSATION_TYPES,
  APPLICATION_STATUS,
  INDUSTRIES,
  SORT_OPTIONS,
  DEFAULT_FILTERS,
};