import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  FaUserTie,
  FaStore,
  FaRegImage,
  FaVideo,
  FaPlayCircle,
  FaMicrophone,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const ICONS = {
  creator: FaUserTie,
  business: FaStore,
  post: FaRegImage,
  reel: FaVideo,
  story: FaPlayCircle,
  podcast: FaMicrophone,
  marketplace: FaStore,
  creatorHire: FaBriefcase,
  businessFind: FaBuilding,
  venue: FaMapMarkerAlt,
};

const RecommendationCard = ({
  recommendation,
  onClick,
}) => {
  const Icon =
    ICONS[recommendation.type] || FaArrowRight;

  return (
    <article
      onClick={() => onClick(recommendation)}
      className="
        w-full
        rounded-2xl
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
        p-5
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-lg
        hover:border-blue-500
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            h-14
            w-14
            rounded-full
            bg-blue-100
            dark:bg-blue-900/40
            flex
            items-center
            justify-center
          "
        >
          <Icon
            size={24}
            className="text-blue-600"
          />
        </div>

        <div className="flex-1">

          <h3 className="font-semibold capitalize text-lg text-zinc-900 dark:text-white">
            {recommendation.type}
          </h3>

          <p className="text-sm text-zinc-500 break-all">
            {recommendation.targetId}
          </p>

          {recommendation.reason && (
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {recommendation.reason}
            </p>
          )}

        </div>

        <div className="text-right">

          <div
            className="
              text-xs
              uppercase
              text-zinc-500
              mb-1
            "
          >
            Score
          </div>

          <div
            className="
              text-2xl
              font-bold
              text-green-600
            "
          >
            {recommendation.score}
          </div>

        </div>

      </div>
    </article>
  );
};

RecommendationCard.propTypes = {
  recommendation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    reason: PropTypes.string,
  }).isRequired,

  onClick: PropTypes.func,
};

RecommendationCard.defaultProps = {
  onClick: () => {},
};

export default memo(RecommendationCard);