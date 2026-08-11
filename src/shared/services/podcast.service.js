import api from "../../../config/api";

export const createPodcast = (data) =>
  api.post("/podcasts", data);

export const getPodcast = (id) =>
  api.get(`/podcasts/${id}`);

export const updatePodcast = (id, data) =>
  api.patch(`/podcasts/${id}`, data);

export const deletePodcast = (id) =>
  api.delete(`/podcasts/${id}`);

export const subscribePodcast = (id) =>
  api.post(`/podcasts/${id}/subscribe`);

export const unsubscribePodcast = (id) =>
  api.post(`/podcasts/${id}/unsubscribe`);

export const getMyPodcasts = () =>
  api.get("/podcasts/my");