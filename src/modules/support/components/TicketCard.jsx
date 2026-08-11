import React from "react";
import PropTypes from "prop-types";
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  CheckCircle2,
  User,
  Calendar,
  Hash,
} from "lucide-react";

const priorityColor = {
  low: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200",
};

const statusColor = {
  open: "bg-blue-100 text-blue-700 border-blue-200",
  in_progress: "bg-purple-100 text-purple-700 border-purple-200",
  awaiting_user: "bg-yellow-100 text-yellow-700 border-yellow-200",
  resolved: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

const priorityIcon = {
  low: <CheckCircle2 size={16} />,
  medium: <Clock size={16} />,
  high: <AlertTriangle size={16} />,
  urgent: <AlertCircle size={16} />,
};

const formatStatus = (status) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const TicketCard = ({
  ticket,
  onOpen,
}) => {
  return (
    <div
      onClick={() => onOpen?.(ticket)}
      className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
            {ticket.subject}
          </h3>

          <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
            <Hash size={14} />
            {ticket.ticketNumber}
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            priorityColor[ticket.priority]
          }`}
        >
          <span className="flex items-center gap-1">
            {priorityIcon[ticket.priority]}
            {ticket.priority.toUpperCase()}
          </span>
        </span>
      </div>

      <div className="space-y-3">

        <div className="flex justify-between">

          <span className="text-sm text-zinc-500">
            Issue Type
          </span>

          <span className="font-medium capitalize">
            {ticket.issueType}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm text-zinc-500">
            Status
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              statusColor[ticket.status]
            }`}
          >
            {formatStatus(ticket.status)}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm text-zinc-500">
            Assigned
          </span>

          <span className="flex items-center gap-2">
            <User size={15} />

            {ticket.assignedAgent
              ? ticket.assignedAgent
              : "Unassigned"}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm text-zinc-500">
            Created
          </span>

          <span className="flex items-center gap-2">
            <Calendar size={15} />

            {new Date(
              ticket.createdAt
            ).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-sm text-zinc-500">
            Updated
          </span>

          <span>
            {new Date(
              ticket.updatedAt
            ).toLocaleString()}
          </span>

        </div>

      </div>
    </div>
  );
};

TicketCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ticketNumber: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    issueType: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    assignedAgent: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,

  onOpen: PropTypes.func,
};

export default React.memo(TicketCard);