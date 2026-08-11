// modules/marketplace/hooks/useMarketplace.js

import { useCallback, useEffect, useState } from "react";
import marketplaceApi from "../services/marketplace.api";

const useMarketplace = () => {
  const [marketplace, setMarketplace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadMarketplace = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await marketplaceApi.getAll();

      setMarketplace(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load marketplace."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshMarketplace = useCallback(async () => {
    try {
      setRefreshing(true);

      const { data } = await marketplaceApi.getAll();

      setMarketplace(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  const createListing = useCallback(async (payload) => {
    const { data } =
      await marketplaceApi.create(payload);

    setMarketplace((prev) => [
      data,
      ...prev,
    ]);

    return data;
  }, []);

  const updateListing = useCallback(async (id, payload) => {
    const { data } =
      await marketplaceApi.update(id, payload);

    setMarketplace((prev) =>
      prev.map((item) =>
        item.id === id ? data : item
      )
    );

    return data;
  }, []);

  const deleteListing = useCallback(async (id) => {
    await marketplaceApi.remove(id);

    setMarketplace((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }, []);

  useEffect(() => {
    loadMarketplace();
  }, [loadMarketplace]);

  return {
    marketplace,
    loading,
    refreshing,
    error,

    reload: loadMarketplace,
    refreshMarketplace,

    createListing,
    updateListing,
    deleteListing,
  };
};

export default useMarketplace;