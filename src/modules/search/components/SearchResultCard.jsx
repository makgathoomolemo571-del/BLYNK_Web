import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaBuilding,
  FaPodcast,
  FaVideo,
  FaStore,
  FaBriefcase,
  FaBullhorn,
  FaRegFileAlt
} from "react-icons/fa";

const ICONS = {
  users: <FaUser />,
  creators: <FaUser />,
  businesses: <FaBuilding />,
  posts: <FaRegFileAlt />,
  reels: <FaVideo />,
  podcasts: <FaPodcast />,
  marketplace: <FaStore />,
  creatorHires: <FaBriefcase />,
  businessFinds: <FaBullhorn />
};

const TITLES = {
  users: "User",
  creators: "Creator",
  businesses: "Business",
  posts: "Post",
  reels: "Reel",
  podcasts: "Podcast",
  marketplace: "Marketplace",
  creatorHires: "Creator Hire",
  businessFinds: "Business Find"
};

const getLink = (type, item) => {
  switch (type) {
    case "users":
    case "creators":
    case "businesses":
      return `/profile/${item._id || item.id}`;

    case "posts":
      return `/posts/${item._id || item.id}`;

    case "reels":
      return `/reels/${item._id || item.id}`;

    case "podcasts":
      return `/podcasts/${item._id || item.id}`;

    case "marketplace":
      return `/marketplace/${item._id || item.id}`;

    case "creatorHires":
      return `/creator-hire/${item._id || item.id}`;

    case "businessFinds":
      return `/business-find/${item._id || item.id}`;

    default:
      return "#";
  }
};

const getTitle = (type, item) => {
  switch (type) {
    case "users":
    case "creators":
    case "businesses":
      return (
        item.displayName ||
        item.username ||
        "Unknown User"
      );

    case "posts":
    case "reels":
      return (
        item.caption ||
        "Untitled"
      );

    case "podcasts":
      return (
        item.title ||
        "Untitled Podcast"
      );

    case "marketplace":
      return (
        item.title ||
        "Marketplace Item"
      );

    case "creatorHires":
      return (
        item.projectTitle ||
        "Creator Hire"
      );

    case "businessFinds":
      return (
        item.campaignName ||
        "Business Campaign"
      );

    default:
      return "";
  }
};

const getSubtitle = (type, item) => {
  switch (type) {
    case "users":
    case "creators":
    case "businesses":
      return item.email || "";

    case "posts":
    case "reels":
      return item.creator?.username || "";

    case "podcasts":
      return item.creator?.username || "";

    case "marketplace":
      return item.category || "";

    case "creatorHires":
      return item.category || "";

    case "businessFinds":
      return item.brandName || "";

    default:
      return "";
  }
};

function SearchResultCard({
  item,
  type
}) {
  return (
    <Link
      to={getLink(type, item)}
      className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-zinc-800">

        {item.profilePicture ? (
          <img
            src={item.profilePicture}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl text-blue-600">
            {ICONS[type]}
          </span>
        )}

      </div>

      <div className="flex-1 overflow-hidden">

        <div className="flex items-center gap-2">

          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
            {getTitle(type, item)}
          </h3>

          <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {TITLES[type]}
          </span>

        </div>

        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
          {getSubtitle(type, item)}
        </p>

      </div>

    </Link>
  );
}

SearchResultCard.propTypes = {
  type: PropTypes.oneOf([
    "users",
    "creators",
    "businesses",
    "posts",
    "reels",
    "podcasts",
    "marketplace",
    "creatorHires",
    "businessFinds"
  ]).isRequired,

  item: PropTypes.object.isRequired
};

export default React.memo(SearchResultCard);