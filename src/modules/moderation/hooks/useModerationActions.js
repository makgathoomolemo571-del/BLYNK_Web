// modules/moderation/hooks/useModerationActions.js

import { useState } from "react";
import moderationApi from "../services/moderation.api";

const useModerationActions = (
  onSuccess
) => {

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const execute =
    async (promise) => {

      try {

        setLoading(true);
        setError(null);

        await promise();

        if (onSuccess)
          await onSuccess();

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.message
        );

      } finally {

        setLoading(false);

      }

    };

  const approve =
    (reportId) =>
      execute(() =>
        moderationApi.approve(reportId)
      );

  const reject =
    (reportId) =>
      execute(() =>
        moderationApi.reject(reportId)
      );

  const review =
    (
      reportId,
      actionTaken,
      resolutionNotes
    ) =>
      execute(() =>
        moderationApi.review(
          reportId,
          {
            actionTaken,
            resolutionNotes
          }
        )
      );

  return {

    loading,
    error,

    approve,
    reject,
    review

  };

};

export default useModerationActions;