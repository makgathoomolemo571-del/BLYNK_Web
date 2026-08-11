import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FaFilter,
  FaSearch,
  FaTimes,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTags,
} from "react-icons/fa";

const MarketplaceFilters = ({ onChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    search: initialFilters.search || "",
    category: initialFilters.category || "",
    listingType: initialFilters.listingType || "",
    visibility: initialFilters.visibility || "",
    minPrice: initialFilters.minPrice || "",
    maxPrice: initialFilters.maxPrice || "",
    location: initialFilters.location || "",
  });

  const update = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange?.(updated);
  };

  const reset = () => {
    const cleared = {
      search: "",
      category: "",
      listingType: "",
      visibility: "",
      minPrice: "",
      maxPrice: "",
      location: "",
    };
    setFilters(cleared);
    onChange?.(cleared);
  };

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((v) => v && v !== "");
  }, [filters]);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold">
          <FaFilter />
          Filters
        </div>

        {hasActiveFilters && (
          <button
            onClick={reset}
            className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600"
          >
            <FaTimes />
            Reset
          </button>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative mb-3">
        <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        <input
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          placeholder="Search listings..."
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white outline-none"
        />
      </div>

      {/* CATEGORY */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="relative">
          <FaTags className="absolute top-3 left-3 text-zinc-400" />
          <input
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            placeholder="Category"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
          />
        </div>

        <select
          value={filters.listingType}
          onChange={(e) => update("listingType", e.target.value)}
          className="w-full py-2 px-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
        >
          <option value="">Listing Type</option>
          <option value="creator_service">Creator Service</option>
          <option value="business_opportunity">Business Opportunity</option>
          <option value="sponsorship">Sponsorship</option>
          <option value="collaboration">Collaboration</option>
          <option value="freelance_service">Freelance Service</option>
          <option value="event_opportunity">Event Opportunity</option>
        </select>
      </div>

      {/* PRICE */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="relative">
          <FaMoneyBillWave className="absolute top-3 left-3 text-zinc-400" />
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => update("minPrice", e.target.value)}
            placeholder="Min Price"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
          />
        </div>

        <div className="relative">
          <FaMoneyBillWave className="absolute top-3 left-3 text-zinc-400" />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            placeholder="Max Price"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
          />
        </div>
      </div>

      {/* LOCATION + VISIBILITY */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <FaMapMarkerAlt className="absolute top-3 left-3 text-zinc-400" />
          <input
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Location"
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
          />
        </div>

        <select
          value={filters.visibility}
          onChange={(e) => update("visibility", e.target.value)}
          className="w-full py-2 px-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent"
        >
          <option value="">Visibility</option>
          <option value="public">Public</option>
          <option value="members">Members</option>
          <option value="subscribers">Subscribers</option>
        </select>
      </div>
    </div>
  );
};

MarketplaceFilters.propTypes = {
  onChange: PropTypes.func,
  initialFilters: PropTypes.object,
};

export default React.memo(MarketplaceFilters);