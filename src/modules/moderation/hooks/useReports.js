// modules/moderation/hooks/useReports.js

import { useCallback, useEffect, useState } from "react";
import moderationApi from "../services/moderation.api";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(null);

  const loadReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } =
        await moderationApi.getReports();

      setReports(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message
      );

    } finally {

      setLoading(false);

    }

  }, []);

  const loadStats = useCallback(async () => {

    try {

      const { data } =
        await moderationApi.getStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    }

  }, []);

  const refresh = useCallback(async () => {

    setRefreshing(true);

    await Promise.all([
      loadReports(),
      loadStats()
    ]);

    setRefreshing(false);

  }, [loadReports, loadStats]);

  useEffect(() => {

    refresh();

  }, [refresh]);

  return {

    reports,
    stats,

    loading,
    refreshing,

    error,

    refresh

  };
};

export default useReports;