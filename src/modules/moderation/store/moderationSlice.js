// modules/moderation/store/moderationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moderationApi from "../services/moderation.api";

export const fetchReports = createAsyncThunk(
  "moderation/fetchReports",
  async (_, thunkAPI) => {
    try {
      return await moderationApi.getReports();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchReport = createAsyncThunk(
  "moderation/fetchReport",
  async (id, thunkAPI) => {
    try {
      return await moderationApi.getReport(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const submitReport = createAsyncThunk(
  "moderation/submitReport",
  async (payload, thunkAPI) => {
    try {
      return await moderationApi.submitReport(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const approveReport = createAsyncThunk(
  "moderation/approveReport",
  async (id, thunkAPI) => {
    try {
      return await moderationApi.approve(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const rejectReport = createAsyncThunk(
  "moderation/rejectReport",
  async (id, thunkAPI) => {
    try {
      return await moderationApi.reject(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const reviewReport = createAsyncThunk(
  "moderation/reviewReport",
  async ({ id, data }, thunkAPI) => {
    try {
      return await moderationApi.review(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchStats = createAsyncThunk(
  "moderation/fetchStats",
  async (_, thunkAPI) => {
    try {
      return await moderationApi.stats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const moderationSlice = createSlice({
  name: "moderation",

  initialState: {
    reports: [],
    report: null,
    stats: null,
    loading: false,
    success: false,
    error: null
  },

  reducers: {
    clearModerationState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },

  extraReducers: (builder) => {

    builder

      .addMatcher(
        (action) =>
          action.type.startsWith("moderation/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("moderation/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("moderation/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
          state.success = true;
        }
      )

      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      })

      .addCase(fetchReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })

      .addCase(submitReport.fulfilled, (state, action) => {
        state.reports.unshift(action.payload);
      })

      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      .addCase(reviewReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })

      .addCase(approveReport.fulfilled, (state, action) => {
        state.report = action.payload;
      })

      .addCase(rejectReport.fulfilled, (state, action) => {
        state.report = action.payload;
      });

  }

});

export const {
  clearModerationState
} = moderationSlice.actions;

export default moderationSlice.reducer;