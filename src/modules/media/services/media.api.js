import api from "../../../config/api";

const mediaApi = {
  upload(formData) {
    return api
      .post("/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  getById(id) {
    return api
      .get(`/media/${id}`)
      .then((res) => res.data);
  },

  remove(id) {
    return api
      .delete(`/media/${id}`)
      .then((res) => res.data);
  },
};

export default mediaApi;