// modules/analytics/hooks/useEngagementStats.js

import { useCallback, useEffect, useState } from "react";
import analyticsApi from "../services/analytics.api";

const initialState = {

  profileViews: 0,

  reelViews: 0,

  podcastPlays: 0

};

export default function useEngagementStats(
  userId,
  role = "member",
  autoLoad = true
) {

  const [stats, setStats] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadStats =
    useCallback(async () => {

      if (!userId) return;

      try {

        setLoading(true);

        setError(null);

        let response;

        switch (role) {

          case "creator":

            response =
              await analyticsApi.getCreatorAnalytics(
                userId
              );

            break;

          case "business":

          case "member":

          default:

            response =
              await analyticsApi.getUserAnalytics(
                userId
              );

            break;

        }

        setStats({

          ...initialState,

          ...response.data

        });

      } catch (err) {

        setError(

          err.response?.data?.message ||

          err.message ||

          "Failed to load engagement statistics."

        );

      } finally {

        setLoading(false);

      }

    }, [userId, role]);

  useEffect(() => {

    if (autoLoad) {

      loadStats();

    }

  }, [autoLoad, loadStats]);

  return {

    stats,

    loading,

    error,

    refresh: loadStats

  };

}