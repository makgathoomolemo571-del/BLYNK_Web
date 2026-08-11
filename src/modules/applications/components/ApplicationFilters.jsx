import { Search } from "lucide-react";

const STATUS = [
  "all",
  "pending",
  "reviewed",
  "accepted",
  "rejected",
  "withdrawn"
];

const TYPES = [
  "all",
  "creator_hire",
  "business_find",
  "marketplace"
];

export default function ApplicationFilters({
  filters,
  setFilters
}) {
  function update(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5">

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search applications..."
            value={filters.search}
            onChange={e =>
              update("search", e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
          />

        </div>

        <select
          value={filters.status}
          onChange={e =>
            update("status", e.target.value)
          }
          className="border rounded-lg px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
        >
          {STATUS.map(item => (
            <option
              key={item}
              value={item}
            >
              {item.replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={filters.type}
          onChange={e =>
            update("type", e.target.value)
          }
          className="border rounded-lg px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
        >
          {TYPES.map(item => (
            <option
              key={item}
              value={item}
            >
              {item.replace("_", " ")}
            </option>
          ))}
        </select>

        <button
          onClick={() =>
            setFilters({
              search: "",
              status: "all",
              type: "all"
            })
          }
          className="rounded-lg bg-zinc-900 text-white py-3 hover:bg-black"
        >
          Clear Filters
        </button>

      </div>

    </div>
  );
}