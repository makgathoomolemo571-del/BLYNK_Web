import { useMemo } from "react";
import PropTypes from "prop-types";

const FILTERS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
  {
    label: "Read",
    value: "read",
  },
];

const NotificationFilters = ({
  notifications = [],
  activeFilter = "all",
  onChange,
}) => {
  const counts = useMemo(() => {
    const unread = notifications.filter(
      (item) => !item.read
    ).length;

    return {
      all: notifications.length,
      unread,
      read: notifications.length - unread,
    };
  }, [notifications]);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {FILTERS.map((filter) => {
        const active =
          activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              onChange(filter.value)
            }
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200
            ${
              active
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span>{filter.label}</span>

            <span
              className={`min-w-[24px] rounded-full px-2 py-0.5 text-xs
              ${
                active
                  ? "bg-white text-blue-600"
                  : "bg-blue-100 text-blue-700 dark:bg-zinc-700 dark:text-white"
              }`}
            >
              {counts[filter.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

NotificationFilters.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      read: PropTypes.bool,
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
      entityType: PropTypes.string,
      entityId: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ),
  activeFilter: PropTypes.oneOf([
    "all",
    "read",
    "unread",
  ]),
  onChange: PropTypes.func.isRequired,
};

export default NotificationFilters;