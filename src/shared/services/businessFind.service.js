import api from "../../config/api";

export const applyBusinessFind = (data) => {
  return api.post("/business-find/apply", data);
};

export const getBusinessApplications = () => {
  return api.get("/business-find");
};

export const getBusinessById = (id) => {
  return api.get(`/business-find/${id}`);
};

export const cancelApplication = (id) => {
  return api.post(`/business-find/${id}/cancel`);
};