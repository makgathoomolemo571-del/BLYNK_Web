// modules/user/services/user.api.js

import api from "../../../config/api";

const BASE_URL = "/users";

/**
 * ==========================================================
 * USER API
 * ==========================================================
 */

/**
 * Get currently authenticated user
 */
export const getCurrentUser = async () => {
  const { data } = await api.get(`${BASE_URL}/me`);
  return data;
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  const { data } = await api.get(`${BASE_URL}/${userId}`);
  return data;
};

/**
 * Get user by username
 */
export const getUserByUsername = async (username) => {
  const { data } = await api.get(
    `${BASE_URL}/username/${encodeURIComponent(username)}`
  );

  return data;
};

/**
 * Update authenticated user
 */
export const updateCurrentUser = async (payload) => {
  const { data } = await api.patch(
    `${BASE_URL}/me`,
    payload
  );

  return data;
};

/**
 * Soft delete authenticated account
 */
export const deleteCurrentUser = async () => {
  const { data } = await api.delete(
    `${BASE_URL}/me`
  );

  return data;
};

/**
 * Search users
 */
export const searchUsers = async (query) => {
  const { data } = await api.get(
    `${BASE_URL}/search`,
    {
      params: {
        q: query,
      },
    }
  );

  return data;
};

/**
 * Get online users
 */
export const getOnlineUsers = async () => {
  const { data } = await api.get(
    `${BASE_URL}/online`
  );

  return data;
};

/**
 * Get recently joined users
 */
export const getRecentUsers = async () => {
  const { data } = await api.get(
    `${BASE_URL}/recent`
  );

  return data;
};

/**
 * Check username availability
 */
export const checkUsername = async (username) => {
  const { data } = await api.get(
    `${BASE_URL}/check-username`,
    {
      params: {
        username,
      },
    }
  );

  return data;
};

/**
 * Check email availability
 */
export const checkEmail = async (email) => {
  const { data } = await api.get(
    `${BASE_URL}/check-email`,
    {
      params: {
        email,
      },
    }
  );

  return data;
};

export default {
  getCurrentUser,
  getUserById,
  getUserByUsername,
  updateCurrentUser,
  deleteCurrentUser,
  searchUsers,
  getOnlineUsers,
  getRecentUsers,
  checkUsername,
  checkEmail,
};