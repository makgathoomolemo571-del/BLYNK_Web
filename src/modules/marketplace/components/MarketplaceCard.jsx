import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaClock } from "react-icons/fa";

const MarketplaceCard = ({ item, onApply, onView }) => {
  if (!item) return null;

  const {
    id,
    creator,
    title,
    category,
    description,
    price,
    budgetRange,
    location,
    listingType,
    applicationCount,
    createdAt,
  } = item;

  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition overflow-hidden">
      
      {/* HEADER */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
              {title}
            </span>
            <span className="text-xs text-zinc-500">
              {listingType}
            </span>
          </div>

          <div className="text-xs text-zinc-500 flex items-center gap-1">
            <FaClock />
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-3">
        
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-zinc-500">

          {location && (
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt />
              {location}
            </div>
          )}

          {price && (
            <div className="flex items-center gap-1">
              <FaMoneyBillWave />
              R {price}
            </div>
          )}

          {budgetRange && (
            <div className="flex items-center gap-1">
              <FaMoneyBillWave />
              {budgetRange}
            </div>
          )}

          <div className="flex items-center gap-1">
            <FaUsers />
            {applicationCount} Applications
          </div>

        </div>

        {category && (
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {category}
          </span>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">

        <button
          onClick={() => onView?.(id)}
          className="text-xs px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          View
        </button>

        <button
          onClick={() => onApply?.(id)}
          className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Apply
        </button>

      </div>
    </div>
  );
};

MarketplaceCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    creator: PropTypes.any,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    budgetRange: PropTypes.string,
    location: PropTypes.string,
    listingType: PropTypes.string,
    applicationCount: PropTypes.number,
    createdAt: PropTypes.string,
  }),
  onApply: PropTypes.func,
  onView: PropTypes.func,
};

export default React.memo(MarketplaceCard);