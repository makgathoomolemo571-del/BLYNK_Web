import { useCallback, useEffect, useState } from "react";

import userService from "../services/user.service";

const useFollowing = (userId) => {
  const [following, setFollowing] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const loadFollowing = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const response =
        await userService.getFollowing(userId);

      setFollowing(response || []);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to load following."
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadFollowing();
  }, [loadFollowing]);

  const refresh = () => loadFollowing();

  return {
    following,
    loading,
    error,
    refresh,
    setFollowing
  };
};

export default useFollowing;