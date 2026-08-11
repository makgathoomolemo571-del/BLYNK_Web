import api from "./apiClient";

export const userService = {

  getMe: () =>
    api.get("/users/me"),

  getUserById: (id) =>
    api.get(`/users/${id}`),

  updateUser: (data) =>
    api.patch("/users/update", data),

  searchUsers: (query) =>
    api.get(`/users/search?q=${query}`),

  followUser: (id) =>
    api.post("/social/follow", { id }),

  unfollowUser: (id) =>
    api.post("/social/unfollow", { id }),

  blockUser: (id) =>
    api.post("/social/block", { id }),

  unblockUser: (id) =>
    api.post("/social/unblock", { id })

};