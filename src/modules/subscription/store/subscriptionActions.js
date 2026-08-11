import { createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionService from "../services/subscription.service";

// ======================
// GET MY SUBSCRIPTION
// ======================
export const fetchMySubscription = createAsyncThunk(
  "subscription/fetchMine",
  async (_, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.getMine();
      return res;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch subscription"
      );
    }
  }
);

// ======================
// CREATE SUBSCRIPTION
// ======================
export const createSubscription = createAsyncThunk(
  "subscription/create",
  async (plan, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.create(plan);
      return res;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to create subscription"
      );
    }
  }
);

// ======================
// UPGRADE SUBSCRIPTION
// ======================
export const upgradeSubscription = createAsyncThunk(
  "subscription/upgrade",
  async (plan, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.upgrade(plan);
      return res;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to upgrade subscription"
      );
    }
  }
);

// ======================
// CANCEL SUBSCRIPTION
// ======================
export const cancelSubscription = createAsyncThunk(
  "subscription/cancel",
  async (_, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.cancel();
      return res;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to cancel subscription"
      );
    }
  }
);

// ======================
// GET PLANS (STATIC RULES)
// ======================
export const fetchPlans = createAsyncThunk(
  "subscription/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await subscriptionService.getPlans();
      return res;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to load plans"
      );
    }
  }
);