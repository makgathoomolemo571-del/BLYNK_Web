import { Link } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaStore,
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBan
} from "react-icons/fa";

const icons = {
  creator_hire: <FaBriefcase />,
  business_find: <FaStore />,
  marketplace: <FaBoxOpen />
};

const colors = {
  pending: "#f59e0b",
  reviewed: "#3b82f6",
  accepted: "#22c55e",
  rejected: "#ef4444",
  withdrawn: "#6b7280"
};

const statusIcon = {
  pending: <FaClock />,
  reviewed: <FaClock />,
  accepted: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
  withdrawn: <FaBan />
};

export default function ApplicantCard({

  application,

  onWithdraw,

  onView,

  onAccept,

  onReject,

  showActions = true

}) {

  if (!application) return null;

  return (

    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 overflow-hidden">

      <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">

        <div>

          <h3 className="font-bold text-lg flex items-center gap-2">

            {icons[application.targetType]}

            {application.targetType.replaceAll("_", " ")}

          </h3>

          <p className="text-sm opacity-70">

            #{application.id}

          </p>

        </div>

        <div
          className="flex items-center gap-2 font-semibold"
          style={{
            color: colors[application.status]
          }}
        >

          {statusIcon[application.status]}

          {application.status}

        </div>

      </div>

      <div className="p-5 space-y-4">

        <div>

          <div className="text-xs uppercase opacity-60">

            Message

          </div>

          <p>

            {application.message || "-"}

          </p>

        </div>

        <div>

          <div className="text-xs uppercase opacity-60">

            Proposal

          </div>

          <p>

            {application.proposal || "-"}

          </p>

        </div>

        <div>

          <div className="text-xs uppercase opacity-60">

            Deliverables

          </div>

          <p>

            {application.deliverables || "-"}

          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <div className="text-xs uppercase opacity-60">

              Proposed Price

            </div>

            <h4 className="font-bold">

              R {application.proposedPrice || 0}

            </h4>

          </div>

          <div>

            <div className="text-xs uppercase opacity-60">

              Submitted

            </div>

            <h4>

              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </h4>

          </div>

        </div>

      </div>

      {showActions && (

        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 flex flex-wrap gap-3">

          <button
            onClick={() => onView?.(application)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
          >

            View

          </button>

          {application.status === "pending" && (

            <>
              <button
                onClick={() => onAccept?.(application)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white"
              >

                Accept

              </button>

              <button
                onClick={() => onReject?.(application)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >

                Reject

              </button>

              <button
                onClick={() => onWithdraw?.(application)}
                className="px-4 py-2 rounded-lg bg-zinc-700 text-white"
              >

                Withdraw

              </button>

            </>
          )}

          <Link
            to={`/applications/${application.id}`}
            className="ml-auto text-blue-600 font-semibold"
          >

            Open →

          </Link>

        </div>

      )}

    </div>

  );

}