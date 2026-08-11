// modules/social/services/social.api.js

import api from "../../../config/api";

const BASE = "/social";

/* ===========================
   FOLLOW
=========================== */

export const follow = (targetUser) =>
  api.post(`${BASE}/follow`, {
    targetUser,
  });

export const unfollow = (targetUser) =>
  api.post(`${BASE}/unfollow`, {
    targetUser,
  });

/* ===========================
   BLOCK
=========================== */

export const block = (targetUser) =>
  api.post(`${BASE}/block`, {
    targetUser,
  });

export const unblock = (targetUser) =>
  api.post(`${BASE}/unblock`, {
    targetUser,
  });

/* ===========================
   MUTE
=========================== */

export const mute = (targetUser) =>
  api.post(`${BASE}/mute`, {
    targetUser,
  });

export const unmute = (targetUser) =>
  api.post(`${BASE}/unmute`, {
    targetUser,
  });

/* ===========================
   FOLLOW LISTS
=========================== */

export const getFollowers = () =>
  api.get(`${BASE}/followers`);

export const getFollowing = () =>
  api.get(`${BASE}/following`);

export const getSuggestions = () =>
  api.get(`${BASE}/suggestions`);

/* ===========================
   FRIEND REQUESTS
=========================== */

export const sendFriendRequest = (targetUser) => {

  console.log("FRIEND REQUEST TARGET:", targetUser);

  return api.post(`${BASE}/friend/request`, {
    targetUser
  });
};

export const cancelFriendRequest = (targetUser) =>
  api.post(`${BASE}/friend/cancel`, {
    targetUser,
  });

export const acceptFriendRequest = (requestId) =>
  api.post(`${BASE}/friend/accept`, {
    requestId,
  });

export const rejectFriendRequest = (requestId) =>
  api.post(`${BASE}/friend/reject`, {
    requestId,
  });
  export const getBlockedUsers = () =>
  api.get("/social/blocked");

export const unfriend = (targetUser) =>
  api.post(`${BASE}/friend/unfriend`, {
    targetUser,
  });

/* ===========================
   FRIEND LISTS
=========================== */

export const getFriends = () =>
  api.get(`${BASE}/friends`);

export const getFriendRequests = () =>
  api.get(`${BASE}/friend-requests`);

export const getSentRequests = () =>
  api.get(`${BASE}/sent-requests`);

/* ===========================
   DEFAULT
=========================== */

const socialAPI = {
  follow,
  unfollow,

  block,
  unblock,

  mute,
  unmute,

  getFollowers,
  getFollowing,
  getSuggestions,

  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  unfriend,

  getFriends,
  getFriendRequests,
  getSentRequests,
};

export default socialAPI;