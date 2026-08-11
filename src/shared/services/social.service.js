import API from "../../config/api";

// ======================
// FRIEND SYSTEM
// ======================

export const sendFriendRequest = (userId) =>
  API.post("/social/friend/request", { userId });

export const cancelFriendRequest = (userId) =>
  API.post("/social/friend/cancel", { userId });

export const acceptFriendRequest = (userId) =>
  API.post("/social/friend/accept", { userId });

export const rejectFriendRequest = (userId) =>
  API.post("/social/friend/reject", { userId });

export const unfriend = (userId) =>
  API.post("/social/friend/unfriend", { userId });

// ======================
// FOLLOW SYSTEM
// ======================

export const followUser = (userId) =>
  API.post("/social/follow", { userId });

export const unfollowUser = (userId) =>
  API.post("/social/unfollow", { userId });

// ======================
// BLOCK / MUTE
// ======================

export const blockUser = (userId) =>
  API.post("/social/block", { userId });

export const unblockUser = (userId) =>
  API.post("/social/unblock", { userId });

export const muteUser = (userId) =>
  API.post("/social/mute", { userId });

export const unmuteUser = (userId) =>
  API.post("/social/unmute", { userId });

// ======================
// LISTS
// ======================

export const getFriends = () =>
  API.get("/social/friends");

export const getFriendRequests = () =>
  API.get("/social/friend-requests");

export const getSentRequests = () =>
  API.get("/social/sent-requests");

export const getSuggestions = () =>
  API.get("/social/suggestions");