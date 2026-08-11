import { useCallback, useEffect, useState } from "react";
import walletService from "../services/wallet.service";

const initialState = {
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

export default function useWallet() {
  const [wallet, setWallet] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWallet = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await walletService.getWallet();

      setWallet(data);
      setError(null);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load wallet."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createWallet = useCallback(async () => {
    const { data } = await walletService.createWallet();

    setWallet(data);

    return data;
  }, []);

  const deposit = useCallback(async (amount) => {
    const { data } =
      await walletService.deposit(amount);

    setWallet(data.wallet);

    return data;
  }, []);

  const withdraw = useCallback(async (amount) => {
    const { data } =
      await walletService.withdraw(amount);

    setWallet(data.wallet);

    return data;
  }, []);

  const freezeWallet = useCallback(async () => {
    const { data } =
      await walletService.freezeWallet();

    setWallet(data);

    return data;
  }, []);

  const closeWallet = useCallback(async () => {
    const { data } =
      await walletService.closeWallet();

    setWallet(data);

    return data;
  }, []);

  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  return {
    wallet,
    loading,
    error,

    refresh: loadWallet,

    createWallet,
    deposit,
    withdraw,
    freezeWallet,
    closeWallet,
  };
}