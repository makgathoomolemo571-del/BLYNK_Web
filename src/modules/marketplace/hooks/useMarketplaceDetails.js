// modules/marketplace/hooks/useMarketplaceDetails.js

import { useCallback, useEffect, useState } from "react";
import marketplaceApi from "../services/marketplace.api";

const useMarketplaceDetails = (id) => {
  const [listing, setListing] = useState(null);

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadListing = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data } =
        await marketplaceApi.getById(id);

      setListing(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
          err.message
      );

    } finally {
      setLoading(false);
    }
  }, [id]);

  const loadApplications =
    useCallback(async () => {

      if (!id) return;

      try {

        const { data } =
          await marketplaceApi.getApplications(
            id
          );

        setApplications(data);

      } catch (err) {

        setError(
          err?.response?.data?.message ||
            err.message
        );
      }

    }, [id]);

  const apply = useCallback(
    async (payload) => {

      const { data } =
        await marketplaceApi.apply(
          id,
          payload
        );

      await loadApplications();

      return data;
    },
    [id, loadApplications]
  );

  const refresh = useCallback(async () => {
    await Promise.all([
      loadListing(),
      loadApplications(),
    ]);
  }, [loadListing, loadApplications]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    listing,
    applications,

    loading,
    error,

    refresh,
    apply,
  };
};

export default useMarketplaceDetails;