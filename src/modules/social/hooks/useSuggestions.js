// modules/social/hooks/useSuggestions.js

import { useCallback, useEffect, useState } from "react";
import socialApi from "../services/social.api";

const useSuggestions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSuggestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response =
        await socialApi.suggestions();

      setUsers(response.data ?? response);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load suggestions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const follow = useCallback(
    async (targetUser) => {
      await socialApi.follow({
        targetUser,
      });

      await loadSuggestions();
    },
    [loadSuggestions]
  );

  const sendFriendRequest = useCallback(
    async (targetUser) => {
      await socialApi.sendFriendRequest({
        targetUser,
      });

      await loadSuggestions();
    },
    [loadSuggestions]
  );

  const block = useCallback(
    async (targetUser) => {
      await socialApi.block({
        targetUser,
      });

      await loadSuggestions();
    },
    [loadSuggestions]
  );

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  return {
    loading,
    error,
    users,
    refresh: loadSuggestions,
    follow,
    sendFriendRequest,
    block,
  };
};

export default useSuggestions;