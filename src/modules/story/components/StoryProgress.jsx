import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

/**
 * StoryProgress
 * Production-grade story progress bar (24h stories, multi-segment support)
 * Designed for BLYNK story viewer
 */

const StoryProgress = ({
  stories = [],
  currentIndex = 0,
  duration = 5000,
  isPaused = false,
  onComplete,
}) => {
  const total = stories.length;

  const [progress, setProgress] = useState(0);

  const segments = useMemo(() => {
    return stories.map((_, index) => {
      if (index < currentIndex) return 100;
      if (index > currentIndex) return 0;
      return progress;
    });
  }, [stories, currentIndex, progress]);

  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      if (percent >= 100) {
        clearInterval(interval);

        if (onComplete) {
          onComplete(currentIndex);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentIndex, duration, isPaused, onComplete]);

  if (!total) return null;

  return (
    <div className="w-full flex gap-1 px-2 py-2">
      {segments.map((value, idx) => (
        <div
          key={idx}
          className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
        >
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${value}%` }}
          />
        </div>
      ))}
    </div>
  );
};

StoryProgress.propTypes = {
  stories: PropTypes.array,
  currentIndex: PropTypes.number,
  duration: PropTypes.number,
  isPaused: PropTypes.bool,
  onComplete: PropTypes.func,
};

export default React.memo(StoryProgress);