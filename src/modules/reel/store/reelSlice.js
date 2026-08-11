import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reelApi from "../services/reel.api";

// ==============================
// Async Actions
// ==============================

export const fetchReels = createAsyncThunk(
  "reel/fetchReels",
  async (params, { rejectWithValue }) => {
    try {
      return await reelApi.getReels(params);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reels"
      );
    }
  }
);


export const fetchReelById = createAsyncThunk(
  "reel/fetchReelById",
  async (id, { rejectWithValue }) => {
    try {
      return await reelApi.getReelById(id);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch reel"
      );
    }
  }
);

export const likeReel = createAsyncThunk(
  "reel/likeReel",
  async (id, { rejectWithValue }) => {
    try {
      await reelApi.likeReel(id);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like reel"
      );
    }
  }
);

export const unlikeReel = createAsyncThunk(
    "reel/unlike",
    async (id, { rejectWithValue }) => {
        try {
            await reelApi.unlikeReel(id);
            return id;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to unlike reel"
            );
        }
    }
);

export const shareReel = createAsyncThunk(
    "reel/share",
    async (id, { rejectWithValue }) => {
        try {
            await reelApi.shareReel(id);
            return id;
        } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
}
    }
);

// ==============================
// Initial State
// ==============================

const initialState = {
  reels: [],
  currentReel: null,
  loading: false,
  error: null,
  activeReelIndex: 0,
};

// ==============================
// Slice
// ==============================

const reelSlice = createSlice({
  name: "reel",
  initialState,

  reducers: {
    setCurrentReel(state, action) {
      state.currentReel = action.payload;
    },

    setActiveReelIndex(state, action) {
      state.activeReelIndex = action.payload;
    },

    addReel(state, action) {
      state.reels.unshift(action.payload);
    },

    updateReel(state, action) {
      const updated = action.payload;

      state.reels = state.reels.map((reel) =>
        (reel._id || reel.id) === (updated._id || updated.id)
          ? updated
          : reel
      );
    },

    deleteReel(state, action) {
      state.reels = state.reels.filter(
        (reel) => (reel._id || reel.id) !== action.payload
      );
    },
  },

  

  extraReducers: (builder) => {
    builder

      .addCase(fetchReels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReels.fulfilled, (state, action) => {
        state.loading = false;

        // backend returns [] or { reels: [] }
        state.reels = action.payload.reels || action.payload;
      })

      .addCase(fetchReels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

.addCase(likeReel.fulfilled, (state, action) => {
    const reel = state.reels.find(r => r.id === action.payload);

    if (reel) {
        reel.stats.likes++;
        reel.isLiked = true;
    }
})

.addCase(unlikeReel.fulfilled, (state, action) => {
    const reel = state.reels.find(r => r.id === action.payload);

    if (reel) {
        reel.stats.likes--;
        reel.isLiked = false;
    }
})

      .addCase(fetchReelById.pending, (state) => {
  state.loading = true;
})

.addCase(fetchReelById.fulfilled, (state, action) => {
  state.loading = false;
  state.currentReel = action.payload;
})

.addCase(fetchReelById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

.addCase(shareReel.fulfilled, (state, action) => {

    const reel = state.reels.find(
        r => (r.id || r._id) === action.payload
    );

    if (reel) {
        reel.stats.shares++;
    }

})
      
  },
});



export const {
  addReel,
  setCurrentReel,
  setActiveReelIndex,
  updateReel,
  deleteReel,
} = reelSlice.actions;

export default reelSlice.reducer;