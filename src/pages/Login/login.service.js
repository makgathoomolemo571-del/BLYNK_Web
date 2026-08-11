import api from "../../config/api";

export const loginUser = async (data) => {

const response =
await api.post("/auth/login", data);

return response.data;

};

export const refreshToken = async () => {

const response =
await api.post("/auth/refresh");

return response.data;

};

export const logoutUser = async () => {

const response =
await api.post("/auth/logout");

return response.data;

};