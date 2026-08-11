// modules/podcast/hooks/usePodcasts.js

import { useCallback, useEffect, useState } from "react";
import podcastApi from "../services/podcast.api";

export default function usePodcasts(initialParams = {}) {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(
    async (params = initialParams) => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await podcastApi.getAll(params);

        setPodcasts(data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load podcasts."
        );
      } finally {
        setLoading(false);
      }
    },
    [initialParams]
  );

  const refresh = useCallback(async () => {
    try {
      setRefreshing(true);

      const { data } =
        await podcastApi.getAll(initialParams);

      setPodcasts(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message
      );
    } finally {
      setRefreshing(false);
    }
  }, [initialParams]);

  const remove = useCallback((id) => {
    setPodcasts((prev) =>
      prev.filter((podcast) => podcast.id !== id)
    );
  }, []);

  const update = useCallback((updatedPodcast) => {
    setPodcasts((prev) =>
      prev.map((podcast) =>
        podcast.id === updatedPodcast.id
          ? updatedPodcast
          : podcast
      )
    );
  }, []);

  const prepend = useCallback((podcast) => {
    setPodcasts((prev) => [podcast, ...prev]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    podcasts,

    loading,

    refreshing,

    error,

    reload: load,

    refresh,

    remove,

    update,

    prepend
  };
}