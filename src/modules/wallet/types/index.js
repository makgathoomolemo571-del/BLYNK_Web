/**
 * Wallet Object
 */
export const WalletShape = {
  id: "",
  userId: "",
  balance: 0,
  currency: "ZAR",
  status: "active",
  totalDeposits: 0,
  totalWithdrawals: 0,
  totalRevenue: 0,
  createdAt: null,
};

/**
 * Transaction Object
 */
export const TransactionShape = {
  id: "",
  type: "",
  amount: 0,
  currency: "ZAR",
  status: "completed",
  reference: "",
  description: "",
  createdAt: null,
};

/**
 * Initial Redux State
 */
export const WalletState = {
  wallet: null,
  transactions: [],
  loading: false,
 error: null,
};