// modules/social/store/socialSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socialApi from "../services/social.api";

/*
====================================================
FOLLOW
====================================================
*/

export const followUser = createAsyncThunk(
  "social/follow",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.follow(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to follow user"
      );
    }
  }
);

/*
====================================================
UNFOLLOW
====================================================
*/

export const unfollowUser = createAsyncThunk(
  "social/unfollow",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unfollow(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unfollow user"
      );
    }
  }
);

/*
====================================================
BLOCK
====================================================
*/

export const blockUser = createAsyncThunk(
  "social/block",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.block(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to block user"
      );
    }
  }
);

/*
====================================================
UNBLOCK
====================================================
*/

export const unblockUser = createAsyncThunk(
  "social/unblock",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unblock(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unblock user"
      );
    }
  }
);

/*
====================================================
MUTE
====================================================
*/

export const muteUser = createAsyncThunk(
  "social/mute",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.mute(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to mute user"
      );
    }
  }
);

/*
====================================================
UNMUTE
====================================================
*/

export const unmuteUser = createAsyncThunk(
  "social/unmute",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unmute(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unmute user"
      );
    }
  }
);

/*
====================================================
FOLLOWERS
====================================================
*/

export const loadFollowers = createAsyncThunk(
  "social/followers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.followers();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load followers"
      );
    }
  }
);

/*
====================================================
FOLLOWING
====================================================
*/

export const loadFollowing = createAsyncThunk(
  "social/following",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.following();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load following"
      );
    }
  }
);

/*
====================================================
SUGGESTIONS
====================================================
*/

export const loadSuggestions = createAsyncThunk(
  "social/suggestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.suggestions();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load suggestions"
      );
    }
  }
);

/*
====================================================
FRIENDS
====================================================
*/

export const loadFriends = createAsyncThunk(
  "social/friends",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.friends();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load friends"
      );
    }
  }
);

/*
====================================================
REQUESTS
====================================================
*/

export const loadFriendRequests = createAsyncThunk(
  "social/friendRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.friendRequests();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load requests"
      );
    }
  }
);

export const loadSentRequests = createAsyncThunk(
  "social/sentRequests",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.sentRequests();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load sent requests"
      );
    }
  }
);

/*
====================================================
SEND REQUEST
====================================================
*/

export const sendFriendRequest = createAsyncThunk(
  "social/sendRequest",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.sendFriendRequest(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to send request"
      );
    }
  }
);

/*
====================================================
ACCEPT REQUEST
====================================================
*/

export const acceptFriendRequest = createAsyncThunk(
  "social/acceptRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.acceptFriendRequest(requestId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to accept request"
      );
    }
  }
);

/*
====================================================
REJECT REQUEST
====================================================
*/

export const rejectFriendRequest = createAsyncThunk(
  "social/rejectRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.rejectFriendRequest(requestId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to reject request"
      );
    }
  }
);

/*
====================================================
CANCEL REQUEST
====================================================
*/

export const cancelFriendRequest = createAsyncThunk(
  "social/cancelRequest",
  async (requestId, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.cancelFriendRequest(requestId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to cancel request"
      );
    }
  }
);

/*
====================================================
UNFRIEND
====================================================
*/

export const unfriend = createAsyncThunk(
  "social/unfriend",
  async (targetUser, { rejectWithValue }) => {
    try {
      const { data } = await socialApi.unfriend(targetUser);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to unfriend"
      );
    }
  }
);

/*
====================================================
STATE
====================================================
*/

const initialState = {
  followers: [],
  following: [],
  friends: [],
  suggestions: [],
  friendRequests: [],
  sentRequests: [],
  loading: false,
  error: null,
  success: null,
  blockedUsers: [],
};

const socialSlice = createSlice({
  name: "social",
  initialState,

  reducers: {
    clearSocialError(state) {
      state.error = null;
    },

    clearSocialSuccess(state) {
      state.success = null;
    }
  },

  extraReducers: (builder) => {

    builder

      .addMatcher(
        (action) =>
          action.type.startsWith("social/") &&
          action.type.endsWith("/pending"),

        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("social/") &&
          action.type.endsWith("/fulfilled"),

        (state, action) => {

          state.loading = false;
          state.success = action.payload?.message || null;

          switch (action.type) {

            case loadFollowers.fulfilled.type:
              state.followers = action.payload;
              break;

            case loadFollowing.fulfilled.type:
              state.following = action.payload;
              break;

            case loadFriends.fulfilled.type:
              state.friends = action.payload;
              break;

            case loadSuggestions.fulfilled.type:
              state.suggestions = action.payload;
              break;

            case loadFriendRequests.fulfilled.type:
              state.friendRequests = action.payload;
              break;

            case loadSentRequests.fulfilled.type:
              state.sentRequests = action.payload;
              break;

            default:
              break;

          }

        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("social/") &&
          action.type.endsWith("/rejected"),

        (state, action) => {

          state.loading = false;
          state.error = action.payload;

        }
      );

  }

});

export const {

  clearSocialError,
  clearSocialSuccess

} = socialSlice.actions;

export default socialSlice.reducer;