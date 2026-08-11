import { useCallback, useEffect, useState } from "react";
import profileApi from "../services/profile.api";

export default function useFollowing(userId) {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowing = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await profileApi.getFollowing(userId);

      setFollowing(res?.data || res || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load following");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  return {
    following,
    loading,
    error,
    refetch: fetchFollowing,
  };
}