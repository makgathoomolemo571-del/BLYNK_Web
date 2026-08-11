import React from "react";
import PropTypes from "prop-types";

const ProfileTabs = ({ active = "posts", onChange }) => {
  const tabs = ["posts", "reels", "media", "about"];

  return (
    <div className="flex border-b border-zinc-200 dark:border-zinc-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-3 text-sm capitalize transition ${
            active === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-zinc-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

ProfileTabs.propTypes = {
  active: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(ProfileTabs);