import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  user: null,

  token: null,

  refreshToken: null,

  isAuthenticated: false,

  loading: false,

  error: null

};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    setCredentials: (state, action) => {

      const { user, token, refreshToken } = action.payload;

      state.user = user;

      state.token = token;

      state.refreshToken = refreshToken;

      state.isAuthenticated = true;

      state.error = null;

    },

    setUser: (state, action) => {

      state.user = action.payload;

    },

    setToken: (state, action) => {

      state.token = action.payload;

    },

    logout: (state) => {

      state.user = null;

      state.token = null;

      state.refreshToken = null;

      state.isAuthenticated = false;

      state.error = null;

    },

    setLoading: (state, action) => {

      state.loading = action.payload;

    },

    setError: (state, action) => {

      state.error = action.payload;

    }

  }

});

export const {

  setCredentials,

  setUser,

  setToken,

  logout,

  setLoading,

  setError

} = authSlice.actions;

export default authSlice.reducer;