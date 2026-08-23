// modules/wallet/hooks/useTransactions.js

import { useCallback, useEffect, useState } from "react";
import walletApi from "../services/wallet.api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await walletApi.getTransactions();

      const rawData = response?.data;

      const transactionData =
        rawData?.data ??
        rawData?.transactions ??
        rawData ??
        [];

      // NEVER allow an object to reach .map()
      const safeTransactions = Array.isArray(transactionData)
        ? transactionData
        : [];

      setTransactions(safeTransactions);

    } catch (err) {
      console.error("TRANSACTIONS LOAD ERROR:", err);

      setTransactions([]);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load transactions."
      );

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    loading,
    error,

    // Keep both names so existing components don't break.
    refresh: loadTransactions,
    getTransactions: loadTransactions,
  };
}