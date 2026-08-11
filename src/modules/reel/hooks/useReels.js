import { useEffect, useState, useCallback } from "react";
import reelService from "../services/reel.api";

/**
 * useReels
 * - Fetch feed reels
 * - Pagination support
 * - Like, share, view tracking
 */
export default function useReels(initialPage = 1) {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchReels = useCallback(async (pageNumber = 1, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const res = await reelService.getReels(pageNumber);

      const newReels = res?.data || [];

      setReels((prev) =>
        append ? [...prev, ...newReels] : newReels
      );

      setHasMore(newReels.length > 0);
      setPage(pageNumber);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load reels");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchReels(page + 1, true);
    }
  }, [page, loading, hasMore, fetchReels]);

  const refresh = useCallback(() => {
    fetchReels(1, false);
  }, [fetchReels]);

  const likeReel = useCallback(async (reelId) => {
    try {
      await reelService.likeReel(reelId);

      setReels((prev) =>
        prev.map((r) =>
          r.id === reelId
            ? { ...r, likes: (r.likes || 0) + 1, isLiked: true }
            : r
        )
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to like reel");
    }
  }, []);

  const viewReel = useCallback(async (reelId) => {
    try {
      await reelService.viewReel(reelId);
    } catch (err) {
      // silent fail for views (production behavior)
    }
  }, []);

  useEffect(() => {
    fetchReels(1, false);
  }, [fetchReels]);

  return {
    reels,
    loading,
    error,
    page,
    hasMore,
    fetchReels,
    loadMore,
    refresh,
    likeReel,
    viewReel,
  };
}