// modules/social/store/socialActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import socialApi from "../services/social.api";

/*
|--------------------------------------------------------------------------
| FOLLOW
|--------------------------------------------------------------------------
*/

export const followUser = createAsyncThunk(
  "social/follow",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.follow(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to follow user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UNFOLLOW
|--------------------------------------------------------------------------
*/

export const unfollowUser = createAsyncThunk(
  "social/unfollow",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unfollow(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unfollow user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| BLOCK
|--------------------------------------------------------------------------
*/

export const getBlockedUsers = createAsyncThunk(
  "social/blockedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getBlockedUsers();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
        "Unable to load blocked users."
      );
    }
  }
);

export const blockUser = createAsyncThunk(
  "social/block",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.block(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to block user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UNBLOCK
|--------------------------------------------------------------------------
*/

export const unblockUser = createAsyncThunk(
  "social/unblock",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unblock(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unblock user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| MUTE
|--------------------------------------------------------------------------
*/

export const muteUser = createAsyncThunk(
  "social/mute",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.mute(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to mute user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UNMUTE
|--------------------------------------------------------------------------
*/

export const unmuteUser = createAsyncThunk(
  "social/unmute",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unmute(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unmute user."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| FRIEND REQUESTS
|--------------------------------------------------------------------------
*/

export const sendFriendRequest = createAsyncThunk(
  "social/friend/request",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } =
        await socialApi.sendFriendRequest(targetUser);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to send request."
      );
    }
  }
);

export const cancelFriendRequest = createAsyncThunk(
  "social/friend/cancel",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } =
        await socialApi.cancelFriendRequest(targetUser);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to cancel request."
      );
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "social/friend/accept",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } =
        await socialApi.acceptFriendRequest(requestId);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to accept request."
      );
    }
  }
);

export const rejectFriendRequest = createAsyncThunk(
  "social/friend/reject",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } =
        await socialApi.rejectFriendRequest(requestId);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to reject request."
      );
    }
  }
);

export const unfriendUser = createAsyncThunk(
  "social/friend/unfriend",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } =
        await socialApi.unfriend(targetUser);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to remove friend."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| LISTS
|--------------------------------------------------------------------------
*/

export const getFollowers = createAsyncThunk(
  "social/followers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getFollowers();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to load followers."
      );
    }
  }
);

export const getFollowing = createAsyncThunk(
  "social/following",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getFollowing();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to load following."
      );
    }
  }
);

export const getFriends = createAsyncThunk(
  "social/friends",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getFriends();

      return data;
    } catch (err) {
    console.log("ERROR:", err);
    throw err;
}
  }
);

export const getFriendRequests = createAsyncThunk(
  "social/friendRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getFriendRequests();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to load requests."
      );
    }
  }
);

export const getSentRequests = createAsyncThunk(
  "social/sentRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getSentRequests();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to load sent requests."
      );
    }
  }
);

export const getSuggestions = createAsyncThunk(
  "social/suggestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.getSuggestions();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Unable to load suggestions."
      );
    }
  }
);