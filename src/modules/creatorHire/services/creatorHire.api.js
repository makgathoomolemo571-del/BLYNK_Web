// modules/creatorHire/services/creatorHire.api.js

import api from "../../../config/api";

const BASE_URL = "/creator-hire";

/**
 * ===========================
 * CREATE JOB
 * POST /api/creator-hire
 * ===========================
 */
export const createJob = async (payload) => {
  const { data } = await api.post(BASE_URL, payload);
  return data;
};

export const get = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
};

export const getJobApplications = async (id) => {

  const { data } =
    await api.get(
      `${BASE_URL}/${id}/applications`
    );

  return data;

};

export const getAll = async () => {
  const { data } = await api.get(BASE_URL);
  console.log("Creator Hire API:", data);
  return data;
};

/**
 * ===========================
 * APPLY FOR JOB
 * POST /api/creator-hire/:id/apply
 * ===========================
 */
export const applyForJob = async (jobId, payload) => {
  const { data } = await api.post(
    `${BASE_URL}/${jobId}/apply`,
    payload
  );

  return data;
};

/**
 * ===========================
 * UPDATE JOB STATUS
 * PATCH /api/creator-hire/:id/status
 * ===========================
 */
export const updateJobStatus = async (
  jobId,
  status
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${jobId}/status`,
    { status }
  );

  return data;
};

/**
 * ===========================
 * DELETE JOB
 * DELETE /api/creator-hire/:id
 * ===========================
 */
export const deleteJob = async (jobId) => {
  const { data } = await api.delete(
    `${BASE_URL}/${jobId}`
  );

  return data;
};

/**
 * ===========================
 * MY JOBS
 * GET /api/creator-hire/my
 * ===========================
 */
export const getMyJobs = async () => {
  const { data } = await api.get(
    `${BASE_URL}/my`
  );

  return data;
};

/**
 * ===========================
 * CREATOR HIRE STATS
 * GET /api/creator-hire/stats
 * ===========================
 */
export const getCreatorHireStats =
  async () => {
    const { data } = await api.get(
      `${BASE_URL}/stats`
    );

    return data;
  };

export default {
  createJob,
  get,
  getAll,
  applyForJob,
   getJobApplications,
  updateJobStatus,
  deleteJob,
  getMyJobs,
  getCreatorHireStats
};