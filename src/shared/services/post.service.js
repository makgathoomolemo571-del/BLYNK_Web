import API from "../../config/api";

// ======================
// POSTS
// ======================

export const createPost = (data) =>
  API.post("/posts", data);

export const getFeed = (page = 1) =>
  API.get(`/posts/feed?page=${page}`);

export const getPost = (id) =>
  API.get(`/posts/${id}`);

export const deletePost = (id) =>
  API.delete(`/posts/${id}`);

export const likePost = (id) =>
  API.post(`/posts/${id}/like`);

export const commentPost = (id, comment) =>
  API.post(`/posts/${id}/comment`, { comment });

export const sharePost = (id) =>
  API.post(`/posts/${id}/share`);