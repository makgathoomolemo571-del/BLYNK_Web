import { useMemo } from "react";
import PropTypes from "prop-types";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Users", value: "users" },
  { label: "Creators", value: "creators" },
  { label: "Businesses", value: "businesses" },
  { label: "Posts", value: "posts" },
  { label: "Reels", value: "reels" },
  { label: "Podcasts", value: "podcasts" },
  { label: "Marketplace", value: "marketplace" },
  { label: "Creator Hire", value: "creatorHires" },
  { label: "Business Find", value: "businessFinds" }
];

export default function SearchFilters({
  value = "all",
  results = {},
  loading = false,
  onChange
}) {
  const counts = useMemo(() => ({
    all:
      (results.users?.length || 0) +
      (results.creators?.length || 0) +
      (results.businesses?.length || 0) +
      (results.posts?.length || 0) +
      (results.reels?.length || 0) +
      (results.podcasts?.length || 0) +
      (results.marketplace?.length || 0) +
      (results.creatorHires?.length || 0) +
      (results.businessFinds?.length || 0),

    users: results.users?.length || 0,
    creators: results.creators?.length || 0,
    businesses: results.businesses?.length || 0,
    posts: results.posts?.length || 0,
    reels: results.reels?.length || 0,
    podcasts: results.podcasts?.length || 0,
    marketplace: results.marketplace?.length || 0,
    creatorHires: results.creatorHires?.length || 0,
    businessFinds: results.businessFinds?.length || 0
  }), [results]);

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          disabled={loading}
          onClick={() => onChange(filter.value)}
          className={`
            flex items-center gap-2
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition-all
            duration-200
            border

            ${
              value === filter.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }

            ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }
          `}
        >
          <span>{filter.label}</span>

          <span
            className={`
              min-w-[22px]
              h-[22px]
              rounded-full
              flex
              items-center
              justify-center
              text-xs
              font-bold

              ${
                value === filter.value
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }
            `}
          >
            {counts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  );
}

SearchFilters.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  results: PropTypes.shape({
    users: PropTypes.array,
    creators: PropTypes.array,
    businesses: PropTypes.array,
    posts: PropTypes.array,
    reels: PropTypes.array,
    podcasts: PropTypes.array,
    marketplace: PropTypes.array,
    creatorHires: PropTypes.array,
    businessFinds: PropTypes.array
  }),
  onChange: PropTypes.func.isRequired
};