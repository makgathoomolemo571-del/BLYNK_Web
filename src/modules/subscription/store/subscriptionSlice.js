import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import subscriptionService from "../services/subscription.service";

const initialState = {
  subscription: null,
  pricing: null,

  loading: false,
  upgrading: false,
  cancelling: false,

  success: false,
  error: null
};

/*
|--------------------------------------------------------------------------
| GET MY SUBSCRIPTION
|--------------------------------------------------------------------------
*/

export const getSubscription = createAsyncThunk(
  "subscription/getSubscription",
  async (_, thunkAPI) => {
    try {
      return await subscriptionService.getMine();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CREATE SUBSCRIPTION
|--------------------------------------------------------------------------
*/

export const createSubscription = createAsyncThunk(
  "subscription/createSubscription",
  async (plan, thunkAPI) => {
    try {
      return await subscriptionService.create(plan);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| UPGRADE
|--------------------------------------------------------------------------
*/

export const upgradeSubscription = createAsyncThunk(
  "subscription/upgradeSubscription",
  async (plan, thunkAPI) => {
    try {
      return await subscriptionService.upgrade(plan);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| CANCEL
|--------------------------------------------------------------------------
*/

export const cancelSubscription = createAsyncThunk(
  "subscription/cancelSubscription",
  async (_, thunkAPI) => {
    try {
      return await subscriptionService.cancel();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| PLAN PRICING
|--------------------------------------------------------------------------
*/

export const getPlanPricing = createAsyncThunk(
  "subscription/getPlanPricing",
  async (plan, thunkAPI) => {
    try {
      return await subscriptionService.getPlanPricing(plan);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",

  initialState,

  reducers: {

    clearSubscriptionError(state) {
      state.error = null;
    },

    clearSubscriptionSuccess(state) {
      state.success = false;
    },

    resetSubscriptionState(state) {

      state.loading = false;
      state.upgrading = false;
      state.cancelling = false;

      state.error = null;
      state.success = false;
    }

  },

  extraReducers: (builder) => {

    /*
    -------------------------------------------------------
    GET
    -------------------------------------------------------
    */

    builder.addCase(getSubscription.pending, (state) => {

      state.loading = true;
      state.error = null;

    });

    builder.addCase(getSubscription.fulfilled, (state, action) => {

      state.loading = false;
      state.subscription = action.payload;

    });

    builder.addCase(getSubscription.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;

    });

    /*
    -------------------------------------------------------
    CREATE
    -------------------------------------------------------
    */

    builder.addCase(createSubscription.pending, (state) => {

      state.loading = true;
      state.error = null;

    });

    builder.addCase(createSubscription.fulfilled, (state, action) => {

      state.loading = false;
      state.success = true;

      state.subscription = action.payload;

    });

    builder.addCase(createSubscription.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;

    });

    /*
    -------------------------------------------------------
    UPGRADE
    -------------------------------------------------------
    */

    builder.addCase(upgradeSubscription.pending, (state) => {

      state.upgrading = true;
      state.error = null;

    });

    builder.addCase(upgradeSubscription.fulfilled, (state, action) => {

      state.upgrading = false;
      state.success = true;

      state.subscription = action.payload;

    });

    builder.addCase(upgradeSubscription.rejected, (state, action) => {

      state.upgrading = false;
      state.error = action.payload;

    });

    /*
    -------------------------------------------------------
    CANCEL
    -------------------------------------------------------
    */

    builder.addCase(cancelSubscription.pending, (state) => {

      state.cancelling = true;
      state.error = null;

    });

    builder.addCase(cancelSubscription.fulfilled, (state, action) => {

      state.cancelling = false;
      state.success = true;

      state.subscription = action.payload;

    });

    builder.addCase(cancelSubscription.rejected, (state, action) => {

      state.cancelling = false;
      state.error = action.payload;

    });

    /*
    -------------------------------------------------------
    PLAN PRICING
    -------------------------------------------------------
    */

    builder.addCase(getPlanPricing.pending, (state) => {

      state.loading = true;

    });

    builder.addCase(getPlanPricing.fulfilled, (state, action) => {

      state.loading = false;
      state.pricing = action.payload;

    });

    builder.addCase(getPlanPricing.rejected, (state, action) => {

      state.loading = false;
      state.error = action.payload;

    });

  }

});

export const {

  clearSubscriptionError,
  clearSubscriptionSuccess,
  resetSubscriptionState

} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;