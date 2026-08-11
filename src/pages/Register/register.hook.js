import { useState } from "react";
import { registerUser } from "./register.service";

export const useRegister = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (formData) => {

    try {
      setLoading(true);
      setError(null);

      const result = await registerUser(formData);

      return result;

    } catch (err) {

      setError(err?.response?.data?.message || "Registration failed");

      throw err;

    } finally {
      setLoading(false);
    }

  };

  return { register, loading, error };

};