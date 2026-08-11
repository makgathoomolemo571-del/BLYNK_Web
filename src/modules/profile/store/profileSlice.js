import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProfile,
  fetchMyProfile,
  updateProfile,
} from "./profileActions";

const initialState = {
  profile: null,
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load profile";
      })

      .addCase(fetchMyProfile.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(fetchMyProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.profile = action.payload;
})

.addCase(fetchMyProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to load profile";
})

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to update profile";
      });
  }
});

export const { clearProfileState } = profileSlice.actions;
export default profileSlice.reducer;