// modules/subscription/components/SubscriptionBadge.jsx

import PropTypes from "prop-types";
import clsx from "clsx";
import {
  FaCrown,
  FaUser,
  FaBuilding,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

const PLAN_STYLES = {
  FREE_MEMBER: {
    label: "Free Member",
    icon: FaUser,
    color:
      "bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700",
  },

  FREE_CREATOR: {
    label: "Free Creator",
    icon: FaStar,
    color:
      "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  },

  FREE_BUSINESS: {
    label: "Free Business",
    icon: FaBuilding,
    color:
      "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  },

  MEMBER_BASIC: {
    label: "Member Basic",
    icon: FaUser,
    color:
      "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700",
  },

  MEMBER_PLUS: {
    label: "Member Plus",
    icon: FaStar,
    color:
      "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700",
  },

  MEMBER_VIP: {
    label: "Member VIP",
    icon: FaCrown,
    color:
      "bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  },

  CREATOR_BASIC: {
    label: "Creator Basic",
    icon: FaStar,
    color:
      "bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
  },

  CREATOR_PLUS: {
    label: "Creator Plus",
    icon: FaCrown,
    color:
      "bg-violet-100 text-violet-700 border-violet-300 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700",
  },

  CREATOR_PRO: {
    label: "Creator Pro",
    icon: FaCrown,
    color:
      "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white border-transparent",
  },

  BUSINESS_BASIC: {
    label: "Business Basic",
    icon: FaBuilding,
    color:
      "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
  },

  BUSINESS_PRO: {
    label: "Business Pro",
    icon: FaBuilding,
    color:
      "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
  },

  BUSINESS_ENTERPRISE: {
    label: "Business Enterprise",
    icon: FaCrown,
    color:
      "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent",
  },
};

export default function SubscriptionBadge({
  subscription,
  size = "md",
  showStatus = true,
}) {
  if (!subscription) return null;

  const config =
    PLAN_STYLES[subscription.plan] ||
    PLAN_STYLES.FREE_MEMBER;

  const Icon = config.icon;

  const sizeClass = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }[size];

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border font-semibold",
        sizeClass,
        config.color
      )}
    >
      <Icon />

      <span>{config.label}</span>

      {showStatus &&
        subscription.status === "active" && (
          <FaCheckCircle className="text-green-500" />
        )}
    </div>
  );
}

SubscriptionBadge.propTypes = {
  subscription: PropTypes.shape({
    plan: PropTypes.string.isRequired,
    status: PropTypes.string,
    autoRenew: PropTypes.bool,
    endDate: PropTypes.string,
  }).isRequired,

  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),

  showStatus: PropTypes.bool,
};