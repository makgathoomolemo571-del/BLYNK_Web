import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getReports } from "../store/moderationActions";
import {
  selectReports,
  selectLoading,
  selectError
} from "../store/moderationSelectors";

import ReportCard from "../components/ReportCard";

const statusColor = {
  pending: "bg-yellow-500",
  approved: "bg-green-600",
  rejected: "bg-red-600",
  resolved: "bg-blue-600",
  under_review: "bg-purple-600"
};

const severityColor = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-red-600"
};

export default function ReportsPage() {

  const dispatch = useDispatch();

  const reports = useSelector(selectReports);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {

    dispatch(getReports());

  }, [dispatch]);

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />

      </div>

    );

  }

  if (error) {

    return (

      <div className="p-6">

        <div className="rounded-lg bg-red-100 border border-red-300 text-red-700 p-4">

          {error}

        </div>

      </div>

    );

  }

  return (

    <div className="p-6 space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          Moderation Reports

        </h1>

        <div className="text-sm text-gray-500">

          {reports.length} Reports

        </div>

      </div>

      {reports.length === 0 && (

        <div className="rounded-xl bg-white shadow p-10 text-center">

          <h2 className="text-xl font-semibold">

            No Reports Found

          </h2>

        </div>

      )}

      <div className="grid gap-5">

        {reports.map(report => (

          <div
            key={report.id}
            className="rounded-xl border bg-white shadow"
          >

            <div className="flex items-center justify-between border-b p-5">

              <div>

                <div className="font-bold text-lg">

                  {report.targetType.toUpperCase()}

                </div>

                <div className="text-sm text-gray-500">

                  Target ID

                </div>

                <div className="font-mono text-sm">

                  {report.targetId}

                </div>

              </div>

              <div className="flex gap-2">

                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${statusColor[report.status]}`}
                >

                  {report.status}

                </span>

                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${severityColor[report.severity]}`}
                >

                  {report.severity}

                </span>

              </div>

            </div>

            <div className="p-5 space-y-4">

              <div>

                <div className="text-xs text-gray-500">

                  Reason

                </div>

                <div className="font-semibold">

                  {report.reason}

                </div>

              </div>

              <div>

                <div className="text-xs text-gray-500">

                  Action Taken

                </div>

                <div>

                  {report.actionTaken}

                </div>

              </div>

              <div>

                <div className="text-xs text-gray-500">

                  Created

                </div>

                <div>

                  {new Date(report.createdAt).toLocaleString()}

                </div>

              </div>

              {report.reviewedAt && (

                <div>

                  <div className="text-xs text-gray-500">

                    Reviewed

                  </div>

                  <div>

                    {new Date(report.reviewedAt).toLocaleString()}

                  </div>

                </div>

              )}

              <ReportCard report={report} />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}