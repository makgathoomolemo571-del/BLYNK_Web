import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../services/profile.api";

export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileService.getMyProfile();
      return res.data;
    } catch (err) {
      console.log("PROFILE ERROR:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId) => {
    const res = await profileService.getProfile(userId);
    return res.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (payload) => {
    const res = await profileService.updateProfile(payload);
    return res.data;
  }
);

