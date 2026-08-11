import api from "../../config/api";

export const requestReset = async (email) => {

  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;

};