import API from "../../config/api";

// ======================
// STORIES
// ======================

export const createStory = (data) =>
  API.post("/stories/create", data);

export const getStoryFeed = () =>
  API.get("/stories/feed");

export const viewStory = (id) =>
  API.post(`/stories/${id}/view`);

export const deleteStory = (id) =>
  API.delete(`/stories/${id}`);

export const expireStories = () =>
  API.post("/stories/expire/run");

// ======================
// INTERACTIONS
// ======================

export const reactStory = (id, reaction) =>
  API.post(`/stories/${id}/react`, { reaction });

export const replyStory = (id, message) =>
  API.post(`/stories/${id}/reply`, { message });