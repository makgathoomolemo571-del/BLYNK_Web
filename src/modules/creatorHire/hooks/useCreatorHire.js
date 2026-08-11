// modules/creatorHire/hooks/useCreatorHire.js

import { useCallback, useEffect, useState } from "react";
import creatorHireApi from "../services/creatorHire.api";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

export default function useCreatorHire() {
  const [state, setState] = useState(initialState);

  const loadMyJobs = useCallback(async () => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const { data } = await creatorHireApi.getMyJobs();

      setState({
        jobs: data,
        loading: false,
        error: null,
      });

    } catch (error) {

      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error.response?.data?.message ||
          error.message,
      }));

    }
  }, []);

  const createJob = useCallback(async (payload) => {

    const { data } =
      await creatorHireApi.create(payload);

    setState((prev) => ({
      ...prev,
      jobs: [data, ...prev.jobs],
    }));

    return data;

  }, []);

  const updateStatus = useCallback(
    async (jobId, status) => {

      const { data } =
        await creatorHireApi.updateStatus(
          jobId,
          status
        );

      setState((prev) => ({
        ...prev,
        jobs: prev.jobs.map((job) =>
          job.id === jobId ? data : job
        ),
      }));

      return data;
    },
    []
  );

  const deleteJob = useCallback(
    async (jobId) => {

      await creatorHireApi.delete(jobId);

      setState((prev) => ({
        ...prev,
        jobs: prev.jobs.filter(
          (job) => job.id !== jobId
        ),
      }));
    },
    []
  );

  useEffect(() => {
    loadMyJobs();
  }, [loadMyJobs]);

  return {

    jobs: state.jobs,

    loading: state.loading,

    error: state.error,

    refresh: loadMyJobs,

    createJob,

    updateStatus,

    deleteJob,

  };
}