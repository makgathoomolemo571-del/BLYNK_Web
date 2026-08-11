import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Ticket,
} from "lucide-react";

import { fetchMyTickets } from "../store/supportSlice";
import {
  selectSupportLoading,
  selectSupportTickets,
  selectSupportError,
} from "../store/supportSelectors";

const statusColor = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  awaiting_user: "bg-orange-100 text-orange-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-zinc-200 text-zinc-700",
};

export default function SupportDashboard() {
  const dispatch = useDispatch();

  const tickets = useSelector(selectSupportTickets);
  console.log("REDUX TICKETS:", tickets);
  const loading = useSelector(selectSupportLoading);
  const error = useSelector(selectSupportError);

  useEffect(() => {
    dispatch(fetchMyTickets());
  }, [dispatch]);

  const stats = {
    total: tickets.length,
    open: tickets.filter((x) => x.status === "open").length,
    progress: tickets.filter(
      (x) => x.status === "in_progress"
    ).length,
    resolved: tickets.filter(
      (x) => x.status === "resolved"
    ).length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      <div className="flex items-center justify-between">

  <div>

    <h1 className="text-3xl font-bold">
      Support Dashboard
    </h1>

    <p className="text-zinc-500 mt-2">
      Track your BLYNK support tickets.
    </p>

  </div>

  <Link
    to="/support/create"
    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
  >
    + Create Ticket
  </Link>

</div>
      <div className="grid md:grid-cols-4 gap-5">

        <div className="rounded-xl bg-white shadow border p-5">
          <Ticket className="mb-3 text-blue-600" />
          <h2 className="text-3xl font-bold">
            {stats.total}
          </h2>
          <p className="text-zinc-500">
            Total Tickets
          </p>
        </div>

        <div className="rounded-xl bg-white shadow border p-5">
          <AlertCircle className="mb-3 text-red-500" />
          <h2 className="text-3xl font-bold">
            {stats.open}
          </h2>
          <p className="text-zinc-500">
            Open
          </p>
        </div>

        <div className="rounded-xl bg-white shadow border p-5">
          <Clock3 className="mb-3 text-yellow-600" />
          <h2 className="text-3xl font-bold">
            {stats.progress}
          </h2>
          <p className="text-zinc-500">
            In Progress
          </p>
        </div>

        <div className="rounded-xl bg-white shadow border p-5">
          <CheckCircle2 className="mb-3 text-green-600" />
          <h2 className="text-3xl font-bold">
            {stats.resolved}
          </h2>
          <p className="text-zinc-500">
            Resolved
          </p>
        </div>

      </div>

      <div className="rounded-xl bg-white shadow border">

        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-semibold">
            My Tickets
          </h2>
        </div>

        {loading && (
          <div className="p-8 text-center">
            Loading tickets...
          </div>
        )}

        {error && (
          <div className="p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && tickets.length === 0 && (
          <div className="p-10 text-center">

  <h2 className="text-2xl font-bold">
    No Support Tickets
  </h2>

  <p className="text-zinc-500 mt-2 mb-6">
    You haven't created any support requests yet.
  </p>

  <Link
    to="/support/create"
    className="inline-flex px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
  >
    Create Your First Ticket
  </Link>

</div>
        )}

        {!loading &&
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="px-6 py-5 border-b last:border-none hover:bg-zinc-50 transition"
            >
              <div className="flex justify-between items-start">

                <div>

                  <h3 className="font-semibold">
                    {ticket.subject}
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    {ticket.ticketNumber}
                  </p>

                  <div className="flex gap-2 mt-3">

                    <span className="px-3 py-1 rounded-full bg-zinc-100 text-xs font-medium">
                      {ticket.issueType}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColor[ticket.status]
                      }`}
                    >
                      {ticket.status.replace(
                        "_",
                        " "
                      )}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                      {ticket.priority}
                    </span>

                  </div>

                </div>

                <div className="text-right">

                  <div className="text-sm text-zinc-500">
                    Created
                  </div>

                  <div className="font-medium">
                    {new Date(
                      ticket.createdAt
                    ).toLocaleDateString()}
                  </div>

                </div>
<div className="flex justify-end mt-5">

  <Link
    to={`/support/ticket/${ticket.id}`}
    className="px-5 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800"
  >
    View Ticket
  </Link>

</div>
              </div>
            </div>
          ))}

      </div>

    </div>
  );
}