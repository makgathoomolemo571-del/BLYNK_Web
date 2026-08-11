// modules/recommendation/hooks/useRecommendations.js

import { useCallback, useEffect, useState } from "react";
import recommendationApi from "../services/recommendation.api";

const useRecommendations = (limit = 20) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadRecommendations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } =
        await recommendationApi.getRecommendations(limit);

      setRecommendations(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err.message
      );

    } finally {

      setLoading(false);

    }
  }, [limit]);

  const refresh = useCallback(async () => {

    try {

      setRefreshing(true);

      const { data } =
        await recommendationApi.getRecommendations(limit);

      setRecommendations(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err.message
      );

    } finally {

      setRefreshing(false);

    }

  }, [limit]);

  const viewed = useCallback(async (id) => {

    try {

      await recommendationApi.trackView(id);

    } catch (_) {}

  }, []);

  const clicked = useCallback(async (id) => {

    try {

      await recommendationApi.trackClick(id);

    } catch (_) {}

  }, []);

  useEffect(() => {

    loadRecommendations();

  }, [loadRecommendations]);

  return {

    recommendations,

    loading,

    refreshing,

    error,

    refresh,

    reload: loadRecommendations,

    viewed,

    clicked

  };
};

export default useRecommendations;