import { Link } from "react-router-dom";

const STATUS_COLORS = {
  pending: "bg-yellow-500",
  reviewed: "bg-blue-500",
  accepted: "bg-green-600",
  rejected: "bg-red-600",
  withdrawn: "bg-zinc-600"
};

export default function ApplicationCard({
  application,
  showActions = false,
  onWithdraw
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-lg font-bold">
            {application.targetType
              ?.replaceAll("_", " ")
              .toUpperCase()}
          </h3>

          <p className="text-sm text-zinc-500 mt-1">
            #{application.id}
          </p>

        </div>

        <span
          className={`text-white text-xs px-3 py-1 rounded-full ${
            STATUS_COLORS[application.status] ||
            "bg-zinc-500"
          }`}
        >
          {application.status}
        </span>

      </div>

      {application.message && (
        <div className="mt-4">

          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {application.message}
          </p>

        </div>
      )}

      {application.proposal && (
        <div className="mt-4">

          <h4 className="font-semibold mb-1">
            Proposal
          </h4>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
            {application.proposal}
          </p>

        </div>
      )}

      {application.deliverables && (
        <div className="mt-4">

          <h4 className="font-semibold mb-1">
            Deliverables
          </h4>

          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            {application.deliverables}
          </p>

        </div>
      )}

      {application.proposedPrice && (
        <div className="mt-4">

          <span className="font-bold text-green-600 text-lg">
            R{application.proposedPrice}
          </span>

        </div>
      )}

      <div className="mt-5 flex gap-3">

        <Link
          to={`/applications/${application.id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          View
        </Link>

        {showActions &&
          application.status === "pending" && (
            <button
              onClick={() =>
                onWithdraw?.(application.id)
              }
              className="px-4 py-2 rounded-lg bg-red-600 text-white"
            >
              Withdraw
            </button>
          )}

      </div>

      <div className="mt-4 text-xs text-zinc-500">

        {new Date(
          application.createdAt
        ).toLocaleString()}

      </div>

    </div>
  );
}