// modules/verification/pages/VerificationPage.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CircleCheck,
  CircleX,
  Clock3,
  Loader2,
  BadgeCheck,
  Building2,
  Podcast,
  UserSquare2,
  Landmark,
} from "lucide-react";

import verificationApi from "../services/verification.api";

const TYPE_ICON = {
  identity: <UserSquare2 size={18} />,
  creator: <BadgeCheck size={18} />,
  business: <Building2 size={18} />,
  venue: <Landmark size={18} />,
  podcast: <Podcast size={18} />,
};

const STATUS_COLOR = {
  submitted:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

  under_review:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

  approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

  rejected:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const STATUS_ICON = {
  submitted: <Clock3 size={16} />,
  under_review: <Loader2 size={16} className="animate-spin" />,
  approved: <CircleCheck size={16} />,
  rejected: <CircleX size={16} />,
};

export default function VerificationPage() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadVerification();
  }, []);

  async function loadVerification() {
    try {
      setLoading(true);

      const res = await verificationApi.getMine();

      setRecords(res.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to load verification."
      );
    } finally {
      setLoading(false);
    }
  }

  const latest = useMemo(() => {
    if (!records.length) return null;

    return records[0];
  }, [records]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          className="animate-spin text-blue-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">

      <div className="mb-8 flex items-center gap-3">

        <ShieldCheck
          className="text-blue-600"
          size={34}
        />

        <div>

          <h1 className="text-3xl font-bold">
            Verification
          </h1>

          <p className="text-zinc-500">
            Verify your account to unlock
            premium platform features.
          </p>

        </div>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {!latest ? (
        <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-8">

          <div className="mb-8 flex items-center gap-3">

            <ShieldCheck
              size={28}
              className="text-blue-600"
            />

            <div>

              <h2 className="text-xl font-semibold">
                No Verification Submitted
              </h2>

              <p className="text-zinc-500 mt-1">
                Apply for verification to
                receive a verified badge.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              navigate("/verification/apply")
            }
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Apply For Verification
          </button>

        </div>
      ) : (
        <>

          <div className="rounded-2xl border bg-white dark:bg-zinc-900 p-6 mb-8">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <div className="flex items-center gap-2">

                  {TYPE_ICON[latest.type]}

                  <h2 className="text-2xl font-bold capitalize">
                    {latest.type}
                  </h2>

                </div>

                <p className="mt-2 text-zinc-500">
                  {latest.fullName}
                </p>

              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium ${STATUS_COLOR[latest.status]}`}
              >
                {STATUS_ICON[latest.status]}
                {latest.status.replace("_", " ")}
              </div>

            </div>

          </div>

          {latest.status === "rejected" &&
            latest.rejectionReason && (

              <div className="mb-8 rounded-xl border border-red-300 bg-red-50 p-5">

                <h3 className="mb-2 font-semibold text-red-700">
                  Rejection Reason
                </h3>

                <p className="text-red-600">
                  {latest.rejectionReason}
                </p>

              </div>

            )}

          <div className="overflow-hidden rounded-2xl border">

            <table className="w-full">

              <thead className="bg-zinc-100 dark:bg-zinc-800">

                <tr>

                  <th className="p-4 text-left">
                    Type
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Submitted
                  </th>

                  <th className="p-4 text-left">
                    Reviewed
                  </th>

                </tr>

              </thead>

              <tbody>

                {records.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-4 capitalize">
                      {item.type}
                    </td>

                    <td className="p-4 capitalize">
                      {item.status.replace("_", " ")}
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {item.reviewedAt
                        ? new Date(
                            item.reviewedAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </>
      )}

    </div>
  );
}