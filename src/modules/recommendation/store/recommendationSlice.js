import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recommendationApi from "../services/recommendation.api";

export const fetchRecommendations = createAsyncThunk(
  "recommendation/fetchRecommendations",
  async (limit = 20, thunkAPI) => {
    try {
      return await recommendationApi.getRecommendations(limit);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const trackRecommendationView = createAsyncThunk(
  "recommendation/trackView",
  async (id, thunkAPI) => {
    try {
      await recommendationApi.trackView(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const trackRecommendationClick = createAsyncThunk(
  "recommendation/trackClick",
  async (id, thunkAPI) => {
    try {
      await recommendationApi.trackClick(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchRecommendationStats = createAsyncThunk(
  "recommendation/stats",
  async (_, thunkAPI) => {
    try {
      return await recommendationApi.getStats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const initialState = {
  recommendations: [],
  stats: {
    generated: 0,
    views: 0,
    clicks: 0,
  },
  loading: false,
  error: null,
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,

  reducers: {
     recommendationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    recommendationsSuccess: (state, action) => {
      state.loading = false;
      state.recommendations = action.payload;
    },

  recommendationsFail(state, action) {
    state.loading = false;
    state.error = action.payload;
  },
    clearRecommendations(state) {
      state.recommendations = [];
    },

    clearRecommendationError(state) {
      state.error = null;
    },
   

  
 
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })

      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecommendationStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      .addCase(trackRecommendationView.fulfilled, (state, action) => {
        const item = state.recommendations.find(
          (r) => r.id === action.payload
        );

        if (item) {
          item.viewed = true;
        }
      })

      .addCase(trackRecommendationClick.fulfilled, (state, action) => {
        const item = state.recommendations.find(
          (r) => r.id === action.payload
        );

        if (item) {
          item.clicked = true;
        }
      });
  },
});

export const {
  recommendationsStart,
  recommendationsSuccess,
  recommendationsFail,
  clearRecommendations,
  clearRecommendationError,
 
} = recommendationSlice.actions;

export default recommendationSlice.reducer;