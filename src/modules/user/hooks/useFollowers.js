import { useCallback, useEffect, useState } from "react";
import userService from "../services/user.service";

const useFollowers = (userId) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowers = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await userService.getFollowers(userId);

      setFollowers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load followers."
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const refreshFollowers = useCallback(async () => {
    if (!userId) return;

    try {
      setRefreshing(true);
      setError(null);

      const data = await userService.getFollowers(userId);

      setFollowers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to refresh followers."
      );
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  return {
    followers,
    followersCount: followers.length,

    loading,
    refreshing,
    error,

    refreshFollowers,
    setFollowers,
  };
};

export default useFollowers;