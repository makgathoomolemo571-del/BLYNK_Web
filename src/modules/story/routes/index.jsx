import axios from "axios";

const BASE_URL = "/api/story";

export const createStory = (data) =>
  axios.post(`${BASE_URL}/create`, data);

export const getStoryFeed = () =>
  axios.get(`${BASE_URL}/feed`);

export const viewStory = (storyId) =>
  axios.post(`${BASE_URL}/${storyId}/view`);

export const deleteStory = (storyId) =>
  axios.delete(`${BASE_URL}/${storyId}`);

export const expireStories = () =>
  axios.post(`${BASE_URL}/expire/run`);