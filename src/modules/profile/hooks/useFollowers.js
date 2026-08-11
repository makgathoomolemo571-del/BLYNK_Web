import { useCallback, useEffect, useState } from "react";
import profileApi from "../services/profile.api";

export default function useFollowers(userId) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowers = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await profileApi.getFollowers(userId);

      setFollowers(res?.data || res || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load followers");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers]);

  return {
    followers,
    loading,
    error,
    refetch: fetchFollowers,
  };
}