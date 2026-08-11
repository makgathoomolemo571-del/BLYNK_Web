import React from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserShield,
  FaBuilding,
  FaMicrophone,
  FaStore,
  FaIdCard,
} from "react-icons/fa";

const STATUS = {
  submitted: {
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
    icon: <FaClock />,
    label: "Submitted",
  },

  under_review: {
    color:
      "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    icon: <FaClock />,
    label: "Under Review",
  },

  approved: {
    color:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
    icon: <FaCheckCircle />,
    label: "Verified",
  },

  rejected: {
    color:
      "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
    icon: <FaTimesCircle />,
    label: "Rejected",
  },
};

const TYPES = {
  identity: <FaIdCard />,
  creator: <FaUserShield />,
  business: <FaBuilding />,
  venue: <FaStore />,
  podcast: <FaMicrophone />,
};

const VerificationBadge = ({
  verification,
  size = "md",
  showLabel = true,
}) => {
  if (!verification) return null;

  const status =
    STATUS[verification.status];

  if (!status) return null;

  const icon =
    TYPES[verification.type] || (
      <FaCheckCircle />
    );

  const sizes = {
    sm: {
      badge: "px-2 py-1 text-xs",
      icon: "text-xs",
    },

    md: {
      badge: "px-3 py-1.5 text-sm",
      icon: "text-sm",
    },

    lg: {
      badge: "px-4 py-2 text-base",
      icon: "text-lg",
    },
  };

  const current =
    sizes[size] || sizes.md;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        font-semibold
        ${status.color}
        ${current.badge}
      `}
    >
      <span className={current.icon}>
        {status.icon}
      </span>

      <span className={current.icon}>
        {icon}
      </span>

      {showLabel && (
        <span>{status.label}</span>
      )}
    </div>
  );
};

VerificationBadge.propTypes = {
  verification: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.oneOf([
      "identity",
      "creator",
      "business",
      "venue",
      "podcast",
    ]),
    status: PropTypes.oneOf([
      "submitted",
      "under_review",
      "approved",
      "rejected",
    ]),
    fullName: PropTypes.string,
    reviewedAt: PropTypes.string,
    rejectionReason:
      PropTypes.string,
    createdAt:
      PropTypes.string,
  }).isRequired,

  size: PropTypes.oneOf([
    "sm",
    "md",
    "lg",
  ]),

  showLabel: PropTypes.bool,
};

export default React.memo(
  VerificationBadge
);