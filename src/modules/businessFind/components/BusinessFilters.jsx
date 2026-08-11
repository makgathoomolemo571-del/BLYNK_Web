import { useEffect, useMemo, useState } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useBusinessFind } from "../hooks/useBusinessFind";

const STATUS_OPTIONS = [
  "all",
  "active",
  "paused",
  "closed"
];

const VISIBILITY_OPTIONS = [
  "all",
  "public",
  "private"
];

const INDUSTRIES = [
  "all",
  "Technology",
  "Fashion",
  "Gaming",
  "Music",
  "Education",
  "Sports",
  "Food",
  "Travel",
  "Finance",
  "Health",
  "Beauty",
  "Automotive",
  "Entertainment"
];

export default function BusinessFilters({

  value = {},

  onChange

}) {

  const { refresh } =
    useBusinessFind();

  const [filters, setFilters] =
    useState({

      search:
        value.search || "",

      industry:
        value.industry || "all",

      status:
        value.status || "all",

      visibility:
        value.visibility || "all"

    });

  useEffect(() => {

    setFilters(value);

  }, [value]);

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        onChange?.(filters);

        refresh?.(filters);

      }, 350);

    return () =>
      clearTimeout(timeout);

  }, [filters]);

  const activeFilters =
    useMemo(() => {

      return Object.values(filters)
        .filter(v =>
          v &&
          v !== "" &&
          v !== "all"
        ).length;

    }, [filters]);

  const update =
    (field, value) => {

      setFilters(prev => ({

        ...prev,

        [field]: value

      }));

    };

  const clearFilters =
    () => {

      setFilters({

        search: "",

        industry: "all",

        status: "all",

        visibility: "all"

      });

    };

  return (

    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <FunnelIcon
            className="h-5 w-5 text-blue-600"
          />

          <h2 className="font-semibold">

            Filter Campaigns

          </h2>

        </div>

        {activeFilters > 0 && (

          <button

            onClick={clearFilters}

            className="text-sm font-medium text-red-600 hover:text-red-700"

          >

            Clear Filters

          </button>

        )}

      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <div className="relative">

          <MagnifyingGlassIcon

            className="absolute left-3 top-3 h-5 w-5 text-gray-400"

          />

          <input

            value={filters.search}

            onChange={(e) =>

              update(
                "search",
                e.target.value
              )

            }

            placeholder="Search campaign..."

            className="w-full rounded-xl border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-600"

          />

        </div>

        <select

          value={filters.industry}

          onChange={(e) =>

            update(
              "industry",
              e.target.value
            )

          }

          className="rounded-xl border border-gray-300 p-2"

        >

          {INDUSTRIES.map(item => (

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))}

        </select>

        <select

          value={filters.status}

          onChange={(e) =>

            update(
              "status",
              e.target.value
            )

          }

          className="rounded-xl border border-gray-300 p-2"

        >

          {STATUS_OPTIONS.map(item => (

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))}

        </select>

        <select

          value={filters.visibility}

          onChange={(e) =>

            update(
              "visibility",
              e.target.value
            )

          }

          className="rounded-xl border border-gray-300 p-2"

        >

          {VISIBILITY_OPTIONS.map(item => (

            <option
              key={item}
              value={item}
            >

              {item}

            </option>

          ))}

        </select>

      </div>

    </div>

  );

}