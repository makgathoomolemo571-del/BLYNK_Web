import { useCallback, useEffect, useState } from "react";
import postService from "../services/post.api";

/**
 * usePosts
 * Production hook for feed, pagination, create, and interactions
 */
const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const currentPage = reset ? 1 : page;

      const response = await postService.getFeed({
        page: currentPage,
      });

      const newPosts = response?.data || [];

      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
      }

      setHasMore(newPosts.length > 0);
      setPage(currentPage + 1);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [page]);

  const refreshPosts = useCallback(() => {
    setPage(1);
    return fetchPosts(true);
  }, [fetchPosts]);

  const createPost = useCallback(async (payload) => {
    try {
      setLoading(true);

      const response = await postService.createPost(payload);

      const newPost = response?.data;

      setPosts((prev) => [newPost, ...prev]);

      return newPost;
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create post");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const likePost = useCallback(async (postId) => {
    try {
      const response = await postService.likePost(postId);

      const updated = response?.data;

      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? updated : p))
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to like post");
    }
  }, []);

  const deletePost = useCallback(async (postId) => {
    try {
      await postService.deletePost(postId);

      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete post");
    }
  }, []);

  useEffect(() => {
    fetchPosts(true);
  }, []);

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
    refreshPosts,
    createPost,
    likePost,
    deletePost,
  };
};

export default usePosts;