import api from "../../config/api";

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};