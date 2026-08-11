import axios from "axios";


const API = axios.create({
 baseURL:
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api",
  withCredentials: true,
});

// attach token
API.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

// handle response errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
console.log("API URL:", API.defaults.baseURL);
const profileAPI = {
  getProfile: (userId) =>
    API.get(`/profile/${userId}`),

  getMyProfile: () => {
  console.log("Calling:", API.defaults.baseURL + "/profile/me");
  console.log("Token:", localStorage.getItem("accessToken"));

  return API.get("/profile/me")
    .then(res => {
      console.log("SUCCESS", res.data);
      return res;
    })
    .catch(err => {
      console.log("AXIOS ERROR", err);
      console.log("STATUS", err.response?.status);
      console.log("DATA", err.response?.data);
      throw err;
    });
},


  updateProfile: (data) =>
    API.put("/profile/me", data),

  uploadProfilePicture: (formData) =>
    API.post(`/profile/upload/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  uploadCoverBanner: (formData) =>
    API.post(`/profile/upload/banner`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  followUser: (userId) =>
    API.post(`/social/follow`, { userId }),

  unfollowUser: (userId) =>
    API.post(`/social/unfollow`, { userId }),

  blockUser: (userId) =>
    API.post(`/social/block`, { userId }),

  unblockUser: (userId) =>
    API.post(`/social/unblock`, { userId }),

  muteUser: (userId) =>
    API.post(`/social/mute`, { userId }),

  unmuteUser: (userId) =>
    API.post(`/social/unmute`, { userId }),

  getFollowers: (userId) =>
    API.get(`/social/followers/${userId}`),

  getFollowing: (userId) =>
    API.get(`/social/following/${userId}`),

  getProfileStats: (userId) =>
    API.get(`/analytics/user/${userId}`),
};

export default profileAPI;