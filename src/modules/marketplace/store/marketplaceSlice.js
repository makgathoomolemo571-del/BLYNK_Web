// modules/marketplace/store/marketplaceSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  myListings: [],
  selectedListing: null,
  applications: [],

  loading: false,
  creating: false,
  updating: false,
  deleting: false,

  error: null
};

const marketplaceSlice = createSlice({
  name: "marketplace",

  initialState,

  reducers: {

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setCreating(state, action) {
      state.creating = action.payload;
    },

    setUpdating(state, action) {
      state.updating = action.payload;
    },

    setDeleting(state, action) {
      state.deleting = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    setListings(state, action) {
      state.listings = action.payload;
    },

    setMyListings(state, action) {
      state.myListings = action.payload;
    },

    setSelectedListing(state, action) {
      state.selectedListing = action.payload;
    },

    addListing(state, action) {
      state.listings.unshift(action.payload);
      state.myListings.unshift(action.payload);
    },

    updateListing(state, action) {

      const listing = action.payload;

      state.listings =
        state.listings.map(item =>
          item.id === listing.id
            ? listing
            : item
        );

      state.myListings =
        state.myListings.map(item =>
          item.id === listing.id
            ? listing
            : item
        );

      if (
        state.selectedListing &&
        state.selectedListing.id === listing.id
      ) {
        state.selectedListing = listing;
      }

    },

    removeListing(state, action) {

      const id = action.payload;

      state.listings =
        state.listings.filter(
          item => item.id !== id
        );

      state.myListings =
        state.myListings.filter(
          item => item.id !== id
        );

      if (
        state.selectedListing &&
        state.selectedListing.id === id
      ) {
        state.selectedListing = null;
      }

    },

    setApplications(state, action) {
      state.applications = action.payload;
    }

  }

});

export const {

  setLoading,
  setCreating,
  setUpdating,
  setDeleting,

  setError,
  clearError,

  setListings,
  setMyListings,

  setSelectedListing,

  addListing,
  updateListing,
  removeListing,

  setApplications

} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;