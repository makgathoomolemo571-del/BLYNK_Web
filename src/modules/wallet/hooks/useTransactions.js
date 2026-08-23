import { useCallback, useEffect, useState } from "react";
import walletApi from "../services/wallet.api";

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTransactions =
    useCallback(async () => {
      try {
        setLoading(true);

        const { data } =
          await walletService.getTransactions();

        setTransactions(data);
        setError(null);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err.message ||
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
    refresh: loadTransactions,
  };
}