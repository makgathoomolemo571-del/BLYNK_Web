// modules/support/components/TicketList.jsx

import { memo } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

const STATUS_COLORS = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  awaiting_user: "bg-orange-100 text-orange-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-200 text-gray-700"
};

const PRIORITY_COLORS = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-orange-600",
  urgent: "text-red-600"
};

function TicketList({
  tickets = [],
  loading = false,
  onSelect
}) {
  if (loading) {
    return (
      <div className="w-full rounded-xl bg-white shadow p-6 text-center">
        Loading support tickets...
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="w-full rounded-xl bg-white shadow p-6 text-center text-gray-500">
        No support tickets found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-white shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-4 py-3 text-left">
              Ticket
            </th>

            <th className="px-4 py-3 text-left">
              Subject
            </th>

            <th className="px-4 py-3 text-left">
              Issue
            </th>

            <th className="px-4 py-3 text-left">
              Priority
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Assigned
            </th>

            <th className="px-4 py-3 text-left">
              Updated
            </th>

          </tr>

        </thead>

        <tbody>

          {tickets.map(ticket => (

            <tr
              key={ticket.id}
              onClick={() => onSelect?.(ticket)}
              className="cursor-pointer border-b hover:bg-gray-50 transition"
            >

              <td className="px-4 py-4 font-semibold">
                {ticket.ticketNumber}
              </td>

              <td className="px-4 py-4">
                {ticket.subject}
              </td>

              <td className="px-4 py-4 capitalize">
                {ticket.issueType.replaceAll("_", " ")}
              </td>

              <td
                className={`px-4 py-4 font-semibold ${
                  PRIORITY_COLORS[ticket.priority]
                }`}
              >
                {ticket.priority}
              </td>

              <td className="px-4 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    STATUS_COLORS[ticket.status]
                  }`}
                >
                  {ticket.status.replaceAll("_", " ")}
                </span>

              </td>

              <td className="px-4 py-4">
                {ticket.assignedAgent || "-"}
              </td>

              <td className="px-4 py-4 whitespace-nowrap">
                {ticket.updatedAt
                  ? format(
                      new Date(ticket.updatedAt),
                      "dd MMM yyyy HH:mm"
                    )
                  : "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

TicketList.propTypes = {

  tickets: PropTypes.arrayOf(

    PropTypes.shape({

      id: PropTypes.string.isRequired,

      ticketNumber: PropTypes.string.isRequired,

      subject: PropTypes.string.isRequired,

      issueType: PropTypes.string.isRequired,

      priority: PropTypes.string.isRequired,

      status: PropTypes.string.isRequired,

      assignedAgent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ]),

      createdAt: PropTypes.string,

      updatedAt: PropTypes.string

    })

  ),

  loading: PropTypes.bool,

  onSelect: PropTypes.func

};

export default memo(TicketList);