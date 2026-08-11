// modules/story/store/storySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyAPI from "../services/story.api";



export const fetchStories = createAsyncThunk(
  "story/fetchStories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await storyAPI.getFeedStories();

      console.log("SUCCESS:", data);

      return data;
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createStory = createAsyncThunk(
  "story/createStory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await storyAPI.createStory(formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create story"
      );
    }
  }
);

const initialState = {
  stories: [],
  activeStory: null,
  loading: false,
  error: null,
  viewedStories: [],
  reactions: {},
  replies: {}
};

const storySlice = createSlice({
  name: "story",
  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setStories(state, action) {
      state.stories = action.payload;
    },

    addStory(state, action) {
      state.stories.unshift(action.payload);
    },

    setActiveStory(state, action) {
      state.activeStory = action.payload;
    },

    markStoryViewed(state, action) {
      const id = action.payload;
      if (!state.viewedStories.includes(id)) {
        state.viewedStories.push(id);
      }
    },

    addReaction(state, action) {
      const { storyId, reaction } = action.payload;
      if (!state.reactions[storyId]) {
        state.reactions[storyId] = [];
      }
      state.reactions[storyId].push(reaction);
    },

    addReply(state, action) {
      const { storyId, reply } = action.payload;
      if (!state.replies[storyId]) {
        state.replies[storyId] = [];
      }
      state.replies[storyId].push(reply);
    },

    clearStories(state) {
      state.stories = [];
      state.activeStory = null;
    },

    setError(state, action) {
      state.error = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })

      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createStory.pending, (state) => {
        state.loading = true;
      })

      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload);
      })

      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setLoading,
  setStories,
  addStory,
  setActiveStory,
  markStoryViewed,
  addReaction,
  addReply,
  clearStories,
  setError
} = storySlice.actions;

export default storySlice.reducer;