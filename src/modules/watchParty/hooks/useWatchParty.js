// hooks/useWatchParty.js

import { useCallback, useEffect, useState } from "react";
import watchPartyApi from "../services/watchParty.api";

const useWatchParty = (id = null) => {
  const [watchParty, setWatchParty] = useState(null);
  const [liveWatchParties, setLiveWatchParties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLive = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await watchPartyApi.getLive();

      setLiveWatchParties(data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getWatchParty = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data } =
        await watchPartyApi.getById(id);

      setWatchParty(data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  const join = useCallback(async () => {
    if (!id) return;

    const { data } =
      await watchPartyApi.join(id);

    setWatchParty(data);

    return data;
  }, [id]);

  const leave = useCallback(async () => {
    if (!id) return;

    const { data } =
      await watchPartyApi.leave(id);

    setWatchParty(data);

    return data;
  }, [id]);

  useEffect(() => {
    if (id) getWatchParty();
  }, [id, getWatchParty]);

  return {
    loading,
    error,
    watchParty,
    liveWatchParties,

    getWatchParty,
    getLive,

    join,
    leave
  };
};

export default useWatchParty;