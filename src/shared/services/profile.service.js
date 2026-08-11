import api from "./apiClient";

export const profileService = {

  getProfile: () =>
    api.get("/profile/me"),

  getProfileById: (id) =>
    api.get(`/profile/${id}`),

  updateProfile: (data) =>
    api.patch("/profile/update", data),

  uploadProfilePicture: (file) => {

    const formData = new FormData();
    formData.append("file", file);

    return api.post(
      "/profile/upload-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

  },

  uploadBanner: (file) => {

    const formData = new FormData();
    formData.append("file", file);

    return api.post(
      "/profile/upload-banner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

  }

};