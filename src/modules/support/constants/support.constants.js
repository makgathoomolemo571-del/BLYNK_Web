export const SUPPORT_STATUS = Object.freeze({
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  AWAITING_USER: "awaiting_user",
  RESOLVED: "resolved",
  CLOSED: "closed",
});

export const SUPPORT_PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
});

export const SUPPORT_ISSUE_TYPES = Object.freeze({
  TECHNICAL: "technical",
  ACCOUNT: "account",
  LOGIN: "login",
  SUBSCRIPTION: "subscription",
  PAYMENT: "payment",
  CREATOR: "creator",
  BUSINESS: "business",
  MARKETPLACE: "marketplace",
  WALLET: "wallet",
  VERIFICATION: "verification",
  SECURITY: "security",
  OTHER: "other",
});

export const SUPPORT_SORT = Object.freeze({
  NEWEST: "newest",
  OLDEST: "oldest",
});

export const SUPPORT_ACTIONS = Object.freeze({
  CREATE: "CREATE_SUPPORT_TICKET",
  ASSIGN: "ASSIGN_SUPPORT_TICKET",
  UPDATE: "UPDATE_SUPPORT_STATUS",
  RESOLVE: "RESOLVE_SUPPORT_TICKET",
  CLOSE: "CLOSE_SUPPORT_TICKET",
});

export default {
  SUPPORT_STATUS,
  SUPPORT_PRIORITY,
  SUPPORT_ISSUE_TYPES,
  SUPPORT_SORT,
  SUPPORT_ACTIONS,
};