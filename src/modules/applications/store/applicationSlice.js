import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../config/api";

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

const BASE = "/applications";

/*
|--------------------------------------------------------------------------
| THUNKS
|--------------------------------------------------------------------------
*/

export const createApplication = createAsyncThunk(
  "applications/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post(BASE, payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create application."
      );
    }
  }
);

export const fetchMyApplications = createAsyncThunk(
  "applications/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/my`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load applications."
      );
    }
  }
);

export const fetchApplication = createAsyncThunk(
  "applications/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE}/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Application not found."
      );
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "applications/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `${BASE}/${id}/status`,
        { status }
      );
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to update status."
      );
    }
  }
);

export const withdrawApplication = createAsyncThunk(
  "applications/withdraw",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(
        `${BASE}/${id}/withdraw`
      );

      return {
        id,
        ...data
      };

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to withdraw."
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

  applications: [],

  application: null,

  loading: false,

  creating: false,

  updating: false,

  error: null

};

const applicationSlice = createSlice({

  name: "applications",

  initialState,

  reducers: {

    clearApplication(state) {

      state.application = null;

    },

    clearApplicationError(state) {

      state.error = null;

    }

  },

  extraReducers: builder => {

    builder

      /*
      |--------------------------------------------------------------------------
      | CREATE
      |--------------------------------------------------------------------------
      */

      .addCase(createApplication.pending, state => {

        state.creating = true;

        state.error = null;

      })

      .addCase(createApplication.fulfilled, (state, action) => {

        state.creating = false;

        state.applications.unshift(action.payload);

      })

      .addCase(createApplication.rejected, (state, action) => {

        state.creating = false;

        state.error = action.payload;

      })

      /*
      |--------------------------------------------------------------------------
      | FETCH MINE
      |--------------------------------------------------------------------------
      */

      .addCase(fetchMyApplications.pending, state => {

        state.loading = true;

      })

      .addCase(fetchMyApplications.fulfilled, (state, action) => {

        state.loading = false;

        state.applications = action.payload;

      })

      .addCase(fetchMyApplications.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      /*
      |--------------------------------------------------------------------------
      | FETCH ONE
      |--------------------------------------------------------------------------
      */

      .addCase(fetchApplication.pending, state => {

        state.loading = true;

      })

      .addCase(fetchApplication.fulfilled, (state, action) => {

        state.loading = false;

        state.application = action.payload;

      })

      .addCase(fetchApplication.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      /*
      |--------------------------------------------------------------------------
      | UPDATE STATUS
      |--------------------------------------------------------------------------
      */

      .addCase(updateApplicationStatus.pending, state => {

        state.updating = true;

      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {

        state.updating = false;

        state.application = action.payload;

        state.applications = state.applications.map(item =>
          item.id === action.payload.id
            ? action.payload
            : item
        );

      })

      .addCase(updateApplicationStatus.rejected, (state, action) => {

        state.updating = false;

        state.error = action.payload;

      })

      /*
      |--------------------------------------------------------------------------
      | WITHDRAW
      |--------------------------------------------------------------------------
      */

      .addCase(withdrawApplication.pending, state => {

        state.updating = true;

      })

      .addCase(withdrawApplication.fulfilled, (state, action) => {

        state.updating = false;

        state.applications = state.applications.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                status: "withdrawn"
              }
            : item
        );

        if (
          state.application &&
          state.application.id === action.payload.id
        ) {

          state.application.status = "withdrawn";

        }

      })

      .addCase(withdrawApplication.rejected, (state, action) => {

        state.updating = false;

        state.error = action.payload;

      });

  }

});

export const {

  clearApplication,

  clearApplicationError

} = applicationSlice.actions;

export default applicationSlice.reducer;