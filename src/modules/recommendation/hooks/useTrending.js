// modules/recommendation/hooks/useTrending.js

import { useCallback, useEffect, useState } from "react";
import recommendationApi from "../services/recommendation.api";

const useTrending = () => {

  const [trending, setTrending] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadTrending = useCallback(async () => {

    try {

      setLoading(true);

      setError(null);

      const { data } =
        await recommendationApi.getTrending();

      setTrending(data);

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

    loadTrending();

  }, [loadTrending]);

  return {

    trending,

    loading,

    error,

    reload: loadTrending

  };

};

export default useTrending;