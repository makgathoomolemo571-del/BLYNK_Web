// modules/search/store/searchSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchApi from "../services/search.api";

const initialState = {
  query: "",
  type: "all",

  loading: false,
  error: null,

  users: [],
  creators: [],
  businesses: [],

  posts: [],
  reels: [],
  podcasts: [],

  marketplace: [],
  creatorHires: [],
  businessFinds: [],

  stats: {
    totalSearches: 0,
    uniqueUsers: 0,
    topQueries: []
  }
};

/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

export const search = createAsyncThunk(
  "search/search",

  async ({ query, type = "all" }, thunkAPI) => {
    try {

      const response =
        await searchApi.search(query, type);

      return {
        query,
        type,
        ...response.data
      };

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response?.data?.message ||
        error.message ||
        "Search failed"

      );

    }
  }
);

/*
|--------------------------------------------------------------------------
| SEARCH STATS
|--------------------------------------------------------------------------
*/

export const loadSearchStats = createAsyncThunk(
  "search/stats",

  async (_, thunkAPI) => {

    try {

      const response =
        await searchApi.stats();

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(

        error.response?.data?.message ||
        error.message ||
        "Unable to load search statistics"

      );

    }

  }
);

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const searchSlice = createSlice({

  name: "search",

  initialState,

  reducers: {

    clearSearch(state) {

      state.query = "";

      state.users = [];
      state.creators = [];
      state.businesses = [];

      state.posts = [];
      state.reels = [];
      state.podcasts = [];

      state.marketplace = [];
      state.creatorHires = [];
      state.businessFinds = [];

      state.error = null;
    },

    setQuery(state, action) {

      state.query = action.payload;

    },

    setType(state, action) {

      state.type = action.payload;

    }

  },

  extraReducers: (builder) => {

    builder

      /*
      -----------------------------------
      SEARCH
      -----------------------------------
      */

      .addCase(search.pending, (state) => {

        state.loading = true;
        state.error = null;

      })

      .addCase(search.fulfilled, (state, action) => {

        state.loading = false;

        state.query = action.payload.query;
        state.type = action.payload.type;

        state.users =
          action.payload.users || [];

        state.creators =
          action.payload.creators || [];

        state.businesses =
          action.payload.businesses || [];

        state.posts =
          action.payload.posts || [];

        state.reels =
          action.payload.reels || [];

        state.podcasts =
          action.payload.podcasts || [];

        state.marketplace =
          action.payload.marketplace || [];

        state.creatorHires =
          action.payload.creatorHires || [];

        state.businessFinds =
          action.payload.businessFinds || [];

      })

      .addCase(search.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      /*
      -----------------------------------
      SEARCH STATS
      -----------------------------------
      */

      .addCase(loadSearchStats.fulfilled, (state, action) => {

        state.stats = action.payload;

      });

  }

});

export const {

  clearSearch,
  setQuery,
  setType

} = searchSlice.actions;

export default searchSlice.reducer;