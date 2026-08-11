import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ROLE_COLORS = {
  member:
    "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300",

  creator:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",

  business:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",

  admin:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",

  superadmin:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const ROLE_ICON = {
  member: null,
  creator: <FaUserTie size={12} />,
  business: <FaShieldAlt size={12} />,
  admin: <FaShieldAlt size={12} />,
  superadmin: <FaShieldAlt size={12} />,
};

const UserBadge = ({
  role = "member",
  verified = false,
  status = "active",
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">

      {/* Role */}

      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          ROLE_COLORS[role] || ROLE_COLORS.member
        }`}
      >
        {ROLE_ICON[role]}
        {role}
      </span>

      {/* Verified */}

      {verified && (
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          title="Verified Account"
        >
          <MdVerified size={15} />
          Verified
        </span>
      )}

      {/* Active */}

      {status === "active" && (
        <span
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          title="Active"
        >
          <FaCheckCircle size={13} />
          Active
        </span>
      )}

      {/* Suspended */}

      {status === "suspended" && (
        <span
          className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
        >
          Suspended
        </span>
      )}

      {/* Banned */}

      {status === "banned" && (
        <span
          className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
        >
          Banned
        </span>
      )}

    </div>
  );
};

UserBadge.propTypes = {
  role: PropTypes.oneOf([
    "member",
    "creator",
    "business",
    "admin",
    "superadmin",
  ]),
  verified: PropTypes.bool,
  status: PropTypes.oneOf([
    "active",
    "suspended",
    "banned",
  ]),
};

export default React.memo(UserBadge);