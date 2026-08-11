import api from "../../../config/api";

const BASE = "/advertisements";

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createAdvertisement = async (payload) => {
  const { data } = await api.post(BASE, payload);
  return data;
};

/*
|--------------------------------------------------------------------------
| GET MY ADS
|--------------------------------------------------------------------------
*/

export const getAdvertisements = async () => {
  const { data } = await api.get(BASE);
  return data;
};

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateAdvertisement = async (
  id,
  payload
) => {

  const { data } =
    await api.patch(
      `${BASE}/${id}`,
      payload
    );

  return data;

};

/*
|--------------------------------------------------------------------------
| PAUSE
|--------------------------------------------------------------------------
*/

export const pauseAdvertisement =
async (id) => {

  const { data } =
    await api.patch(
      `${BASE}/${id}/pause`
    );

  return data;

};

/*
|--------------------------------------------------------------------------
| RESUME
|--------------------------------------------------------------------------
*/

export const resumeAdvertisement =
async (id) => {

  const { data } =
    await api.patch(
      `${BASE}/${id}/resume`
    );

  return data;

};

/*
|--------------------------------------------------------------------------
| CLICK
|--------------------------------------------------------------------------
*/

export const clickAdvertisement =
async (id) => {

  const { data } =
    await api.post(
      `${BASE}/${id}/click`
    );

  return data;

};

/*
|--------------------------------------------------------------------------
| IMPRESSION
|--------------------------------------------------------------------------
*/

export const impressionAdvertisement =
async (id) => {

  const { data } =
    await api.post(
      `${BASE}/${id}/impression`
    );

  return data;

};

export default {

  createAdvertisement,

  getAdvertisements,

  updateAdvertisement,

  pauseAdvertisement,

  resumeAdvertisement,

  clickAdvertisement,

  impressionAdvertisement

};