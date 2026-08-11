import API from "../../config/api";

// ======================
// REELS
// ======================

export const createReel = (data) =>
  API.post("/reels", data);

export const getReelsFeed = (page = 1) =>
  API.get(`/reels/feed?page=${page}`);

export const getReel = (id) =>
  API.get(`/reels/${id}`);

export const deleteReel = (id) =>
  API.delete(`/reels/${id}`);

// ======================
// ENGAGEMENT
// ======================

export const likeReel = (id) =>
  API.post(`/reels/${id}/like`);

export const viewReel = (id) =>
  API.post(`/reels/${id}/view`);

export const shareReel = (id) =>
  API.post(`/reels/${id}/share`);