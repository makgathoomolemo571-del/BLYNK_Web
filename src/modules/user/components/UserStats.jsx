import React from "react";
import PropTypes from "prop-types";
import {
  FaUserFriends,
  FaUserCheck,
  FaUserClock,
  FaUserSlash,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Item = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-sm">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-zinc-800 text-blue-600 dark:text-blue-400">
      {icon}
    </div>

    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>

      <span className="font-semibold text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  </div>
);

Item.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const UserStats = ({ user }) => {
  if (!user) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

      <Item
        icon={<FaUserFriends size={18} />}
        label="Role"
        value={user.role}
      />

      <Item
        icon={
          user.verified ? (
            <FaCheckCircle size={18} />
          ) : (
            <FaTimesCircle size={18} />
          )
        }
        label="Verified"
        value={user.verified ? "Verified" : "Not Verified"}
      />

      <Item
        icon={<FaUserCheck size={18} />}
        label="Status"
        value={user.status}
      />

      <Item
        icon={<FaUserSlash size={18} />}
        label="Account"
        value={user.isDeleted ? "Deleted" : "Active"}
      />

      <Item
        icon={<FaCalendarAlt size={18} />}
        label="Joined"
        value={
          new Date(user.createdAt).toLocaleDateString()
        }
      />

    </section>
  );
};

UserStats.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(UserStats);