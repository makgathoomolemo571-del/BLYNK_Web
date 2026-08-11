// modules/analytics/store/analyticsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import analyticsApi from "../services/analytics.api";

export const getUserAnalytics = createAsyncThunk(
  "analytics/user",
  async (_, thunkAPI) => {
    try {
      return await analyticsApi.getUserAnalytics();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

export const getCreatorAnalytics = createAsyncThunk(
  "analytics/creator",
  async (_, thunkAPI) => {
    try {
      return await analyticsApi.getCreatorAnalytics();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

export const getPlatformAnalytics = createAsyncThunk(
  "analytics/platform",
  async (_, thunkAPI) => {
    try {
      return await analyticsApi.getPlatformAnalytics();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

export const getAnalyticsStats = createAsyncThunk(
  "analytics/stats",
  async (_, thunkAPI) => {
    try {
      return await analyticsApi.getStats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

const initialState = {
  user: null,
  creator: null,
  platform: null,
  stats: null,

  loading: false,
  error: null
};

const analyticsSlice = createSlice({

  name: "analytics",

  initialState,

  reducers: {

    clearAnalytics(state) {
      state.user = null;
      state.creator = null;
      state.platform = null;
      state.stats = null;
      state.error = null;
    }

  },

  extraReducers: (builder) => {

    builder

      .addMatcher(

        (action) =>
          action.type.startsWith("analytics/") &&
          action.type.endsWith("/pending"),

        (state) => {

          state.loading = true;
          state.error = null;

        }

      )

      .addMatcher(

        (action) =>
          action.type.startsWith("analytics/") &&
          action.type.endsWith("/rejected"),

        (state, action) => {

          state.loading = false;
          state.error = action.payload;

        }

      )

      .addCase(
        getUserAnalytics.fulfilled,
        (state, action) => {

          state.loading = false;
          state.user = action.payload;

        }
      )

      .addCase(
        getCreatorAnalytics.fulfilled,
        (state, action) => {

          state.loading = false;
          state.creator = action.payload;

        }
      )

      .addCase(
        getPlatformAnalytics.fulfilled,
        (state, action) => {

          state.loading = false;
          state.platform = action.payload;

        }
      )

      .addCase(
        getAnalyticsStats.fulfilled,
        (state, action) => {

          state.loading = false;
          state.stats = action.payload;

        }
      );

  }

});

export const {
  clearAnalytics
} = analyticsSlice.actions;

export default analyticsSlice.reducer;