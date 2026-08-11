// modules/social/hooks/useFriendRequests.js

import { useCallback, useEffect, useState } from "react";
import socialApi from "../services/social.api";

const useFriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [incoming, outgoing] = await Promise.all([
        socialApi.friendRequests(),
        socialApi.sentRequests(),
      ]);

      setRequests(incoming.data ?? incoming);
      setSentRequests(outgoing.data ?? outgoing);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load friend requests."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const accept = useCallback(
    async (requestId) => {
      await socialApi.acceptFriendRequest({
        requestId,
      });

      await loadRequests();
    },
    [loadRequests]
  );

  const reject = useCallback(
    async (requestId) => {
      await socialApi.rejectFriendRequest({
        requestId,
      });

      await loadRequests();
    },
    [loadRequests]
  );

  const cancel = useCallback(
    async (requestId) => {
      await socialApi.cancelFriendRequest({
        requestId,
      });

      await loadRequests();
    },
    [loadRequests]
  );

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return {
    loading,
    error,
    requests,
    sentRequests,
    refresh: loadRequests,
    accept,
    reject,
    cancel,
  };
};

export default useFriendRequests;