// modules/wallet/services/wallet.api.js

import api from "../../../config/api";

const BASE = "/wallet";

const walletApi = {
  // Wallet
  createWallet: () =>
    api.post(`${BASE}`),

  getMine: () =>
    api.get(`${BASE}/me`),

  freezeWallet: () =>
    api.patch(`${BASE}/freeze`),

  closeWallet: () =>
    api.patch(`${BASE}/close`),

  // Transactions
  deposit: (amount) =>
    api.post(`${BASE}/deposit`, {
      amount,
    }),

  withdraw: (amount) =>
    api.post(`${BASE}/withdraw`, {
      amount,
    }),

  getTransactions: () =>
    api.get(`${BASE}/transactions`),

  // Admin
  getAllWallets: () =>
    api.get(`${BASE}/admin/all`),

  getWalletStats: () =>
    api.get(`${BASE}/admin/stats`),
};

export default walletApi;