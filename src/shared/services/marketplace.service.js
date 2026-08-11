import api from "../../config/api";

export const createListing = (data) => {
  return api.post("/marketplace", data);
};

export const getListings = () => {
  return api.get("/marketplace");
};

export const getListingById = (id) => {
  return api.get(`/marketplace/${id}`);
};

export const applyToListing = (id, data) => {
  return api.post(`/marketplace/${id}/apply`, data);
};

export const deleteListing = (id) => {
  return api.delete(`/marketplace/${id}`);
};