import "./VideoPlayer.css";

export default function VideoPlayer({
  src,
  poster,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  preload = "metadata",
  className = "",
  onPlay,
  onPause,
  onEnded
}) {

  if (!src) return null;

  return (
    <video
      className={`video-player ${className}`}
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      preload={preload}
      playsInline
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
    />
  );
}