import api from "../config/api";

export const searchAll = async (query) => {

  const res = await api.get("/search", {

    params: { q: query }

  });

  return res.data;

};

export const searchUsers = async (query) => {

  const res = await api.get("/search/users", {

    params: { q: query }

  });

  return res.data;

};

export const searchPosts = async (query) => {

  const res = await api.get("/search/posts", {

    params: { q: query }

  });

  return res.data;

};