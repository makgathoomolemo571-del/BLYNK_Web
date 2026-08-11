// modules/watchParty/services/watchParty.api.js

import api from "../../../config/api";

/**
 * ===============================
 * WATCH PARTY API
 * ===============================
 */

const BASE_URL = "/watchparties";

/**
 * Create Watch Party
 */
export const createWatchParty = async (payload) => {
  const { data } = await api.post(BASE_URL, payload);
  return data;
};

/**
 * Get Live Watch Parties
 */
export const getLiveWatchParties = async () => {
  const { data } = await api.get(`${BASE_URL}/live`);
  return data;
};

/**
 * Get Watch Party By ID
 */
export const getWatchParty = async (id) => {
  const { data } = await api.get(`${BASE_URL}/${id}`);
  return data;
};

/**
 * Start Watch Party
 */
export const startWatchParty = async (id) => {
  const { data } = await api.patch(`${BASE_URL}/${id}/start`);
  return data;
};

/**
 * End Watch Party
 */
export const endWatchParty = async (id) => {
  const { data } = await api.patch(`${BASE_URL}/${id}/end`);
  return data;
};

/**
 * Join Watch Party
 */
export const joinWatchParty = async (id) => {
  const { data } = await api.post(`${BASE_URL}/${id}/join`);
  return data;
};

/**
 * Leave Watch Party
 */
export const leaveWatchParty = async (id) => {
  const { data } = await api.post(`${BASE_URL}/${id}/leave`);
  return data;
};

/**
 * Delete Watch Party
 */
export const deleteWatchParty = async (id) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);
  return data;
};

/**
 * Default Export
 */
const WatchPartyAPI = {
  createWatchParty,
  getLiveWatchParties,
  getWatchParty,
  startWatchParty,
  endWatchParty,
  joinWatchParty,
  leaveWatchParty,
  deleteWatchParty,
};

export default WatchPartyAPI;