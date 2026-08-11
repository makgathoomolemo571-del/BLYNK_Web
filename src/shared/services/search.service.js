import api from "../../config/api";

export const searchGlobal = (query) =>
  api.get(`/search?q=${query}`);

export const searchUsers = (query) =>
  api.get(`/search/users?q=${query}`);

export const searchPosts = (query) =>
  api.get(`/search/posts?q=${query}`);

export const searchCreators = (query) =>
  api.get(`/search/creators?q=${query}`);