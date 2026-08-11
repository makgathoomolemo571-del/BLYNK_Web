import { authAPI } from "./auth.api";

import {
  setTokens,
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from "../utils/auth.helper";

export const authService = {
  async login(data) {
    const res = await authAPI.login(data);

    const { accessToken, refreshToken, user } = res.data;

    setTokens({
      accessToken,
      refreshToken,
    });

    return user;
  },

  async register(data) {
    const res = await authAPI.register(data);
    return res.data;
  },

  async logout() {
    try {
      await authAPI.logout();
    } finally {
      clearTokens();
    }
  },

  async refreshToken() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    const res = await authAPI.refresh(accessToken);

    setTokens({
      accessToken: res.data.accessToken,
      refreshToken,
    });

    return res.data.accessToken;
  },

  async forgotPassword(email) {
    return authAPI.forgotPassword(email);
  },

  async resetPassword(data) {
    return authAPI.resetPassword(data);
  },

  async verifyEmail(token) {
    return authAPI.verifyEmail(token);
  },

  async getMe() {
    const res = await authAPI.getMe();
    return res.data;
  },
};