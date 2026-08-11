import { useEffect, useRef, useState, useCallback } from "react";
import reelService from "../services/reel.api";

/**
 * useReelPlayer
 * - Handles video playback state
 * - Auto play / pause
 * - Progress tracking
 * - Engagement tracking
 */
export default function useReelPlayer(reelId) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = !muted;
      setMuted(!muted);
    }
  }, [muted]);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const percent =
      (video.currentTime / video.duration) * 100;

    setProgress(percent || 0);
  }, []);

  const trackView = useCallback(async () => {
    try {
      setLoading(true);
      await reelService.viewReel(reelId);
    } catch (err) {
      // silent fail in production
    } finally {
      setLoading(false);
    }
  }, [reelId]);

  useEffect(() => {
    if (reelId) {
      trackView();
    }
  }, [reelId, trackView]);

  return {
    videoRef,
    isPlaying,
    progress,
    muted,
    loading,
    play,
    pause,
    togglePlay,
    toggleMute,
    onTimeUpdate,
  };
}