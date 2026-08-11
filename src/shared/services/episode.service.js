import api from "../../../config/api";

export const createEpisode = (data) =>
  api.post("/episodes", data);

export const getEpisode = (id) =>
  api.get(`/episodes/${id}`);

export const updateEpisode = (id, data) =>
  api.patch(`/episodes/${id}`, data);

export const deleteEpisode = (id) =>
  api.delete(`/episodes/${id}`);

export const playEpisode = (id) =>
  api.post(`/episodes/${id}/play`);

export const viewEpisode = (id) =>
  api.post(`/episodes/${id}/view`);

export const likeEpisode = (id) =>
  api.post(`/episodes/${id}/like`);

export const shareEpisode = (id) =>
  api.post(`/episodes/${id}/share`);