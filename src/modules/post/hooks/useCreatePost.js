import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/postSlice";
import postService from "../services/post.api";

const useCreatePost = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitPost = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await postService.createPost(payload);

      dispatch(createPost.fulfilled(response));

      return response;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create post";

      setError(message);

      dispatch(createPost.rejected(message));

      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    submitPost,
    loading,
    error,
  };
};

export default useCreatePost;