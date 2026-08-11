import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchReports,
  approveReport,
  rejectReport,
  reviewReport
} from "../store/moderationActions";

import {
  selectReports,
  selectLoading
} from "../store/moderationSelectors";

const badgeColor = (status) => {
  switch (status) {
    case "resolved":
      return "bg-green-100 text-green-700";

    case "approved":
      return "bg-blue-100 text-blue-700";

    case "rejected":
      return "bg-red-100 text-red-700";

    case "under_review":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const severityColor = (severity) => {
  switch (severity) {
    case "critical":
      return "bg-red-600 text-white";

    case "high":
      return "bg-orange-500 text-white";

    case "medium":
      return "bg-yellow-500 text-white";

    default:
      return "bg-green-500 text-white";
  }
};

export default function UsersModerationPage() {

  const dispatch = useDispatch();

  const reports =
    useSelector(selectReports);

  const loading =
    useSelector(selectLoading);

  useEffect(() => {

    dispatch(fetchReports());

  }, [dispatch]);

  const approve = (id) => {

    dispatch(
      approveReport(id)
    );

  };

  const reject = (id) => {

    dispatch(
      rejectReport(id)
    );

  };

  const review = (
    id,
    actionTaken
  ) => {

    dispatch(
      reviewReport({
        reportId: id,
        actionTaken,
        notes: ""
      })
    );

  };

  return (

    <div className="p-6">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold">
          User Moderation
        </h1>

        <button
          onClick={() => dispatch(fetchReports())}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Refresh
        </button>

      </div>

      {loading && (

        <div className="text-center py-16">
          Loading reports...
        </div>

      )}

      {!loading && (

        <div className="overflow-auto rounded-xl border bg-white">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Target
                </th>

                <th className="text-left p-4">
                  Reason
                </th>

                <th className="text-left p-4">
                  Severity
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>

                <th className="text-left p-4">
                  Reported
                </th>

                <th className="text-right p-4">
                  Controls
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.map((report) => (

                <tr
                  key={report.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">

                    <div className="font-semibold capitalize">

                      {report.targetType}

                    </div>

                    <div className="text-sm text-gray-500">

                      {report.targetId}

                    </div>

                  </td>

                  <td className="p-4 capitalize">

                    {report.reason}

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${severityColor(report.severity)}`}
                    >
                      {report.severity}
                    </span>

                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${badgeColor(report.status)}`}
                    >
                      {report.status}
                    </span>

                  </td>

                  <td className="p-4 capitalize">

                    {report.actionTaken}

                  </td>

                  <td className="p-4 text-sm">

                    {new Date(
                      report.createdAt
                    ).toLocaleString()}

                  </td>

                  <td className="p-4">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => approve(report.id)}
                        className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(report.id)}
                        className="px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-800"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          review(
                            report.id,
                            "warning"
                          )
                        }
                        className="px-3 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        Warn
                      </button>

                      <button
                        onClick={() =>
                          review(
                            report.id,
                            "remove_content"
                          )
                        }
                        className="px-3 py-2 rounded bg-orange-600 text-white hover:bg-orange-700"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() =>
                          review(
                            report.id,
                            "suspend_user"
                          )
                        }
                        className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                      >
                        Suspend
                      </button>

                      <button
                        onClick={() =>
                          review(
                            report.id,
                            "ban_user"
                          )
                        }
                        className="px-3 py-2 rounded bg-black text-white hover:bg-zinc-800"
                      >
                        Ban
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}