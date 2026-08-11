import React from "react";
import PropTypes from "prop-types";
import {
  FaPodcast,
  FaPlay,
  FaHeadphones,
  FaListUl,
  FaGlobeAfrica,
  FaUsers,
  FaLock,
  FaUserFriends,
} from "react-icons/fa";

const visibilityIcon = {
  public: <FaGlobeAfrica />,
  followers: <FaUserFriends />,
  subscribers: <FaUsers />,
  private: <FaLock />,
};

const formatNumber = (value = 0) =>
  Number(value).toLocaleString();

const PodcastHeader = ({
  podcast,
  onSubscribe,
  subscribed = false,
  loading = false,
}) => {
  if (!podcast) return null;

  return (
    <section className="w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow">

      <div className="h-56 w-full bg-zinc-100 dark:bg-zinc-800">
        {podcast.coverImage ? (
          <img
            src={podcast.coverImage}
            alt={podcast.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaPodcast className="text-7xl text-zinc-400" />
          </div>
        )}
      </div>

      <div className="p-6">

        <div className="flex items-start justify-between gap-5 flex-wrap">

          <div>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {podcast.name}
            </h1>

            {podcast.description && (
              <p className="mt-3 text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {podcast.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-4">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {podcast.category}
              </span>

              <span className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center gap-2 text-sm">
                {visibilityIcon[podcast.visibility]}
                {podcast.visibility}
              </span>

            </div>

          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onSubscribe}
            className={`px-5 py-3 rounded-xl font-semibold transition
              ${
                subscribed
                  ? "bg-zinc-800 text-white hover:bg-zinc-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {loading
              ? "Please wait..."
              : subscribed
              ? "Subscribed"
              : "Subscribe"}
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3">

            <FaListUl className="text-blue-600 text-xl" />

            <div>
              <p className="text-xs uppercase text-zinc-500">
                Episodes
              </p>

              <h3 className="font-bold text-xl">
                {formatNumber(
                  podcast.totalEpisodes
                )}
              </h3>
            </div>

          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3">

            <FaPlay className="text-green-600 text-xl" />

            <div>
              <p className="text-xs uppercase text-zinc-500">
                Plays
              </p>

              <h3 className="font-bold text-xl">
                {formatNumber(
                  podcast.totalViews
                )}
              </h3>
            </div>

          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-3">

            <FaHeadphones className="text-red-600 text-xl" />

            <div>
              <p className="text-xs uppercase text-zinc-500">
                Listeners
              </p>

              <h3 className="font-bold text-xl">
                {formatNumber(
                  podcast.totalListeners
                )}
              </h3>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

PodcastHeader.propTypes = {
  podcast: PropTypes.shape({
    id: PropTypes.string,
    creator: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    coverImage: PropTypes.string,
    visibility: PropTypes.string,
    totalEpisodes: PropTypes.number,
    totalViews: PropTypes.number,
    totalListeners: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,

  subscribed: PropTypes.bool,

  loading: PropTypes.bool,

  onSubscribe: PropTypes.func,
};

export default React.memo(PodcastHeader);