// modules/social/hooks/useFollowing.js

import { useCallback, useEffect, useState } from "react";
import socialApi from "../services/social.api";

export default function useFollowing() {

  const [following, setFollowing] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadFollowing =
    useCallback(async () => {

      try {

        setLoading(true);

        const { data } =
          await socialApi.getFollowing();

        setFollowing(data);

      } catch (err) {

        setError(
          err?.response?.data?.message ||
          err.message
        );

      } finally {

        setLoading(false);

      }

    }, []);

  const unfollow =
    async (targetUser) => {

      await socialApi.unfollow(targetUser);

      await loadFollowing();

    };

  useEffect(() => {

    loadFollowing();

  }, [loadFollowing]);

  return {

    following,

    loading,

    error,

    refresh: loadFollowing,

    unfollow

  };

}