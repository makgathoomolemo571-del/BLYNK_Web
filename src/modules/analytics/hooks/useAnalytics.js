// modules/analytics/hooks/useAnalytics.js

import { useCallback, useEffect, useState } from "react";
import analyticsApi from "../services/analytics.api";

const initialState = {
  totalEvents: 0,
  today: 0,
  thisWeek: 0,
};

export default function useAnalytics(autoLoad = true) {
  const [analytics, setAnalytics] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } =
        await analyticsApi.getPlatformAnalytics();

      setAnalytics(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load analytics."
      );

    } finally {

      setLoading(false);

    }
  }, []);

  useEffect(() => {

    if (autoLoad) {

      loadAnalytics();

    }

  }, [autoLoad, loadAnalytics]);

  return {

    analytics,

    loading,

    error,

    refresh: loadAnalytics

  };
}