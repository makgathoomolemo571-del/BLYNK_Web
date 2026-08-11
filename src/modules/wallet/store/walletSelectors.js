// modules/wallet/store/walletSelectors.js

export const selectWallet = (state) =>
  state.wallet.wallet;

export const selectWalletLoading = (state) =>
  state.wallet.loading;

export const selectWalletError = (state) =>
  state.wallet.error;

export const selectWalletBalance = (state) =>
  state.wallet.wallet?.balance ?? 0;

export const selectWalletCurrency = (state) =>
  state.wallet.wallet?.currency ?? "ZAR";

export const selectWalletStatus = (state) =>
  state.wallet.wallet?.status;

export const selectTotalRevenue = (state) =>
  state.wallet.wallet?.totalRevenue ?? 0;

export const selectTotalDeposits = (state) =>
  state.wallet.wallet?.totalDeposits ?? 0;

export const selectTotalWithdrawals = (state) =>
  state.wallet.wallet?.totalWithdrawals ?? 0;

export const selectTransactions = (state) =>
  state.wallet.transactions;

export const selectTransactionById =
(id) => (state) =>
  state.wallet.transactions.find(
    (tx) => tx.id === id
  );

export const selectRecentTransactions =
(state) =>
  state.wallet.transactions.slice(0, 10);

export const selectPendingTransactions =
(state) =>
  state.wallet.transactions.filter(
    (tx) => tx.status === "pending"
  );

export const selectCompletedTransactions =
(state) =>
  state.wallet.transactions.filter(
    (tx) => tx.status === "completed"
  );

export const selectWalletSummary =
(state) => ({

  balance:
    state.wallet.wallet?.balance ?? 0,

  deposits:
    state.wallet.wallet?.totalDeposits ?? 0,

  withdrawals:
    state.wallet.wallet?.totalWithdrawals ?? 0,

  revenue:
    state.wallet.wallet?.totalRevenue ?? 0,

  currency:
    state.wallet.wallet?.currency ?? "ZAR",

  status:
    state.wallet.wallet?.status

});