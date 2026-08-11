// modules/podcast/store/podcastSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
  currentPodcast: null,

  loading: false,
  creating: false,
 updating: false,
  deleting: false,

  subscribed: false,

  error: null
};

const podcastSlice = createSlice({
  name: "podcast",

  initialState,

  reducers: {

    startLoading(state) {
      state.loading = true;
      state.error = null;
    },

    stopLoading(state) {
      state.loading = false;
    },

    setPodcasts(state, action) {
      state.podcasts = action.payload;
      state.loading = false;
    },

    setCurrentPodcast(state, action) {
      state.currentPodcast = action.payload;
      state.loading = false;
    },

    createStart(state) {
      state.creating = true;
      state.error = null;
    },

    createSuccess(state, action) {
      state.creating = false;
      state.podcasts.unshift(action.payload);
    },

    updateStart(state) {
      state.updating = true;
      state.error = null;
    },

    updateSuccess(state, action) {

      state.updating = false;

      state.podcasts = state.podcasts.map((podcast) =>
        podcast.id === action.payload.id
          ? action.payload
          : podcast
      );

      if (
        state.currentPodcast &&
        state.currentPodcast.id === action.payload.id
      ) {
        state.currentPodcast = action.payload;
      }

    },

    deleteStart(state) {
      state.deleting = true;
    },

    deleteSuccess(state, action) {

      state.deleting = false;

      state.podcasts =
        state.podcasts.filter(
          (podcast) =>
            podcast.id !== action.payload
        );

      if (
        state.currentPodcast &&
        state.currentPodcast.id === action.payload
      ) {
        state.currentPodcast = null;
      }

    },

    subscribe(state) {

      state.subscribed = true;

      if (state.currentPodcast) {
        state.currentPodcast.subscribed = true;
      }

    },

    unsubscribe(state) {

      state.subscribed = false;

      if (state.currentPodcast) {
        state.currentPodcast.subscribed = false;
      }

    },

    podcastError(state, action) {
      state.loading = false;
      state.creating = false;
      state.updating = false;
      state.deleting = false;
      state.error = action.payload;
    },

    clearPodcast(state) {
      state.currentPodcast = null;
    },

    clearPodcastError(state) {
      state.error = null;
    }

  }

});

export const {

  startLoading,
  stopLoading,

  setPodcasts,
  setCurrentPodcast,

  createStart,
  createSuccess,

  updateStart,
  updateSuccess,

  deleteStart,
  deleteSuccess,

  subscribe,
  unsubscribe,

  podcastError,

  clearPodcast,
  clearPodcastError

} = podcastSlice.actions;

export default podcastSlice.reducer;