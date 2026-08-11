// modules/support/store/supportSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supportAPI from "../services/support.api";

/* ============================
   THUNKS
============================ */

export const createTicket = createAsyncThunk(
  "support/createTicket",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await supportAPI.createTicket(payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchMyTickets = createAsyncThunk(
  "support/fetchMyTickets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await supportAPI.getMyTickets();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllTickets = createAsyncThunk(
  "support/getAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await supportAPI.getAllTickets();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getTicket = createAsyncThunk(
  "support/getTicket",
  async (id, { rejectWithValue }) => {
    try {
      const response = await supportAPI.getMyTickets();

console.log("GET MY TICKETS RESPONSE:", response);

return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const assignTicket = createAsyncThunk(
  "support/assignTicket",
  async ({ ticketId, agentId }, { rejectWithValue }) => {
    try {
      const { data } =
        await supportAPI.assignTicket(ticketId, agentId);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateStatus = createAsyncThunk(
  "support/updateStatus",
  async ({ ticketId, status }, { rejectWithValue }) => {
    try {
      const { data } =
        await supportAPI.updateStatus(ticketId, status);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const resolveTicket = createAsyncThunk(
  "support/resolveTicket",
  async ({ ticketId, notes }, { rejectWithValue }) => {
    try {
      const { data } =
        await supportAPI.resolveTicket(ticketId, notes);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const closeTicket = createAsyncThunk(
  "support/closeTicket",
  async (ticketId, { rejectWithValue }) => {
    try {
      const { data } =
        await supportAPI.closeTicket(ticketId);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getSupportStats = createAsyncThunk(
  "support/getSupportStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await supportAPI.getSupportStats();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/* ============================
   STATE
============================ */

const initialState = {
  tickets: [],
  currentTicket: null,
  stats: null,

  loading: false,

  error: null,

  success: false
};

/* ============================
   SLICE
============================ */

const supportSlice = createSlice({

  name: "support",

  initialState,

  reducers: {

    clearSupportError(state) {
      state.error = null;
    },

    clearSupportSuccess(state) {
      state.success = false;
    },

    clearCurrentTicket(state) {
      state.currentTicket = null;
    }

  },

  extraReducers: (builder) => {

    builder

      .addCase(fetchMyTickets.fulfilled, (state, action) => {

        state.tickets = action.payload;

      })

      .addCase(getAllTickets.fulfilled, (state, action) => {

        state.tickets = action.payload;

      })

      .addCase(getTicket.fulfilled, (state, action) => {

        state.currentTicket = action.payload;

      })

      .addCase(createTicket.fulfilled, (state, action) => {

        state.tickets.unshift(action.payload);

      })

      .addCase(assignTicket.fulfilled, (state, action) => {

        state.currentTicket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket.id === action.payload.id
            ? action.payload
            : ticket
        );

      })

      .addCase(updateStatus.fulfilled, (state, action) => {

        state.currentTicket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket.id === action.payload.id
            ? action.payload
            : ticket
        );

      })

      .addCase(resolveTicket.fulfilled, (state, action) => {

        state.currentTicket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket.id === action.payload.id
            ? action.payload
            : ticket
        );

      })

      .addCase(closeTicket.fulfilled, (state, action) => {

        state.currentTicket = action.payload;

        state.tickets = state.tickets.map((ticket) =>
          ticket.id === action.payload.id
            ? action.payload
            : ticket
        );

      })

      .addCase(getSupportStats.fulfilled, (state, action) => {

        state.stats = action.payload;

      })

      .addMatcher(

        (action) =>
          action.type.startsWith("support/") &&
          action.type.endsWith("/pending"),

        (state) => {

          state.loading = true;
          state.error = null;
          state.success = false;

        }

      )

      .addMatcher(

        (action) =>
          action.type.startsWith("support/") &&
          action.type.endsWith("/rejected"),

        (state, action) => {

          state.loading = false;
          state.error = action.payload;

        }

      )

      .addMatcher(

        (action) =>
          action.type.startsWith("support/") &&
          action.type.endsWith("/fulfilled"),

        (state) => {

          state.loading = false;
          state.success = true;

        }

      )

  }

});

export const {

  clearSupportError,

  clearSupportSuccess,

  clearCurrentTicket

} = supportSlice.actions;

export default supportSlice.reducer;