import api from "../../../config/api";

export const createWatchParty = (data) =>
  api.post("/watchparties", data);

export const getLiveWatchParties = () =>
  api.get("/watchparties/live");

export const getWatchParty = (id) =>
  api.get(`/watchparties/${id}`);

export const startWatchParty = (id) =>
  api.patch(`/watchparties/${id}/start`);

export const endWatchParty = (id) =>
  api.patch(`/watchparties/${id}/end`);

export const joinWatchParty = (id) =>
  api.post(`/watchparties/${id}/join`);

export const leaveWatchParty = (id) =>
  api.post(`/watchparties/${id}/leave`);

export const deleteWatchParty = (id) =>
  api.delete(`/watchparties/${id}`);