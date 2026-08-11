import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import businessFindApi from "../services/businessFind.api";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);

      const res =
        await businessFindApi.getMyApplications();

      setApplications(res.data || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">
          My Applications
        </h2>

        <div className="mt-6">
          Loading applications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">

        <h2 className="text-2xl font-semibold">
          My Applications
        </h2>

        <div className="mt-6 rounded-lg bg-red-100 text-red-700 p-4">
          {error}
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <button
          onClick={loadApplications}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Refresh
        </button>

      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">

          <h3 className="text-xl font-semibold mb-2">
            No Applications Found
          </h3>

          <p className="text-gray-500">
            You haven't applied for any campaigns yet.
          </p>

        </div>
      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {applications.map((item) => (

            <div
              key={item.id}
              className="rounded-xl border bg-white shadow-sm p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-semibold">
                    {item.campaignName}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {item.businessName}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <div className="mt-5 space-y-2 text-sm">

                <p>
                  <strong>Industry:</strong>{" "}
                  {item.industry}
                </p>

                <p>
                  <strong>Budget:</strong>{" "}
                  {item.campaignBudget}
                </p>

                <p>
                  <strong>Compensation:</strong>{" "}
                  {item.compensationType}
                </p>

                <p>
                  <strong>Audience:</strong>{" "}
                  {item.targetAudience}
                </p>

              </div>

              <div className="mt-6 flex justify-end">

                <Link
                  to={`/business-find/${item.id}`}
                  className="px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800"
                >
                  View Campaign
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyApplicationsPage;