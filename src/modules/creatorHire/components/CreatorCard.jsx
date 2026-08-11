import React from "react";
import PropTypes from "prop-types";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Users,
  Calendar,
  BadgeCheck,
} from "lucide-react";

const STATUS = {
  open: "bg-green-100 text-green-700",
  closed: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const VISIBILITY = {
  public: "Public",
  members: "Members",
  subscribers: "Subscribers",
};

const CreatorCard = ({
  creatorHire,
  onOpen,
  onApply,
  applying = false,
}) => {
  if (!creatorHire) return null;

  const {
    projectTitle,
    category,
    description,

    creator,

    roleRequired,
    experienceLevel,

    budgetType,
    budgetRange,

    paymentMethod,

    timelineStart,
    timelineEnd,

    workType,
    location,
    timeZone,

    applicants = [],

    visibility,
    status,

    createdAt,
  } = creatorHire;

  return (
    <article className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

      <div className="p-6">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-bold text-zinc-900">
              {projectTitle}
            </h2>

            <p className="text-sm text-blue-600 mt-1">
              {category}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              STATUS[status]
            }`}
          >
            {status}
          </span>

        </div>

        <p className="mt-4 text-zinc-600 line-clamp-3">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6">

          <div className="flex items-center gap-2">

            <Briefcase
              className="w-4 h-4 text-blue-600"
            />

            <span className="text-sm">

              {roleRequired}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <BadgeCheck
              className="w-4 h-4 text-blue-600"
            />

            <span className="text-sm">

              {experienceLevel}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <DollarSign
              className="w-4 h-4 text-green-600"
            />

            <span className="text-sm">

              {budgetType}

              {" • "}

              {budgetRange}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Clock
              className="w-4 h-4 text-orange-600"
            />

            <span className="text-sm">

              {paymentMethod}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <Calendar
              className="w-4 h-4 text-purple-600"
            />

            <span className="text-sm">

              {timelineStart
                ? new Date(
                    timelineStart
                  ).toLocaleDateString()
                : "-"}

              {" - "}

              {timelineEnd
                ? new Date(
                    timelineEnd
                  ).toLocaleDateString()
                : "-"}

            </span>

          </div>

          <div className="flex items-center gap-2">

            <MapPin
              className="w-4 h-4 text-red-500"
            />

            <span className="text-sm">

              {location || "Remote"}

            </span>

          </div>

        </div>

        <div className="flex flex-wrap gap-2 mt-6">

          <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">

            {workType}

          </span>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

            {VISIBILITY[visibility]}

          </span>

          {timeZone && (

            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">

              {timeZone}

            </span>

          )}

        </div>

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Users
              className="w-4 h-4 text-zinc-500"
            />

            <span className="text-sm text-zinc-600">

              {applicants.length} Applicants

            </span>

          </div>

          <span className="text-xs text-zinc-400">

            Posted{" "}

            {new Date(
              createdAt
            ).toLocaleDateString()}

          </span>

        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={() =>
              onOpen?.(creatorHire)
            }
            className="flex-1 rounded-xl border border-blue-600 text-blue-600 py-3 font-semibold hover:bg-blue-50 transition"
          >
            View Details
          </button>

          <button
            disabled={
              applying ||
              status !== "open"
            }
            onClick={() =>
              onApply?.(creatorHire)
            }
            className="flex-1 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {applying
              ? "Applying..."
              : "Apply"}
          </button>

        </div>

      </div>

    </article>
  );
};

CreatorCard.propTypes = {
  creatorHire: PropTypes.object.isRequired,
  onOpen: PropTypes.func,
  onApply: PropTypes.func,
  applying: PropTypes.bool,
};

export default React.memo(CreatorCard);