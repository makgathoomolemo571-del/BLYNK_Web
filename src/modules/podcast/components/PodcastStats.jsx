import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  FaPodcast,
  FaHeadphones,
  FaPlayCircle,
  FaListUl
} from "react-icons/fa";

const Item = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-all hover:shadow-md">

    <div className="text-2xl text-blue-600 dark:text-blue-400 mb-2">
      {icon}
    </div>

    <span className="text-2xl font-bold text-gray-900 dark:text-white">
      {Number(value ?? 0).toLocaleString()}
    </span>

    <span className="mt-1 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
      {label}
    </span>

  </div>
);

Item.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

const PodcastStats = ({ podcast }) => {

  if (!podcast) return null;

  return (

    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">

      <Item
        icon={<FaListUl />}
        label="Episodes"
        value={podcast.totalEpisodes}
      />

      <Item
        icon={<FaPlayCircle />}
        label="Views"
        value={podcast.totalViews}
      />

      <Item
        icon={<FaHeadphones />}
        label="Listeners"
        value={podcast.totalListeners}
      />

      <Item
        icon={<FaPodcast />}
        label="Visibility"
        value={podcast.visibility?.toUpperCase() || "PUBLIC"}
      />

    </section>

  );

};

PodcastStats.propTypes = {

  podcast: PropTypes.shape({

    id: PropTypes.string,

    creator: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    name: PropTypes.string,

    description: PropTypes.string,

    category: PropTypes.string,

    coverImage: PropTypes.string,

    visibility: PropTypes.string,

    totalEpisodes: PropTypes.number,

    totalViews: PropTypes.number,

    totalListeners: PropTypes.number,

    createdAt: PropTypes.string

  }).isRequired

};

export default memo(PodcastStats);