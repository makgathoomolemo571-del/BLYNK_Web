export const WALLET_STATUS = Object.freeze({
  ACTIVE: "active",
  FROZEN: "frozen",
  SUSPENDED: "suspended",
  CLOSED: "closed",
});

export const TRANSACTION_STATUS = Object.freeze({
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
});

export const TRANSACTION_TYPES = Object.freeze({
  CREDIT: "credit",
  DEBIT: "debit",
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  REFUND: "refund",
  COMMISSION: "commission",
  TIP: "tip",
  SUBSCRIPTION: "subscription",
  MARKETPLACE: "marketplace",
  CREATOR_HIRE: "creator_hire",
  BUSINESS_PAYMENT: "business_payment",
});

export const CURRENCY = "ZAR";

export const WALLET_ENDPOINTS = Object.freeze({
  CREATE: "/wallet/create",
  GET: "/wallet",
  DEPOSIT: "/wallet/deposit",
  WITHDRAW: "/wallet/withdraw",
  TRANSACTIONS: "/wallet/transactions",
  FREEZE: "/wallet/freeze",
  CLOSE: "/wallet/close",
});