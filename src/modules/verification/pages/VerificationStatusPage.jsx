// modules/verification/pages/VerificationStatusPage.jsx

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BadgeCheck,
  Clock3,
  FileText,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import useVerification from "../hooks/useVerification";

const STATUS = {
  submitted: {
    icon: <Clock3 size={20} />,
    color:
      "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-700",
    title: "Submitted",
  },

  under_review: {
    icon: <FileText size={20} />,
    color:
      "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-700",
    title: "Under Review",
  },

  approved: {
    icon: <BadgeCheck size={20} />,
    color:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-500/10 dark:text-green-400 dark:border-green-700",
    title: "Approved",
  },

  rejected: {
    icon: <XCircle size={20} />,
    color:
      "bg-red-100 text-red-700 border-red-300 dark:bg-red-500/10 dark:text-red-400 dark:border-red-700",
    title: "Rejected",
  },
};

const VerificationStatusPage = () => {
  const {
    getMine,
    loading,
  } = useVerification();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await getMine();
      setRecords(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  const latest = useMemo(() => {
    if (!records.length) return null;
    return records[0];
  }, [records]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!latest) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow border border-zinc-200 dark:border-zinc-800 p-8">

          <div className="flex items-center gap-3 mb-5">
            <ShieldCheck
              className="text-blue-600"
              size={28}
            />

            <h1 className="text-2xl font-bold">
              Verification
            </h1>
          </div>

          <div className="flex flex-col items-center py-16">

            <AlertCircle
              size={60}
              className="text-zinc-400 mb-5"
            />

            <h2 className="text-xl font-semibold">
              No Verification Request
            </h2>

            <p className="text-zinc-500 mt-3">
              You haven't submitted any
              verification request yet.
            </p>

          </div>

        </div>
      </div>
    );
  }

  const status =
    STATUS[latest.status];

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow border border-zinc-200 dark:border-zinc-800 overflow-hidden">

        <div className="px-8 py-7 border-b border-zinc-200 dark:border-zinc-800">

          <h1 className="text-3xl font-bold">
            Verification Status
          </h1>

          <p className="text-zinc-500 mt-2">
            Track your latest verification
            request.
          </p>

        </div>

        <div className="p-8">

          <div
            className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border ${status.color}`}
          >
            {status.icon}

            <span className="font-semibold">
              {status.title}
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>

              <p className="text-zinc-500 text-sm">
                Verification Type
              </p>

              <h3 className="text-lg font-semibold capitalize mt-1">
                {latest.type.replace("_", " ")}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Full Name
              </p>

              <h3 className="text-lg font-semibold mt-1">
                {latest.fullName}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Submitted
              </p>

              <h3 className="text-lg font-semibold mt-1">
                {new Date(
                  latest.createdAt
                ).toLocaleString()}
              </h3>

            </div>

            <div>

              <p className="text-zinc-500 text-sm">
                Reviewed At
              </p>

              <h3 className="text-lg font-semibold mt-1">
                {latest.reviewedAt
                  ? new Date(
                      latest.reviewedAt
                    ).toLocaleString()
                  : "-"}
              </h3>

            </div>

          </div>

          {latest.status ===
            "approved" && (
            <div className="mt-10 rounded-xl border border-green-300 bg-green-50 dark:bg-green-500/10 dark:border-green-700 p-6">

              <div className="flex gap-3">

                <BadgeCheck
                  className="text-green-600"
                />

                <div>

                  <h3 className="font-bold text-green-700 dark:text-green-400">
                    Verification Approved
                  </h3>

                  <p className="mt-2 text-green-700 dark:text-green-300">
                    Congratulations.
                    Your account has been
                    successfully verified.
                  </p>

                </div>

              </div>

            </div>
          )}

          {latest.status ===
            "under_review" && (
            <div className="mt-10 rounded-xl border border-blue-300 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-700 p-6">

              <div className="flex gap-3">

                <Clock3
                  className="text-blue-600"
                />

                <div>

                  <h3 className="font-bold text-blue-700 dark:text-blue-400">
                    Verification In Progress
                  </h3>

                  <p className="mt-2">
                    Our team is reviewing
                    your documents.
                  </p>

                </div>

              </div>

            </div>
          )}

          {latest.status ===
            "submitted" && (
            <div className="mt-10 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-700 p-6">

              <div className="flex gap-3">

                <FileText
                  className="text-amber-600"
                />

                <div>

                  <h3 className="font-bold">
                    Request Submitted
                  </h3>

                  <p className="mt-2">
                    Your request has been
                    received and is waiting
                    to be reviewed.
                  </p>

                </div>

              </div>

            </div>
          )}

          {latest.status ===
            "rejected" && (
            <div className="mt-10 rounded-xl border border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-700 p-6">

              <div className="flex gap-3">

                <XCircle
                  className="text-red-600"
                />

                <div>

                  <h3 className="font-bold text-red-700 dark:text-red-400">
                    Verification Rejected
                  </h3>

                  <p className="mt-2">
                    {latest.rejectionReason ||
                      "No reason was provided."}
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default VerificationStatusPage;