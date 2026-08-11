import React from "react";
import PropTypes from "prop-types";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  AlertTriangle,
  Flag,
  Ban,
  Trash2,
  UserX,
} from "lucide-react";

const severityColor = {
  low: "bg-green-100 text-green-700 border-green-300",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
  high: "bg-orange-100 text-orange-700 border-orange-300",
  critical: "bg-red-100 text-red-700 border-red-300",
};

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  resolved: "bg-gray-200 text-gray-700",
};

const actionIcon = {
  none: <Flag size={16} />,
  warning: <AlertTriangle size={16} />,
  remove_content: <Trash2 size={16} />,
  suspend_user: <UserX size={16} />,
  ban_user: <Ban size={16} />,
};

const statusIcon = {
  pending: <ShieldAlert size={18} />,
  approved: <ShieldCheck size={18} />,
  rejected: <ShieldX size={18} />,
  under_review: <ShieldAlert size={18} />,
  resolved: <ShieldCheck size={18} />,
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleString()
    : "-";

const ReportCard = ({
  report,
  onOpen,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all">

      <div className="flex justify-between items-center border-b p-5">

        <div>

          <h3 className="font-bold text-lg">
            {report.targetType.toUpperCase()}
          </h3>

          <p className="text-sm text-gray-500">
            #{report.id}
          </p>

        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusColor[
            report.status
          ]}`}
        >
          {statusIcon[report.status]}
          <span className="capitalize">
            {report.status.replace(
              "_",
              " "
            )}
          </span>
        </div>

      </div>

      <div className="p-5 space-y-4">

        <div className="grid grid-cols-2 gap-3">

          <div>

            <p className="text-xs text-gray-400">
              Target
            </p>

            <p className="font-medium">
              {report.targetId}
            </p>

          </div>

          <div>

            <p className="text-xs text-gray-400">
              Reason
            </p>

            <p className="font-medium capitalize">
              {report.reason.replace(
                "_",
                " "
              )}
            </p>

          </div>

        </div>

        <div>

          <span
            className={`inline-flex px-3 py-1 rounded-full border text-sm capitalize ${
              severityColor[
                report.severity
              ]
            }`}
          >
            {report.severity}
          </span>

        </div>

        <div>

          <p className="text-xs text-gray-400 mb-1">
            Action Taken
          </p>

          <div className="flex items-center gap-2 font-medium capitalize">

            {
              actionIcon[
                report.actionTaken
              ]
            }

            {report.actionTaken.replace(
              "_",
              " "
            )}

          </div>

        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>

            <p className="text-xs text-gray-400">
              Reported
            </p>

            <p className="text-sm">
              {formatDate(
                report.createdAt
              )}
            </p>

          </div>

          <div>

            <p className="text-xs text-gray-400">
              Reviewed
            </p>

            <p className="text-sm">
              {formatDate(
                report.reviewedAt
              )}
            </p>

          </div>

        </div>

      </div>

      <div className="border-t p-4 flex justify-end">

        <button
          onClick={() =>
            onOpen(report)
          }
          className="rounded-lg bg-black text-white px-5 py-2 hover:bg-gray-800 transition"
        >
          View Report
        </button>

      </div>

    </div>
  );
};

ReportCard.propTypes = {
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    targetType: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    actionTaken: PropTypes.string.isRequired,
    reviewedAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,

  onOpen: PropTypes.func,
};

ReportCard.defaultProps = {
  onOpen: () => {},
};

export default React.memo(ReportCard);