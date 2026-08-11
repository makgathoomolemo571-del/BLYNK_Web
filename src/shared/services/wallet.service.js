import api from "../../../config/api";

export const getWallet = () =>
  api.get("/wallet");

export const getTransactions = () =>
  api.get("/wallet/transactions");

export const sendTokens = (data) =>
  api.post("/wallet/send", data);

export const redeemVoucher = (data) =>
  api.post("/wallet/redeem", data);

export const convertToVigPoints = (data) =>
  api.post("/wallet/convert", data);