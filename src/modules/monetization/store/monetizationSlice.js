import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import monetizationApi from "../services/monetization.api";

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

export const fetchDashboard = createAsyncThunk(
    "monetization/dashboard",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await monetizationApi.getDashboard();
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Unable to load dashboard."
            );
        }
    }
);
/*
|--------------------------------------------------------------------------
| WALLET
|--------------------------------------------------------------------------
*/

export const fetchWallet = createAsyncThunk(
    "monetization/wallet",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await monetizationApi.getWallet();
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Unable to load wallet."
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| EARNINGS
|--------------------------------------------------------------------------
*/

export const fetchRevenue = createAsyncThunk(
    "monetization/revenue",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await monetizationApi.getRevenue();
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Unable to load revenue."
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| ANALYTICS
|--------------------------------------------------------------------------
*/

export const fetchAnalytics = createAsyncThunk(
    "monetization/analytics",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await monetizationApi.getAnalytics();
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Unable to load analytics."
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| PAYOUTS
|--------------------------------------------------------------------------
*/

export const fetchPayouts = createAsyncThunk(
  "monetization/payouts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await monetizationApi.getPayouts();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to load payouts."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| ELIGIBILITY
|--------------------------------------------------------------------------
*/

export const fetchEligibility = createAsyncThunk(
    "monetization/eligibility",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await monetizationApi.getEligibility();
            return data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message ||
                "Unable to load eligibility."
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| WITHDRAW
|--------------------------------------------------------------------------
*/

export const withdrawFunds = createAsyncThunk(
  "monetization/withdraw",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await monetizationApi.withdraw(payload);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Withdrawal failed."
      );
    }
  }
);

const initialState = {
  dashboard: null,
  wallet: null,
  revenue: null,
  analytics: null,
  eligibility: null,

  loading: false,
  success: false,
  error: null
};

const monetizationSlice = createSlice({
  name: "monetization",

  initialState,

  reducers: {
    clearMonetizationError(state) {
      state.error = null;
    },

    clearSuccess(state) {
      state.success = false;
    },

    resetMonetization(state) {
      Object.assign(state, initialState);
    }
  },

  extraReducers: (builder) => {
    builder

      /*
      -----------------------------
      Dashboard
      -----------------------------
      */

      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })

      /*
      -----------------------------
      Wallet
      -----------------------------
      */

      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })

      /*
      -----------------------------
      Earnings
      -----------------------------
      */

     .addCase(fetchRevenue.fulfilled, (state, action) => {
    state.loading = false;
    state.revenue = action.payload;
})

      /*
      -----------------------------
      Analytics
      -----------------------------
      */

      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })

      /*
      -----------------------------
      Eligibility
      -----------------------------
      */

      .addCase(fetchEligibility.fulfilled, (state, action) => {
        state.loading = false;
        state.eligibility = action.payload;
      })

      /*
      -----------------------------
      Rejected
      -----------------------------
      */

      .addMatcher(
        (action) =>
          action.type.startsWith("monetization/") &&
          action.type.endsWith("/rejected"),

        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

  /*
      -----------------------------
      Pending
      -----------------------------
      */

      .addMatcher(
        (action) =>
          action.type.startsWith("monetization/") &&
          action.type.endsWith("/pending"),

        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      );

  }
});

export const {
  clearMonetizationError,
  clearSuccess,
  resetMonetization
} = monetizationSlice.actions;

export default monetizationSlice.reducer;