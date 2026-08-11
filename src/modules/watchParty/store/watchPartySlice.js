import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchParties: [],
  liveWatchParties: [],
  currentWatchParty: null,

  loading: false,
  error: null,

  joined: false,

  pagination: {
    page: 1,
    total: 0,
    hasMore: true,
  },
};

const watchPartySlice = createSlice({
  name: "watchParty",

  initialState,

  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },

    stopLoading(state) {
      state.loading = false;
    },

    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    setWatchParties(state, action) {
      state.watchParties = action.payload;
      state.loading = false;
    },

    setLiveWatchParties(state, action) {
      state.liveWatchParties = action.payload;
      state.loading = false;
    },

    setCurrentWatchParty(state, action) {
      state.currentWatchParty = action.payload;
      state.loading = false;
    },

    createWatchParty(state, action) {
      state.watchParties.unshift(action.payload);
    },

    updateWatchParty(state, action) {
      const updated = action.payload;

      state.watchParties = state.watchParties.map((party) =>
        party.id === updated.id ? updated : party
      );

      if (
        state.currentWatchParty &&
        state.currentWatchParty.id === updated.id
      ) {
        state.currentWatchParty = updated;
      }

      state.liveWatchParties = state.liveWatchParties.map((party) =>
        party.id === updated.id ? updated : party
      );
    },

    removeWatchParty(state, action) {
      const id = action.payload;

      state.watchParties = state.watchParties.filter(
        (party) => party.id !== id
      );

      state.liveWatchParties = state.liveWatchParties.filter(
        (party) => party.id !== id
      );

      if (
        state.currentWatchParty &&
        state.currentWatchParty.id === id
      ) {
        state.currentWatchParty = null;
      }
    },

    joinWatchParty(state) {
      state.joined = true;

      if (state.currentWatchParty) {
        state.currentWatchParty.viewerCount += 1;
      }
    },

    leaveWatchParty(state) {
      state.joined = false;

      if (
        state.currentWatchParty &&
        state.currentWatchParty.viewerCount > 0
      ) {
        state.currentWatchParty.viewerCount -= 1;
      }
    },

    clearCurrentWatchParty(state) {
      state.currentWatchParty = null;
      state.joined = false;
    },

    clearWatchPartyError(state) {
      state.error = null;
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setError,
  setWatchParties,
  setLiveWatchParties,
  setCurrentWatchParty,
  createWatchParty,
  updateWatchParty,
  removeWatchParty,
  joinWatchParty,
  leaveWatchParty,
  clearCurrentWatchParty,
  clearWatchPartyError,
} = watchPartySlice.actions;

export default watchPartySlice.reducer;