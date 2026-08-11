import React from "react";
import PropTypes from "prop-types";

const StatBox = ({ label, value }) => (
  <div className="flex flex-col items-center px-4 py-2">
    <span className="text-lg font-bold text-zinc-900 dark:text-white">
      {Number(value || 0).toLocaleString()}
    </span>
    <span className="text-xs text-zinc-500 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

const ProfileStats = ({ stats = {} }) => {
  const {
    followers = 0,
    following = 0,
    posts = 0,
    reels = 0,
  } = stats;

  return (
    <div className="flex justify-around border-y border-zinc-200 dark:border-zinc-800 py-3">
      <StatBox label="Followers" value={followers} />
      <StatBox label="Following" value={following} />
      <StatBox label="Posts" value={posts} />
      <StatBox label="Reels" value={reels} />
    </div>
  );
};

ProfileStats.propTypes = {
  stats: PropTypes.shape({
    followers: PropTypes.number,
    following: PropTypes.number,
    posts: PropTypes.number,
    reels: PropTypes.number,
  }),
};

export default React.memo(ProfileStats);