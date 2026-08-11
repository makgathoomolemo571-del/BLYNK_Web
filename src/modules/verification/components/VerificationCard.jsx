import React from "react";
import PropTypes from "prop-types";
import {
  BadgeCheck,
  Clock3,
  XCircle,
  ShieldQuestion,
  CalendarDays
} from "lucide-react";

const STATUS = {
  submitted: {
    label: "Submitted",
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: <Clock3 size={18} />
  },

  under_review: {
    label: "Under Review",
    color:
      "bg-blue-100 text-blue-700 border-blue-200",
    icon: <ShieldQuestion size={18} />
  },

  approved: {
    label: "Approved",
    color:
      "bg-green-100 text-green-700 border-green-200",
    icon: <BadgeCheck size={18} />
  },

  rejected: {
    label: "Rejected",
    color:
      "bg-red-100 text-red-700 border-red-200",
    icon: <XCircle size={18} />
  }
};

const TYPE = {
  identity: "Identity",
  creator: "Creator",
  business: "Business",
  venue: "Venue",
  podcast: "Podcast"
};

const formatDate = (date) => {

  if (!date) return "--";

  return new Date(date).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );

};

const VerificationCard = ({

  verification,

  onClick

}) => {

  const status =
    STATUS[
      verification.status
    ] ||
    STATUS.submitted;

  return (

    <div
      onClick={onClick}
      className="
      bg-white
      dark:bg-zinc-900
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-800
      shadow-sm
      hover:shadow-lg
      transition
      cursor-pointer
      overflow-hidden
      "
    >

      <div className="p-5">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">

              {verification.fullName}

            </h3>

            <p className="text-sm text-zinc-500 mt-1">

              {TYPE[
                verification.type
              ]}

            </p>

          </div>

          <span
            className={`
            flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            border
            ${status.color}
            `}
          >

            {status.icon}

            {status.label}

          </span>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">

          <div>

            <p className="text-xs uppercase text-zinc-400">

              Submitted

            </p>

            <div className="flex items-center gap-2 mt-1">

              <CalendarDays size={16} />

              <span className="text-sm">

                {formatDate(
                  verification.createdAt
                )}

              </span>

            </div>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-400">

              Reviewed

            </p>

            <div className="flex items-center gap-2 mt-1">

              <CalendarDays size={16} />

              <span className="text-sm">

                {formatDate(
                  verification.reviewedAt
                )}

              </span>

            </div>

          </div>

        </div>

        {

          verification.status ===
          "rejected"

          &&

          verification.rejectionReason

          &&

          <div
            className="
            mt-5
            rounded-xl
            bg-red-50
            border
            border-red-200
            p-4
            "
          >

            <p className="text-xs uppercase font-semibold text-red-600">

              Rejection Reason

            </p>

            <p className="text-sm text-red-700 mt-2">

              {
                verification.rejectionReason
              }

            </p>

          </div>

        }

      </div>

    </div>

  );

};

VerificationCard.propTypes = {

  verification: PropTypes.shape({

    id: PropTypes.string.isRequired,

    type: PropTypes.oneOf([
      "identity",
      "creator",
      "business",
      "venue",
      "podcast"
    ]).isRequired,

    status: PropTypes.oneOf([
      "submitted",
      "under_review",
      "approved",
      "rejected"
    ]).isRequired,

    fullName:
      PropTypes.string,

    reviewedAt:
      PropTypes.string,

    rejectionReason:
      PropTypes.string,

    createdAt:
      PropTypes.string.isRequired

  }).isRequired,

  onClick:
    PropTypes.func

};

VerificationCard.defaultProps = {

  onClick: () => {}

};

export default React.memo(
  VerificationCard
);