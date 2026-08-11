// modules/notification/store/notificationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "../services/notification.api";

/*
|--------------------------------------------------------------------------
| THUNKS
|--------------------------------------------------------------------------
*/

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const res = await notificationApi.getMine();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to load notifications."
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notification/markNotificationRead",
  async (notificationId, thunkAPI) => {
    try {
      const res = await notificationApi.markRead(notificationId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to update notification."
      );
    }
  }
);

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  notifications: [],
  unreadCount: 0,

  loading: false,
  updating: false,

  success: false,
  error: null
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const calculateUnread = (items) =>
  items.filter((item) => !item.read).length;

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    clearNotificationError(state) {
      state.error = null;
    },

    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },

    addRealtimeNotification(state, action) {
      state.notifications.unshift(action.payload);

      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },

    markAllAsReadLocal(state) {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true
      }));

      state.unreadCount = 0;
    }
  },

  extraReducers: (builder) => {

    builder

      /*
      ----------------------------------------
      FETCH
      ----------------------------------------
      */

      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {

        state.loading = false;

        state.notifications = action.payload;

        state.unreadCount =
          calculateUnread(action.payload);

      })

      .addCase(fetchNotifications.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      })

      /*
      ----------------------------------------
      MARK READ
      ----------------------------------------
      */

      .addCase(markNotificationRead.pending, (state) => {
        state.updating = true;
      })

      .addCase(markNotificationRead.fulfilled, (state, action) => {

        state.updating = false;

        const updated = action.payload;

        state.notifications =
          state.notifications.map((notification) =>
            notification.id === updated.id
              ? updated
              : notification
          );

        state.unreadCount =
          calculateUnread(state.notifications);

      })

      .addCase(markNotificationRead.rejected, (state, action) => {

        state.updating = false;

        state.error = action.payload;

      });

  }
});

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

export const {

  clearNotificationError,

  clearNotifications,

  addRealtimeNotification,

  markAllAsReadLocal

} = notificationSlice.actions;

export default notificationSlice.reducer;