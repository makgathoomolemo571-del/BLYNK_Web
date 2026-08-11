// modules/user/store/userActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user.service";

/**
 * GET CURRENT USER
 */
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getCurrentUser();
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

/**
 * GET USER BY ID
 */
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(userId);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

/**
 * UPDATE USER PROFILE
 */
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userService.updateUserProfile(payload);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

/**
 * DELETE USER (soft delete)
 */
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser();
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

/**
 * CLEAR USER STATE
 */
export const clearUserState = () => (dispatch) => {
  dispatch({ type: "user/clearState" });
};