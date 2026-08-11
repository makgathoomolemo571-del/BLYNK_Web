import api from "../../config/api";

export const applyCreatorHire = (data) => {
  return api.post("/creator-hire/apply", data);
};

export const getApplications = () => {
  return api.get("/creator-hire");
};

export const getApplicationById = (id) => {
  return api.get(`/creator-hire/${id}`);
};

export const withdrawApplication = (id) => {
  return api.post(`/creator-hire/${id}/withdraw`);
};