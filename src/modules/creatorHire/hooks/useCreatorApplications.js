// modules/creatorHire/hooks/useCreatorApplications.js

import { useCallback, useState } from "react";
import creatorHireApi from "../services/creatorHire.api";

export default function useCreatorApplications() {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const apply = useCallback(
    async (
      jobId,
      {
        coverLetter,
        proposedRate,
        portfolio,
      }
    ) => {

      try {

        setLoading(true);

        setError(null);

        const { data } =
          await creatorHireApi.apply(
            jobId,
            {
              coverLetter,
              proposedRate,
              portfolio,
            }
          );

        return data;

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.message
        );

        throw err;

      } finally {

        setLoading(false);

      }
    },
    []
  );

  return {

    apply,

    loading,

    error,

  };
}