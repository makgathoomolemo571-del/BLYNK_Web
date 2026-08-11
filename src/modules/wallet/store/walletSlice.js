// modules/wallet/store/walletSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import walletApi from "../services/wallet.api";

export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await walletApi.getWallet();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createWallet = createAsyncThunk(
  "wallet/createWallet",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await walletApi.createWallet();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const depositFunds = createAsyncThunk(
  "wallet/deposit",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } =
        await walletApi.deposit(amount);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const withdrawFunds = createAsyncThunk(
  "wallet/withdraw",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } =
        await walletApi.withdraw(amount);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchTransactions =
createAsyncThunk(
  "wallet/transactions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await walletApi.transactions();

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const initialState = {

  wallet: null,

  transactions: [],

  loading: false,

  error: null

};

const walletSlice = createSlice({

  name: "wallet",

  initialState,

  reducers: {

    clearWallet(state) {

      state.wallet = null;
      state.transactions = [];
      state.error = null;

    }

  },

  extraReducers: (builder) => {

    builder

      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })

      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createWallet.fulfilled, (state, action) => {
        state.wallet = action.payload;
      })

      .addCase(depositFunds.fulfilled, (state, action) => {
        state.wallet = action.payload.wallet;

        state.transactions.unshift(
          action.payload.transaction
        );
      })

      .addCase(withdrawFunds.fulfilled, (state, action) => {
        state.wallet = action.payload.wallet;

        state.transactions.unshift(
          action.payload.transaction
        );
      })

      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      });

  }

});

export const {

  clearWallet

} = walletSlice.actions;

export default walletSlice.reducer;