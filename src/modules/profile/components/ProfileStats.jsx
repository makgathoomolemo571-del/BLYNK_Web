import React from "react";
import PropTypes from "prop-types";



const ProfileStats = ({ stats = {} }) => {

  const safeStats = {
    followers: Number(stats.followers || 0),
    following: Number(stats.following || 0),
    friends: Number(stats.friends || 0),
    posts: Number(stats.posts || 0),
    reels: Number(stats.reels || 0),
    stories: Number(stats.stories || 0),
    podcasts: Number(stats.podcasts || 0),
    profileViews: Number(stats.profileViews || 0)
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

      <Stat
        label="Followers"
        value={safeStats.followers}
      />

      <Stat
        label="Following"
        value={safeStats.following}
      />

      <Stat
        label="Friends"
        value={safeStats.friends}
      />

      <Stat
        label="Posts"
        value={safeStats.posts}
      />

      <Stat
        label="Reels"
        value={safeStats.reels}
      />

      <Stat
        label="Stories"
        value={safeStats.stories}
      />

      <Stat
        label="Podcasts"
        value={safeStats.podcasts}
      />

      <Stat
        label="Views"
        value={safeStats.profileViews}
      />

    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-2xl border bg-white p-4 text-center shadow-sm dark:bg-zinc-900">

    <div className="text-2xl font-bold">
      {value.toLocaleString()}
    </div>

    <div className="text-sm text-zinc-500">
      {label}
    </div>

  </div>
);

export default ProfileStats;

