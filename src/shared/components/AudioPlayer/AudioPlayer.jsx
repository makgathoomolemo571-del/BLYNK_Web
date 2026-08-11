import "./AudioPlayer.css";

export default function AudioPlayer({

  src,

  controls = true,

  autoPlay = false,

  loop = false,

  preload = "metadata",

  className = "",

  onPlay,

  onPause,

  onEnded

}) {

  if (!src) return null;

  return (

    <audio

      className={`audio-player ${className}`}

      src={src}

      controls={controls}

      autoPlay={autoPlay}

      loop={loop}

      preload={preload}

      onPlay={onPlay}

      onPause={onPause}

      onEnded={onEnded}

    />

  );

}