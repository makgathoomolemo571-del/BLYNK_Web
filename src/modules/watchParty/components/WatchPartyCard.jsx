// modules/watchParty/components/WatchPartyCard.jsx

import React from "react";
import PropTypes from "prop-types";
import {
  FaUsers,
  FaBroadcastTower,
  FaPlayCircle,
  FaClock,
  FaLock,
  FaGlobeAfrica,
  FaUserFriends,
  FaCrown
} from "react-icons/fa";

const statusColor = {
  scheduled: "bg-yellow-500",
  live: "bg-red-600 animate-pulse",
  ended: "bg-gray-500"
};

const visibilityIcon = {
  public: <FaGlobeAfrica />,
  followers: <FaUserFriends />,
  subscribers: <FaCrown />,
  private: <FaLock />
};

const typeLabel = {
  creator_live: "Creator Live",
  business_live: "Business Live",
  venue_live: "Venue Live",
  watch_party: "Watch Party"
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

const WatchPartyCard = ({
  party,
  onOpen,
  onJoin
}) => {

  return (

    <article
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow hover:shadow-lg transition-all duration-300"
    >

      <div className="relative">

        <img
          src={
            party.thumbnail ||
            "/images/watchparty-placeholder.jpg"
          }
          alt={party.title}
          className="w-full h-56 object-cover"
        />

        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${statusColor[party.status]}`}
        >
          {party.status.toUpperCase()}
        </span>

      </div>

      <div className="p-5">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="font-bold text-xl text-zinc-900 dark:text-white">
              {party.title}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              {typeLabel[party.type]}
            </p>

          </div>

          <div className="text-xl text-blue-600">
            {visibilityIcon[party.visibility]}
          </div>

        </div>

        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
          {party.description}
        </p>

        <div className="mt-5 space-y-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <FaUsers
                className="text-blue-600"
              />

              <span className="text-sm">

                {party.viewerCount.toLocaleString()} Watching

              </span>

            </div>

            <div className="flex items-center gap-2">

              <FaBroadcastTower
                className="text-red-600"
              />

              <span className="text-sm">

                {party.status}

              </span>

            </div>

          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <FaClock />

            <span>

              Started:

              {" "}

              {formatDate(
                party.startedAt
              )}

            </span>

          </div>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onOpen(party)}
            className="flex-1 rounded-xl bg-zinc-900 dark:bg-zinc-700 text-white py-3 font-semibold hover:opacity-90"
          >
            Details
          </button>

          {party.status === "live" && (

            <button
              onClick={() => onJoin(party)}
              className="flex-1 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 flex justify-center items-center gap-2"
            >

              <FaPlayCircle />

              Join

            </button>

          )}

        </div>

      </div>

    </article>

  );

};

WatchPartyCard.propTypes = {

  party: PropTypes.shape({

    id: PropTypes.string.isRequired,

    creator: PropTypes.any,

    title: PropTypes.string.isRequired,

    description: PropTypes.string,

    type: PropTypes.oneOf([
      "creator_live",
      "business_live",
      "venue_live",
      "watch_party"
    ]),

    thumbnail: PropTypes.string,

    status: PropTypes.oneOf([
      "scheduled",
      "live",
      "ended"
    ]),

    visibility: PropTypes.oneOf([
      "public",
      "followers",
      "subscribers",
      "private"
    ]),

    viewerCount: PropTypes.number,

    startedAt: PropTypes.string,

    endedAt: PropTypes.string,

    createdAt: PropTypes.string

  }).isRequired,

  onOpen: PropTypes.func,

  onJoin: PropTypes.func

};

WatchPartyCard.defaultProps = {

  onOpen: () => {},

  onJoin: () => {}

};

export default React.memo(
  WatchPartyCard
);