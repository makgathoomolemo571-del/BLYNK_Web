// modules/podcast/hooks/usePodcast.js

import { useCallback, useEffect, useState } from "react";
import podcastApi from "../services/podcast.api";

export default function usePodcast(id) {
  const [podcast, setPodcast] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const load = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data } =
        await podcastApi.getById(id);

      setPodcast(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load podcast."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  const subscribe = useCallback(async () => {
    await podcastApi.subscribe(id);

    await load();
  }, [id, load]);

  const unsubscribe = useCallback(async () => {
    await podcastApi.unsubscribe(id);

    await load();
  }, [id, load]);

  const update = useCallback(
    async (payload) => {
      const { data } =
        await podcastApi.update(id, payload);

      setPodcast(data);

      return data;
    },
    [id]
  );

  const remove = useCallback(async () => {
    await podcastApi.remove(id);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    podcast,

    loading,

    error,

    reload: load,

    subscribe,

    unsubscribe,

    update,

    remove
  };
}