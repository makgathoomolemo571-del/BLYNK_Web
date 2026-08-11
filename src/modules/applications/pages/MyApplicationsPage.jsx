import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import applicationApi from "../services/application.api";

const STATUS_COLORS = {
  pending: "#f59e0b",
  reviewed: "#3b82f6",
  accepted: "#16a34a",
  rejected: "#dc2626",
  withdrawn: "#6b7280"
};

export default function MyApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      setLoading(true);

      const res = await applicationApi.getMyApplications();

setApplications(res.data || res);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load applications."
      );

    } finally {

      setLoading(false);

    }
  }

  async function withdraw(id) {

    if (
      !window.confirm(
        "Withdraw this application?"
      )
    )
      return;

    try {

      await applicationApi.withdrawApplication(id);

      loadApplications();

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Unable to withdraw."
      );

    }

  }

  if (loading)
    return (
      <div className="p-8">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-600">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <p className="text-zinc-500">
            Creator Hire • Business Find • Marketplace
          </p>

        </div>

      </div>

      {applications.length === 0 && (

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-10 text-center">

          <h2 className="text-xl font-semibold mb-2">
            No Applications
          </h2>

          <p className="text-zinc-500">
            You haven't submitted any applications yet.
          </p>

        </div>

      )}

      <div className="grid lg:grid-cols-2 gap-5">

        {applications.map(app => (

          <div
            key={app.id}
            className="rounded-xl border bg-white dark:bg-zinc-900 p-6 shadow-sm"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold text-lg">
                  {app.targetType.replaceAll("_"," ")}
                </h3>

                <p className="text-sm text-zinc-500">
                  #{app.targetId}
                </p>

              </div>

              <span
                className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                style={{
                  background:
                    STATUS_COLORS[
                      app.status
                    ]
                }}
              >
                {app.status}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              {app.message && (

                <div>

                  <h4 className="font-semibold">
                    Message
                  </h4>

                  <p className="text-sm text-zinc-500">
                    {app.message}
                  </p>

                </div>

              )}

              {app.proposal && (

                <div>

                  <h4 className="font-semibold">
                    Proposal
                  </h4>

                  <p className="text-sm text-zinc-500">
                    {app.proposal}
                  </p>

                </div>

              )}

              {app.deliverables && (

                <div>

                  <h4 className="font-semibold">
                    Deliverables
                  </h4>

                  <p className="text-sm text-zinc-500">
                    {app.deliverables}
                  </p>

                </div>

              )}

              {app.proposedPrice && (

                <div>

                  <h4 className="font-semibold">
                    Proposed Price
                  </h4>

                  <p className="text-green-600 font-bold">
                    R
                    {Number(
                      app.proposedPrice
                    ).toLocaleString()}
                  </p>

                </div>

              )}

            </div>

            <div className="flex gap-3 mt-6">

              <Link
                to={`/applications/${app.id}`}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                View
              </Link>

              {app.status === "pending" && (

                <button
                  onClick={() =>
                    withdraw(app.id)
                  }
                  className="px-4 py-2 rounded-lg bg-red-600 text-white"
                >
                  Withdraw
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}