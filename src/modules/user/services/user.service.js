// modules/user/services/user.service.js

import userApi from "./user.api";

class UserService {
  /**
   * ==========================
   * USER PROFILE
   * ==========================
   */

  async getMe() {
    const { data } = await userApi.get("/me");
    return data;
  }

  async getById(userId) {
    const { data } = await userApi.get(`/${userId}`);
    return data;
  }

  async updateProfile(payload) {
    const { data } = await userApi.patch("/profile", payload);
    return data;
  }

  /**
   * ==========================
   * USER SEARCH
   * ==========================
   */

  async search(keyword) {
    const { data } = await userApi.get("/search", {
      params: {
        q: keyword,
      },
    });

    return data;
  }

  /**
   * ==========================
   * SAVED POSTS
   * ==========================
   */

  async getSavedPosts(page = 1, limit = 20) {
    const { data } = await userApi.get("/saved-posts", {
      params: {
        page,
        limit,
      },
    });

    return data;
  }

  /**
   * ==========================
   * ACCOUNT
   * ==========================
   */

  async deactivate() {
    const { data } = await userApi.patch("/deactivate");
    return data;
  }

  async deleteAccount() {
    const { data } = await userApi.delete("/");
    return data;
  }

  /**
   * ==========================
   * PROFILE PHOTO
   * ==========================
   */

  async uploadAvatar(formData) {
    const { data } = await userApi.post(
      "/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }

  async uploadBanner(formData) {
    const { data } = await userApi.post(
      "/banner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  }

  /**
   * ==========================
   * SECURITY
   * ==========================
   */

  async changePassword(payload) {
    const { data } = await userApi.patch(
      "/change-password",
      payload
    );

    return data;
  }

  /**
   * ==========================
   * SETTINGS
   * ==========================
   */

  async updateSettings(payload) {
    const { data } = await userApi.patch(
      "/settings",
      payload
    );

    return data;
  }
}

export default new UserService();