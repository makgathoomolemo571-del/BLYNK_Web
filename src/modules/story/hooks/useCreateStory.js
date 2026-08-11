import { useState } from "react";
import { useDispatch } from "react-redux";
import { createStory } from "../store/storySlice";

export const useCreateStory = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitStory = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const result = await dispatch(createStory(payload)).unwrap();

      setLoading(false);
      return result;

    } catch (err) {
      setLoading(false);
      setError(err?.message || "Failed to create story");
      throw err;
    }
  };

  return {
    submitStory,
    loading,
    error
  };
};