// modules/creatorHire/store/creatorHireSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/api";

const initialState = {
  jobs: [],
  myJobs: [],
  selectedJob: null,
  stats: null,

  loading: false,
  creating: false,
  applying: false,
  updating: false,
  deleting: false,

  success: false,
  error: null
};

/* ==========================
   CREATE JOB
========================== */

export const createCreatorHire =
createAsyncThunk(
  "creatorHire/create",
  async (payload, thunkAPI) => {
    try {

      const { data } =
      await api.post(
        "/creator-hire",
        payload
      );

      return data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }
  }
);

/* ==========================
   MY JOBS
========================== */

export const getMyCreatorJobs =
createAsyncThunk(
  "creatorHire/myJobs",
  async (_, thunkAPI) => {

    try {

      const { data } =
      await api.get(
        "/creator-hire/my"
      );

      return data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }

  }
);

/* ==========================
   APPLY
========================== */

export const applyCreatorHire =
createAsyncThunk(
  "creatorHire/apply",
  async (
    { jobId, payload },
    thunkAPI
  ) => {

    try {

      const { data } =
      await api.post(
        `/creator-hire/${jobId}/apply`,
        payload
      );

      return data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }

  }
);


export const fetchJobs = createAsyncThunk(
    "creatorHire/fetchJobs",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/creator-hire");
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message
            );
        }
    }
);


/* ==========================
   UPDATE STATUS
========================== */

export const updateCreatorHireStatus =
createAsyncThunk(
  "creatorHire/updateStatus",
  async (
    { jobId, status },
    thunkAPI
  ) => {

    try {

      const { data } =
      await api.patch(
        `/creator-hire/${jobId}/status`,
        { status }
      );

      return data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }

  }
);

/* ==========================
   DELETE
========================== */

export const deleteCreatorHire =
createAsyncThunk(
  "creatorHire/delete",
  async (
    jobId,
    thunkAPI
  ) => {

    try {

      await api.delete(
        `/creator-hire/${jobId}`
      );

      return jobId;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }

  }
);

/* ==========================
   STATS
========================== */

export const creatorHireStats =
createAsyncThunk(
  "creatorHire/stats",
  async (_, thunkAPI) => {

    try {

      const { data } =
      await api.get(
        "/creator-hire/stats"
      );

      return data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
        err.message
      );

    }

  }
);

/* ==========================
   SLICE
========================== */

const creatorHireSlice =
createSlice({

  name: "creatorHire",

  initialState,

  reducers: {

    clearCreatorHireError(state) {
      state.error = null;
    },

    clearCreatorHireSuccess(state) {
      state.success = false;
    },

    setSelectedCreatorHire(
      state,
      action
    ) {
      state.selectedJob =
      action.payload;
    }

  },

  extraReducers: (builder) => {

    builder

    /* CREATE */

    .addCase(
      createCreatorHire.pending,
      (state) => {

        state.creating = true;
        state.error = null;

      }
    )

    .addCase(
      createCreatorHire.fulfilled,
      (state, action) => {

        state.creating = false;

        state.success = true;

        state.myJobs.unshift(
          action.payload
        );

      }
    )

    .addCase(
      createCreatorHire.rejected,
      (state, action) => {

        state.creating = false;

        state.error =
        action.payload;

      }
    )

    .addCase(fetchJobs.fulfilled, (state, action) => {
    state.loading = false;
    state.jobs = action.payload;
})

    /* MY JOBS */

    .addCase(
      getMyCreatorJobs.pending,
      (state) => {

        state.loading = true;

      }
    )

    .addCase(
      getMyCreatorJobs.fulfilled,
      (state, action) => {

        state.loading = false;

        state.myJobs =
        action.payload;

      }
    )

    .addCase(
      getMyCreatorJobs.rejected,
      (state, action) => {

        state.loading = false;

        state.error =
        action.payload;

      }
    )

    /* APPLY */

    .addCase(
      applyCreatorHire.pending,
      (state) => {

        state.applying = true;

      }
    )

    .addCase(
      applyCreatorHire.fulfilled,
      (state) => {

        state.applying = false;

        state.success = true;

      }
    )

    .addCase(
      applyCreatorHire.rejected,
      (state, action) => {

        state.applying = false;

        state.error =
        action.payload;

      }
    )

    /* STATUS */

    .addCase(
      updateCreatorHireStatus.fulfilled,
      (state, action) => {

        state.myJobs =
        state.myJobs.map(job =>
          job.id === action.payload.id
            ? action.payload
            : job
        );

      }
    )

    /* DELETE */

    .addCase(
      deleteCreatorHire.fulfilled,
      (state, action) => {

        state.myJobs =
        state.myJobs.filter(
          job => job.id !== action.payload
        );

      }
    )

    /* STATS */

    .addCase(
      creatorHireStats.fulfilled,
      (state, action) => {

        state.stats =
        action.payload;

      }
    );

  }

});

export const {

  clearCreatorHireError,

  clearCreatorHireSuccess,

  setSelectedCreatorHire

} = creatorHireSlice.actions;

export default creatorHireSlice.reducer;