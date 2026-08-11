import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  profile: null,
  stats: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setProfile(state, action) {
      state.profile = action.payload;
    },

    setUserStats(state, action) {
      state.stats = action.payload;
    },

    updateUser(state, action) {
      state.user = {
        ...state.user,
        ...action.payload
      };
    },

    clearUser(state) {
      state.user = null;
      state.profile = null;
      state.stats = null;
      state.isAuthenticated = false;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  setUser,
  setProfile,
  setUserStats,
  updateUser,
  clearUser,
  setLoading,
  setError
} = userSlice.actions;

export default userSlice.reducer;