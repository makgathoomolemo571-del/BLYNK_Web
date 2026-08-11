// modules/social/hooks/useFriends.js

import { useCallback, useEffect, useState } from "react";
import socialApi from "../services/social.api";

export default function useFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadFriends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await socialApi.getFriends();

      setFriends(data);

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const unfriend = async (targetUser) => {
    await socialApi.unfriend(targetUser);
    await loadFriends();
  };

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  return {
    friends,
    loading,
    error,
    refresh: loadFriends,
    unfriend
  };
}