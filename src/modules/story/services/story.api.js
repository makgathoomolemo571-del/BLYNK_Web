import api from "../../../config/api";

const BASE_URL = "/story";

const storyAPI = {

  // CREATE
  createStory: async (data) => {
    const response = await api.post(
      `${BASE_URL}/create`,
      data
    );

    return response.data;
  },


  // FEED
  getFeedStories: async () => {
    const response = await api.get(
      `${BASE_URL}/feed`
    );

    return response.data;
  },


  // VIEW
  viewStory: async (storyId) => {
    const response = await api.post(
      `${BASE_URL}/${storyId}/view`
    );

    return response.data;
  },


  // DELETE
  deleteStory: async (storyId) => {
    const response = await api.delete(
      `${BASE_URL}/${storyId}`
    );

    return response.data;
  },


  reactStory: async (storyId) => {
    const { data } = await api.post(
        `${BASE_URL}/${storyId}/react`
    );
    return data;
},

replyStory: async (storyId, text) => {
    const { data } = await api.post(
        `${BASE_URL}/${storyId}/reply`,
        { text }
    );
    return data;
},


  // EXPIRE
  expireStories: async () => {
    const response = await api.post(
      `${BASE_URL}/expire/run`
    );

    return response.data;
  }

};


export default storyAPI;