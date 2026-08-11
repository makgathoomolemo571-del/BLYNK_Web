import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchInfinitePosts } from "../store/postSlice";

/**
 * useInfinitePosts
 * Production infinite scroll hook for BLYNK social feed
 */
const useInfinitePosts = (initialPage = 1, limit = 10) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef(null);

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const result = await dispatch(
        fetchInfinitePosts({ page, limit })
      ).unwrap();

      if (!result || result.length < limit) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Infinite posts error:", err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, page, limit, loading, hasMore]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadPosts]
  );

  useEffect(() => {
    loadPosts();
  }, []);

  return {
    loading,
    hasMore,
    lastPostRef,
  };
};

export default useInfinitePosts;