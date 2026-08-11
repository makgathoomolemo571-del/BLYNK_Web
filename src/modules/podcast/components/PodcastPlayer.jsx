import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
} from "react-icons/fa";

const formatTime = (seconds = 0) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function PodcastPlayer({
  podcast,
  episode,
  autoPlay = false,
  onPlay,
  onPause,
  onEnded,
}) {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const loaded = () => {
      setLoading(false);
      setDuration(audio.duration || 0);

      if (autoPlay) {
        audio.play();
      }
    };

    const update = () => {
      setCurrentTime(audio.currentTime);
    };

    const play = () => {
      setPlaying(true);

      if (onPlay)
        onPlay(episode);
    };

    const pause = () => {
      setPlaying(false);

      if (onPause)
        onPause(episode);
    };

    const ended = () => {
      setPlaying(false);

      if (onEnded)
        onEnded(episode);
    };

    audio.addEventListener(
      "loadedmetadata",
      loaded
    );

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "play",
      play
    );

    audio.addEventListener(
      "pause",
      pause
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        loaded
      );

      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "play",
        play
      );

      audio.removeEventListener(
        "pause",
        pause
      );

      audio.removeEventListener(
        "ended",
        ended
      );
    };
  }, [episode, autoPlay, onPlay, onPause, onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const seek = (e) => {
    const audio = audioRef.current;

    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;

    audio.muted = !audio.muted;

    setMuted(audio.muted);
  };

  const restart = () => {
    const audio = audioRef.current;

    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow">

      <audio
        ref={audioRef}
        src={episode.audioUrl}
        preload="metadata"
      />

      <div className="flex gap-4 p-5">

        <img
          src={
            podcast.coverImage ||
            "/images/default-podcast.png"
          }
          alt={podcast.name}
          className="w-28 h-28 rounded-lg object-cover"
        />

        <div className="flex-1">

          <h2 className="text-xl font-bold">
            {podcast.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {episode.title}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {podcast.category}
          </p>

          <div className="mt-5">

            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={seek}
              className="w-full"
            />

            <div className="flex justify-between text-xs mt-1">

              <span>
                {formatTime(currentTime)}
              </span>

              <span>
                {formatTime(duration)}
              </span>

            </div>

          </div>

          <div className="flex items-center gap-3 mt-5">

            <button
              onClick={togglePlay}
              disabled={loading}
              className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center"
            >
              {playing
                ? <FaPause />
                : <FaPlay />}
            </button>

            <button
              onClick={restart}
              className="w-10 h-10 rounded-full border"
            >
              <FaRedo />
            </button>

            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full border"
            >
              {muted
                ? <FaVolumeMute />
                : <FaVolumeUp />}
            </button>

          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">

            <div className="rounded-lg border p-3">

              <div className="text-xs text-gray-500">
                Episodes
              </div>

              <div className="font-bold">
                {podcast.totalEpisodes}
              </div>

            </div>

            <div className="rounded-lg border p-3">

              <div className="text-xs text-gray-500">
                Views
              </div>

              <div className="font-bold">
                {podcast.totalViews.toLocaleString()}
              </div>

            </div>

            <div className="rounded-lg border p-3">

              <div className="text-xs text-gray-500">
                Listeners
              </div>

              <div className="font-bold">
                {podcast.totalListeners.toLocaleString()}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

PodcastPlayer.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    coverImage: PropTypes.string,
    totalEpisodes: PropTypes.number,
    totalViews: PropTypes.number,
    totalListeners: PropTypes.number,
  }).isRequired,

  episode: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    audioUrl: PropTypes.string.isRequired,
  }).isRequired,

  autoPlay: PropTypes.bool,

  onPlay: PropTypes.func,

  onPause: PropTypes.func,

  onEnded: PropTypes.func,
};