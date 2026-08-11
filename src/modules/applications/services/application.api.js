// src/modules/applications/services/application.api.js

import api from "../../../config/api";

/*
|--------------------------------------------------------------------------
| Base URL
|--------------------------------------------------------------------------
*/

const BASE_URL = "/applications";

/*
|--------------------------------------------------------------------------
| Create Application
|--------------------------------------------------------------------------
*/

export const createApplication = async (payload) => {
  const { data } = await api.post(
    BASE_URL,
    payload
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| My Applications
|--------------------------------------------------------------------------
*/

export const getMyApplications = async () => {
  const { data } = await api.get(
    `${BASE_URL}/my`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Get Application
|--------------------------------------------------------------------------
*/

export const getApplication = async (id) => {
  const { data } = await api.get(
    `${BASE_URL}/${id}`
  );

  return data;
};

export const getJobApplications = async (id) => {
  const { data } = await api.get(
    `/creator-hire/${id}/applications`
  );

  return data;
};

export const getCampaignApplications = async (id) => {
  const { data } = await api.get(
    `/business-find/${id}/applications`
  );

  return data;
};
/*
|--------------------------------------------------------------------------
| Update Status
|--------------------------------------------------------------------------
*/

export const updateApplicationStatus = async (
  id,
  status
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/status`,
    { status }
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Withdraw Application
|--------------------------------------------------------------------------
*/

export const withdrawApplication = async (
  id
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${id}/withdraw`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

const ApplicationAPI = {
  create: createApplication,
  createApplication,

  getMine: getMyApplications,
  getMyApplications,

  getCampaignApplications,
 getJobApplications,
  getById: getApplication,
  getApplication,

  updateStatus: updateApplicationStatus,
  updateApplicationStatus,

  withdraw: withdrawApplication,
  withdrawApplication
};



export default ApplicationAPI;