// modules/notification/store/notificationActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "../services/notification.api";

/**
 * ==========================================
 * GET MY NOTIFICATIONS
 * GET /api/notification
 * ==========================================
 */
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const { data } = await notificationApi.getNotifications();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch notifications."
      );
    }
  }
);

/**
 * ==========================================
 * MARK AS READ
 * PATCH /api/notification/:id/read
 * ==========================================
 */
export const markNotificationRead = createAsyncThunk(
  "notification/markNotificationRead",
  async (notificationId, thunkAPI) => {
    try {
      const { data } =
        await notificationApi.markAsRead(notificationId);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Unable to mark notification as read."
      );
    }
  }
);

/**
 * ==========================================
 * MARK ALL AS READ
 * ==========================================
 */
export const markAllNotificationsRead =
  createAsyncThunk(
    "notification/markAllNotificationsRead",
    async (_, thunkAPI) => {
      try {
        const state = thunkAPI.getState();

        const unread =
          state.notification.notifications.filter(
            (n) => !n.read
          );

        await Promise.all(
          unread.map((item) =>
            notificationApi.markAsRead(item.id)
          )
        );

        return unread.map((n) => n.id);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update notifications."
        );
      }
    }
  );

/**
 * ==========================================
 * REFRESH NOTIFICATIONS
 * ==========================================
 */
export const refreshNotifications =
  createAsyncThunk(
    "notification/refreshNotifications",
    async (_, thunkAPI) => {
      try {
        const { data } =
          await notificationApi.getNotifications();

        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Unable to refresh notifications."
        );
      }
    }
  );

/**
 * ==========================================
 * CLEAR LOCAL CACHE
 * (Frontend Only)
 * ==========================================
 */
export const clearNotifications = () => ({
  type: "notification/clearNotifications",
});

/**
 * ==========================================
 * SOCKET PUSH
 * (Realtime notification)
 * ==========================================
 */
export const receiveNotification = (
  notification
) => ({
  type: "notification/receiveNotification",
  payload: notification,
});