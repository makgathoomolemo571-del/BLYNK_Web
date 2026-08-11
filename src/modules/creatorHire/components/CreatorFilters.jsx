import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Search,
  Filter,
  X,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";

const STATUS = [
  "all",
  "open",
  "closed",
  "completed",
];

const WORK_TYPES = [
  "all",
  "remote",
  "hybrid",
  "onsite",
];

const EXPERIENCE = [
  "all",
  "junior",
  "mid",
  "senior",
  "expert",
];

const VISIBILITY = [
  "all",
  "public",
  "members",
  "subscribers",
];

export default function CreatorFilters({
  jobs = [],
  onChange,
}) {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    status: "all",
    workType: "all",
    experience: "all",
    visibility: "all",
    location: "",
    category: "",
    skill: "",
    budget: ""
  });

  const update = (key, value) => {
    const next = {
      ...filters,
      [key]: value
    };

    setFilters(next);

    onChange?.({
      search,
      filters: next,
      jobs: applyFilters(jobs, search, next)
    });
  };

  const filtered = useMemo(() => {

    return applyFilters(
      jobs,
      search,
      filters
    );

  }, [jobs, search, filters]);

  const clearFilters = () => {

    const reset = {
      status: "all",
      workType: "all",
      experience: "all",
      visibility: "all",
      location: "",
      category: "",
      skill: "",
      budget: ""
    };

    setFilters(reset);
    setSearch("");

    onChange?.({
      search: "",
      filters: reset,
      jobs
    });

  };

  return (
    <div className="w-full rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex items-center gap-2 mb-5">

        <Filter size={18} />

        <h3 className="font-semibold">
          Creator Hire Filters
        </h3>

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <div className="relative">

          <Search
            className="absolute left-3 top-3"
            size={18}
          />

          <input
            className="w-full rounded-lg border pl-10 pr-3 py-2"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => {

              const value = e.target.value;

              setSearch(value);

              onChange?.({
                search: value,
                filters,
                jobs: applyFilters(
                  jobs,
                  value,
                  filters
                )
              });

            }}
          />

        </div>

        <select
          className="rounded-lg border p-2"
          value={filters.status}
          onChange={(e) =>
            update(
              "status",
              e.target.value
            )
          }
        >
          {STATUS.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border p-2"
          value={filters.workType}
          onChange={(e) =>
            update(
              "workType",
              e.target.value
            )
          }
        >
          {WORK_TYPES.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border p-2"
          value={filters.experience}
          onChange={(e) =>
            update(
              "experience",
              e.target.value
            )
          }
        >
          {EXPERIENCE.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>

        <select
          className="rounded-lg border p-2"
          value={filters.visibility}
          onChange={(e) =>
            update(
              "visibility",
              e.target.value
            )
          }
        >
          {VISIBILITY.map((s) => (
            <option
              key={s}
              value={s}
            >
              {s}
            </option>
          ))}
        </select>

        <div className="relative">

          <Briefcase
            className="absolute left-3 top-3"
            size={18}
          />

          <input
            className="w-full rounded-lg border pl-10 py-2"
            placeholder="Category"
            value={filters.category}
            onChange={(e) =>
              update(
                "category",
                e.target.value
              )
            }
          />

        </div>

        <div className="relative">

          <MapPin
            className="absolute left-3 top-3"
            size={18}
          />

          <input
            className="w-full rounded-lg border pl-10 py-2"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              update(
                "location",
                e.target.value
              )
            }
          />

        </div>

        <input
          className="rounded-lg border p-2"
          placeholder="Required Skill"
          value={filters.skill}
          onChange={(e) =>
            update(
              "skill",
              e.target.value
            )
          }
        />

        <div className="relative">

          <DollarSign
            className="absolute left-3 top-3"
            size={18}
          />

          <input
            className="w-full rounded-lg border pl-10 py-2"
            placeholder="Budget"
            value={filters.budget}
            onChange={(e) =>
              update(
                "budget",
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="mt-5 flex justify-between items-center">

        <span className="text-sm text-gray-500">

          {filtered.length} job(s)

        </span>

        <button
          onClick={clearFilters}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          <X size={16} />
          Clear
        </button>

      </div>

    </div>
  );
}

function applyFilters(
  jobs,
  search,
  filters
) {

  return jobs.filter((job) => {

    if (
      search &&
      !job.projectTitle
        ?.toLowerCase()
        .includes(search.toLowerCase()) &&
      !job.description
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )
      return false;

    if (
      filters.status !== "all" &&
      job.status !== filters.status
    )
      return false;

    if (
      filters.workType !== "all" &&
      job.workType !== filters.workType
    )
      return false;

    if (
      filters.visibility !== "all" &&
      job.visibility !== filters.visibility
    )
      return false;

    if (
      filters.experience !== "all" &&
      job.experienceLevel !==
        filters.experience
    )
      return false;

    if (
      filters.location &&
      !job.location
        ?.toLowerCase()
        .includes(
          filters.location.toLowerCase()
        )
    )
      return false;

    if (
      filters.category &&
      !job.category
        ?.toLowerCase()
        .includes(
          filters.category.toLowerCase()
        )
    )
      return false;

    if (
      filters.skill &&
      !job.skills?.some((skill) =>
        skill
          .toLowerCase()
          .includes(
            filters.skill.toLowerCase()
          )
      )
    )
      return false;

    if (
      filters.budget &&
      !job.budgetRange
        ?.toLowerCase()
        .includes(
          filters.budget.toLowerCase()
        )
    )
      return false;

    return true;

  });

}

CreatorFilters.propTypes = {
  jobs: PropTypes.array,
  onChange: PropTypes.func
};