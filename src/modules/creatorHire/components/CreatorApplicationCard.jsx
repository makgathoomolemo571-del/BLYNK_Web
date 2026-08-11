// modules/creatorHire/components/CreatorApplicationCard.jsx

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  FaUserTie,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaUserFriends
} from "react-icons/fa";

const statusColor = {
  open: "bg-emerald-100 text-emerald-700",
  closed: "bg-yellow-100 text-yellow-700",
  completed: "bg-blue-100 text-blue-700"
};

const CreatorApplicationCard = ({
  application,
  onView,
  onApply
}) => {

  const {
    id,
    projectTitle,
    category,
    description,
    objectives,
    deliverables,
    roleRequired,
    experienceLevel,
    skills,
    budgetType,
    budgetRange,
    paymentMethod,
    timelineStart,
    timelineEnd,
    workType,
    location,
    timeZone,
    applicants,
    visibility,
    status
  } = application;

  return (

    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

      <div className="p-6 space-y-5">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold">

              {projectTitle}

            </h2>

            <div className="mt-2 flex flex-wrap gap-2">

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">

                {category}

              </span>

              <span className={`px-3 py-1 rounded-full text-xs ${statusColor[status]}`}>

                {status}

              </span>

            </div>

          </div>

        </div>

        <p className="text-gray-700">

          {description}

        </p>

        <div className="grid md:grid-cols-2 gap-4">

          <div>

            <div className="font-semibold mb-1">

              Objectives

            </div>

            <p>{objectives}</p>

          </div>

          <div>

            <div className="font-semibold mb-1">

              Deliverables

            </div>

            <p>{deliverables}</p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="flex gap-2">

            <FaBriefcase className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Role

              </div>

              <div>

                {roleRequired}

              </div>

            </div>

          </div>

          <div className="flex gap-2">

            <FaLayerGroup className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Experience

              </div>

              <div>

                {experienceLevel}

              </div>

            </div>

          </div>

          <div className="flex gap-2">

            <FaMoneyBillWave className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Budget

              </div>

              <div>

                {budgetType} • {budgetRange}

              </div>

            </div>

          </div>

        </div>

        <div>

          <div className="font-semibold mb-2">

            Skills Required

          </div>

          <div className="flex flex-wrap gap-2">

            {skills?.map(skill => (

              <span
                key={skill}
                className="bg-gray-100 rounded-full px-3 py-1 text-sm"
              >

                {skill}

              </span>

            ))}

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="flex gap-2">

            <FaCalendarAlt className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Timeline

              </div>

              <div>

                {new Date(timelineStart).toLocaleDateString()} -

                {" "}

                {new Date(timelineEnd).toLocaleDateString()}

              </div>

            </div>

          </div>

          <div className="flex gap-2">

            <FaMapMarkerAlt className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Work

              </div>

              <div>

                {workType} • {location}

              </div>

            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="flex gap-2">

            <FaClock className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Time Zone

              </div>

              <div>

                {timeZone}

              </div>

            </div>

          </div>

          <div className="flex gap-2">

            <FaUserFriends className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Applicants

              </div>

              <div>

                {applicants?.length || 0}

              </div>

            </div>

          </div>

          <div className="flex gap-2">

            <FaUserTie className="mt-1"/>

            <div>

              <div className="text-xs text-gray-500">

                Visibility

              </div>

              <div>

                {visibility}

              </div>

            </div>

          </div>

        </div>

        <div className="border-t pt-5 flex gap-3">

          <button
            onClick={() => onView(id)}
            className="px-5 py-2 rounded-lg bg-black text-white"
          >

            View Details

          </button>

          {status === "open" && (

            <button
              onClick={() => onApply(id)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >

              Apply Now

            </button>

          )}

        </div>

      </div>

    </div>

  );

};

CreatorApplicationCard.propTypes = {

  application: PropTypes.object.isRequired,

  onView: PropTypes.func,

  onApply: PropTypes.func

};

CreatorApplicationCard.defaultProps = {

  onView: () => {},

  onApply: () => {}

};

export default memo(CreatorApplicationCard);