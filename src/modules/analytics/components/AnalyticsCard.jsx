// modules/analytics/components/AnalyticsCard.jsx

import PropTypes from "prop-types";
import { memo } from "react";

const formatValue = (value) => {
  if (typeof value === "number") {
    return value.toLocaleString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value ?? "-";
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString();
};

function AnalyticsCard({ analytics }) {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">
          Analytics Event
        </h2>
      </div>

      <div className="space-y-4 p-6">

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Event
          </p>

          <p className="font-semibold">
            {analytics.eventType}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Actor
          </p>

          <p>
            {analytics.actor || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Target
          </p>

          <p>
            {analytics.targetId || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Target Type
          </p>

          <p>
            {analytics.targetType || "-"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Metadata
          </p>

          <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-800">
            {formatValue(analytics.metadata)}
          </pre>
        </div>

        <div>
          <p className="text-xs uppercase text-zinc-500">
            Created
          </p>

          <p>
            {formatDate(analytics.createdAt)}
          </p>
        </div>

      </div>
    </div>
  );
}

AnalyticsCard.propTypes = {
  analytics: PropTypes.shape({
    id: PropTypes.string,
    eventType: PropTypes.string.isRequired,
    actor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    targetId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    targetType: PropTypes.string,
    metadata: PropTypes.object,
    createdAt: PropTypes.string
  }).isRequired
};

export default memo(AnalyticsCard);