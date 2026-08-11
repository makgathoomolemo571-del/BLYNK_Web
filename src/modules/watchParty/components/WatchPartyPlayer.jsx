import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Loader2,
  Users,
  Radio
} from "lucide-react";

const WatchPartyPlayer = ({
  watchParty,
  streamUrl,
  autoPlay = false,
  controls = true,
  onPlay,
  onPause,
  onEnded
}) => {

  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const video = videoRef.current;

    if (!video) return;

    const handleLoaded = () => setLoading(false);

    const handlePlay = () => {

      setPlaying(true);

      onPlay && onPlay(watchParty);

    };

    const handlePause = () => {

      setPlaying(false);

      onPause && onPause(watchParty);

    };

    const handleEnded = () => {

      setPlaying(false);

      onEnded && onEnded(watchParty);

    };

    video.addEventListener(
      "loadeddata",
      handleLoaded
    );

    video.addEventListener(
      "play",
      handlePlay
    );

    video.addEventListener(
      "pause",
      handlePause
    );

    video.addEventListener(
      "ended",
      handleEnded
    );

    return () => {

      video.removeEventListener(
        "loadeddata",
        handleLoaded
      );

      video.removeEventListener(
        "play",
        handlePlay
      );

      video.removeEventListener(
        "pause",
        handlePause
      );

      video.removeEventListener(
        "ended",
        handleEnded
      );

    };

  }, [watchParty, onPlay, onPause, onEnded]);

  const togglePlay = () => {

    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {

      video.play();

    } else {

      video.pause();

    }

  };

  const toggleMute = () => {

    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;

    setMuted(video.muted);

  };

  const fullscreen = () => {

    const video = videoRef.current;

    if (!video) return;

    if (video.requestFullscreen)
      video.requestFullscreen();

  };

  return (

    <div className="w-full rounded-xl overflow-hidden bg-black shadow-lg">

      <div className="relative">

        {loading && (

          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">

            <Loader2
              className="animate-spin text-white"
              size={40}
            />

          </div>

        )}

        <video

          ref={videoRef}

          src={streamUrl}

          poster={watchParty.thumbnail}

          autoPlay={autoPlay}

          controls={false}

          playsInline

          className="w-full bg-black"

        />

        {controls && (

          <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/70 p-3">

            <div className="flex gap-3 items-center">

              <button
                onClick={togglePlay}
                className="text-white"
              >

                {playing
                  ? <Pause size={22}/>
                  : <Play size={22}/>}

              </button>

              <button
                onClick={toggleMute}
                className="text-white"
              >

                {muted
                  ? <VolumeX size={22}/>
                  : <Volume2 size={22}/>}

              </button>

            </div>

            <button
              onClick={fullscreen}
              className="text-white"
            >

              <Maximize2 size={22}/>

            </button>

          </div>

        )}

      </div>

      <div className="bg-white dark:bg-zinc-900 p-4">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="font-bold text-lg">

              {watchParty.title}

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              {watchParty.description}

            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              watchParty.status === "live"
                ? "bg-red-600 text-white"
                : watchParty.status === "scheduled"
                ? "bg-yellow-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >

            {watchParty.status === "live" && (
              <Radio
                size={12}
                className="inline mr-1"
              />
            )}

            {watchParty.status.toUpperCase()}

          </span>

        </div>

        <div className="flex gap-6 mt-4 text-sm text-gray-500">

          <span className="flex items-center gap-2">

            <Users size={16}/>

            {watchParty.viewerCount}

          </span>

          <span>

            {watchParty.visibility}

          </span>

          <span>

            {watchParty.type}

          </span>

        </div>

      </div>

    </div>

  );

};

WatchPartyPlayer.propTypes = {

  watchParty: PropTypes.object.isRequired,

  streamUrl: PropTypes.string.isRequired,

  autoPlay: PropTypes.bool,

  controls: PropTypes.bool,

  onPlay: PropTypes.func,

  onPause: PropTypes.func,

  onEnded: PropTypes.func

};

export default WatchPartyPlayer;