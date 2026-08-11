import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

/*
|--------------------------------------------------------------------------
| THUNKS
|--------------------------------------------------------------------------
*/

export const createBusinessCampaign = createAsyncThunk(
  "businessFind/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/businessfind", payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchMyCampaigns = createAsyncThunk(
  "businessFind/myCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/businessfind/my");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchCampaign = createAsyncThunk(
  "businessFind/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/businessfind/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const applyCampaign = createAsyncThunk(
  "businessFind/apply",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `/businessfind/${id}/apply`,
        payload
      );

      return {
        id,
        response: data,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateCampaignStatus = createAsyncThunk(
  "businessFind/status",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `/businessfind/${id}/status`,
        { status }
      );

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  "businessFind/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/businessfind/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchBusinessStats = createAsyncThunk(
  "businessFind/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/business-find");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const initialState = {
  campaigns: [],
  currentCampaign: null,
  stats: null,

  loading: false,
  success: false,
  error: null,
};

const businessFindSlice = createSlice({
  name: "businessFind",

  initialState,

  reducers: {
    clearBusinessFindError(state) {
      state.error = null;
    },

    clearCurrentCampaign(state) {
      state.currentCampaign = null;
    },

    resetBusinessFind(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) =>
          action.type.startsWith("businessFind/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("businessFind/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      .addCase(createBusinessCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.campaigns.unshift(action.payload);
      })

      .addCase(fetchMyCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })

      .addCase(fetchCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })

      .addCase(updateCampaignStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.currentCampaign = action.payload;

        state.campaigns = state.campaigns.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        );
      })

      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading = false;

        state.campaigns = state.campaigns.filter(
          (item) => item.id !== action.payload
        );

        if (
          state.currentCampaign &&
          state.currentCampaign.id === action.payload
        ) {
          state.currentCampaign = null;
        }
      })

      .addCase(fetchBusinessStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(applyCampaign.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export const {
  clearBusinessFindError,
  clearCurrentCampaign,
  resetBusinessFind,
} = businessFindSlice.actions;

export default businessFindSlice.reducer;