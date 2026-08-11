import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  FaPodcast,
  FaPlay,
  FaUsers,
  FaEye,
  FaLock,
  FaUserFriends,
  FaStar
} from "react-icons/fa";

const visibilityIcon = {
  public: <FaPodcast />,
  followers: <FaUserFriends />,
  subscribers: <FaStar />,
  private: <FaLock />
};

const PodcastCard = ({
  podcast,
  onClick,
  onSubscribe
}) => {

  if (!podcast) return null;

  return (
    <article
      onClick={() => onClick?.(podcast)}
      className="
      bg-white
      dark:bg-zinc-900
      rounded-2xl
      shadow-sm
      hover:shadow-lg
      border
      border-zinc-200
      dark:border-zinc-800
      overflow-hidden
      transition-all
      duration-300
      cursor-pointer
      "
    >

      <div className="relative">

        <img
          src={
            podcast.coverImage ||
            "/images/podcast-default.png"
          }
          alt={podcast.name}
          className="
          w-full
          h-56
          object-cover
          "
        />

        <div
          className="
          absolute
          top-3
          right-3
          bg-black/60
          text-white
          rounded-full
          p-2
          "
        >
          {visibilityIcon[podcast.visibility]}
        </div>

      </div>

      <div className="p-5">

        <h2
          className="
          font-bold
          text-lg
          text-zinc-900
          dark:text-white
          line-clamp-1
          "
        >
          {podcast.name}
        </h2>

        <p
          className="
          text-zinc-500
          dark:text-zinc-400
          text-sm
          mt-2
          line-clamp-3
          "
        >
          {podcast.description}
        </p>

        <div
          className="
          flex
          items-center
          justify-between
          mt-4
          text-xs
          text-zinc-500
          "
        >

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-blue-50
            text-blue-600
            dark:bg-blue-950
            dark:text-blue-300
            "
          >
            {podcast.category}
          </span>

          <span>
            {new Date(
              podcast.createdAt
            ).toLocaleDateString()}
          </span>

        </div>

        <div
          className="
          grid
          grid-cols-3
          gap-3
          mt-5
          "
        >

          <div className="text-center">

            <FaPlay
              className="
              mx-auto
              text-blue-600
              "
            />

            <p
              className="
              font-semibold
              mt-2
              "
            >
              {podcast.totalEpisodes}
            </p>

            <small>Episodes</small>

          </div>

          <div className="text-center">

            <FaEye
              className="
              mx-auto
              text-green-600
              "
            />

            <p
              className="
              font-semibold
              mt-2
              "
            >
              {podcast.totalViews.toLocaleString()}
            </p>

            <small>Views</small>

          </div>

          <div className="text-center">

            <FaUsers
              className="
              mx-auto
              text-purple-600
              "
            />

            <p
              className="
              font-semibold
              mt-2
              "
            >
              {podcast.totalListeners.toLocaleString()}
            </p>

            <small>Listeners</small>

          </div>

        </div>

        <button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    onClick?.(podcast);
  }}
  className="
    w-full
    mt-6
    py-3
    rounded-xl
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-semibold
    transition
  "
>
  Open/ Enter Podcast
</button>

      </div>

    </article>
  );

};

PodcastCard.propTypes = {

  podcast: PropTypes.shape({

    id: PropTypes.string.isRequired,

    creator: PropTypes.any,

    name: PropTypes.string.isRequired,

    description: PropTypes.string,

    category: PropTypes.string,

    coverImage: PropTypes.string,

    visibility: PropTypes.oneOf([
      "public",
      "followers",
      "subscribers",
      "private"
    ]),

    totalEpisodes: PropTypes.number,

    totalViews: PropTypes.number,

    totalListeners: PropTypes.number,

    createdAt: PropTypes.string

  }).isRequired,

  onClick: PropTypes.func,

  onSubscribe: PropTypes.func

};

export default memo(PodcastCard);