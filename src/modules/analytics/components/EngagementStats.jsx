// modules/analytics/components/EngagementStats.jsx

import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Eye,
  Activity,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

    <div
      className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
    >
      {icon}
    </div>

    <div className="flex flex-col">

      <span className="text-sm text-zinc-500">
        {title}
      </span>

      <span className="text-2xl font-bold text-zinc-900 dark:text-white">
        {Number(value || 0).toLocaleString()}
      </span>

    </div>

  </div>
);

StatCard.propTypes = {

  title: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  icon: PropTypes.node.isRequired,

  color: PropTypes.string.isRequired,

};

function EngagementStats({

  analytics = {}

}) {

  const stats = useMemo(() => ({

    totalEvents:
      analytics.totalEvents || 0,

    today:
      analytics.today || 0,

    thisWeek:
      analytics.thisWeek || 0,

    profileViews:
      analytics.profileViews || 0,

  }), [analytics]);

  return (

    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      <StatCard

        title="Total Events"

        value={stats.totalEvents}

        color="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"

        icon={<Activity size={28} />}

      />

      <StatCard

        title="Today's Activity"

        value={stats.today}

        color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"

        icon={<CalendarDays size={28} />}

      />

      <StatCard

        title="This Week"

        value={stats.thisWeek}

        color="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"

        icon={<BarChart3 size={28} />}

      />

      <StatCard

        title="Profile Views"

        value={stats.profileViews}

        color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"

        icon={<Eye size={28} />}

      />

    </section>

  );

}

EngagementStats.propTypes = {

  analytics: PropTypes.shape({

    totalEvents: PropTypes.number,

    today: PropTypes.number,

    thisWeek: PropTypes.number,

    profileViews: PropTypes.number,

  }),

};

export default memo(EngagementStats);