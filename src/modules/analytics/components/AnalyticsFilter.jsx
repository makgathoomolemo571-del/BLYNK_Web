import { useMemo, useState } from "react";
import PropTypes from "prop-types";

const EVENT_TYPES = [
  { label: "All Events", value: "" },

  { label: "Profile Views", value: "PROFILE_VIEWED" },
  { label: "Creator Views", value: "CREATOR_PROFILE_VIEWED" },
  { label: "Business Views", value: "BUSINESS_PROFILE_VIEWED" },

  { label: "Reel Views", value: "REEL_VIEWED" },
  { label: "Podcast Plays", value: "PODCAST_PLAYED" },

  { label: "Posts", value: "POST_CREATED" },
  { label: "Reels", value: "REEL_CREATED" },
  { label: "Stories", value: "STORY_CREATED" },
  { label: "Podcasts", value: "PODCAST_CREATED" },

  { label: "Marketplace", value: "MARKETPLACE_CREATED" },

  { label: "Wallet", value: "WALLET_TRANSACTION" },

  { label: "Verification", value: "VERIFICATION_REQUESTED" },

  { label: "Reports", value: "REPORT_CREATED" }
];

const DATE_RANGES = [
  { label: "Today", value: "today" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" }
];

export default function AnalyticsFilter({

  value,

  onChange,

  loading = false

}) {

  const [filters, setFilters] = useState({

    eventType:
      value?.eventType || "",

    range:
      value?.range || "7d"

  });

  const eventOptions =
    useMemo(() => EVENT_TYPES, []);

  const rangeOptions =
    useMemo(() => DATE_RANGES, []);

  const update = (key, val) => {

    const next = {

      ...filters,

      [key]: val

    };

    setFilters(next);

    onChange?.(next);

  };

  return (

    <div className="flex flex-wrap items-center gap-4 w-full">

      <div className="flex flex-col gap-1">

        <label className="text-sm font-medium">

          Event

        </label>

        <select

          disabled={loading}

          value={filters.eventType}

          onChange={(e) =>
            update(
              "eventType",
              e.target.value
            )
          }

          className="border rounded-lg px-3 py-2 bg-white dark:bg-neutral-900"

        >

          {

            eventOptions.map((item) => (

              <option

                key={item.value}

                value={item.value}

              >

                {item.label}

              </option>

            ))

          }

        </select>

      </div>

      <div className="flex flex-col gap-1">

        <label className="text-sm font-medium">

          Period

        </label>

        <select

          disabled={loading}

          value={filters.range}

          onChange={(e) =>
            update(
              "range",
              e.target.value
            )
          }

          className="border rounded-lg px-3 py-2 bg-white dark:bg-neutral-900"

        >

          {

            rangeOptions.map((item) => (

              <option

                key={item.value}

                value={item.value}

              >

                {item.label}

              </option>

            ))

          }

        </select>

      </div>

    </div>

  );

}

AnalyticsFilter.propTypes = {

  loading: PropTypes.bool,

  value: PropTypes.shape({

    eventType:
      PropTypes.string,

    range:
      PropTypes.string

  }),

  onChange:
    PropTypes.func

};