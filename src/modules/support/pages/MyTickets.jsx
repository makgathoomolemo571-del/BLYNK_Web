import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa";

import { getMyTickets } from "../store/supportActions";
import { selectMyTickets } from "../store/supportSelectors";

const badgeColor = (status) => {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-700";

    case "in_progress":
      return "bg-yellow-100 text-yellow-700";

    case "awaiting_user":
      return "bg-purple-100 text-purple-700";

    case "resolved":
      return "bg-green-100 text-green-700";

    case "closed":
      return "bg-gray-200 text-gray-700";

    default:
      return "bg-zinc-100 text-zinc-700";
  }
};

const priorityColor = (priority) => {
  switch (priority) {
    case "low":
      return "text-green-600";

    case "medium":
      return "text-yellow-600";

    case "high":
      return "text-orange-600";

    case "urgent":
      return "text-red-600";

    default:
      return "text-zinc-600";
  }
};

export default function MyTickets() {
  const dispatch = useDispatch();

  const {
    tickets,
    loading,
    error
  } = useSelector(selectMyTickets);

  useEffect(() => {
    dispatch(getMyTickets());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full py-24 flex justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-5 flex items-center gap-3">
        <FiAlertCircle
          size={24}
          className="text-red-600"
        />

        <span className="text-red-700">
          {error}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <div>
        <h1 className="text-3xl font-bold">
          My Support Tickets
        </h1>

        <p className="text-zinc-500 mt-1">
          Track all support requests.
        </p>
      </div>

      {tickets.length === 0 && (

        <div className="bg-white rounded-xl shadow border p-16 flex flex-col items-center">

          <FaTicketAlt
            className="text-zinc-300 mb-5"
            size={60}
          />

          <h2 className="text-xl font-semibold">
            No tickets found
          </h2>

          <p className="text-zinc-500 mt-2">
            You haven't created any support tickets yet.
          </p>

        </div>

      )}

      {tickets.map(ticket => (

        <div
          key={ticket.id}
          className="bg-white rounded-xl border shadow-sm p-6 hover:shadow transition"
        >

          <div className="flex justify-between items-start">

            <div>

              <h2 className="font-bold text-lg">
                {ticket.subject}
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                {ticket.ticketNumber}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor(ticket.status)}`}
            >
              {ticket.status.replaceAll("_", " ")}
            </span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">

            <div>

              <p className="text-xs uppercase text-zinc-400">
                Issue
              </p>

              <p className="font-medium">
                {ticket.issueType}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-zinc-400">
                Priority
              </p>

              <p
                className={`font-semibold ${priorityColor(ticket.priority)}`}
              >
                {ticket.priority}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-zinc-400">
                Assigned
              </p>

              <p>
                {ticket.assignedAgent || "-"}
              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-zinc-400">
                Updated
              </p>

              <p>
                {new Date(
                  ticket.updatedAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}