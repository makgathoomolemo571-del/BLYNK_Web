// modules/social/hooks/useFollowers.js

import { useCallback, useEffect, useState } from "react";
import socialApi from "../services/social.api";

export default function useFollowers() {

  const [followers, setFollowers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadFollowers =
    useCallback(async () => {

      try {

        setLoading(true);

        const { data } =
          await socialApi.getFollowers();

        setFollowers(data);

      } catch (err) {

        setError(
          err?.response?.data?.message ||
          err.message
        );

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {

    loadFollowers();

  }, [loadFollowers]);

  return {

    followers,

    loading,

    error,

    refresh: loadFollowers

  };

}