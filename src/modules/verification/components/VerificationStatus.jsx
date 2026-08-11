// modules/verification/components/VerificationStatus.jsx

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  ShieldCheck,
  ShieldAlert,
  Clock3,
  XCircle,
} from "lucide-react";

const STATUS = {
  submitted: {
    icon: Clock3,
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-300 dark:border-amber-800",
    label: "Submitted",
  },

  under_review: {
    icon: Clock3,
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-300 dark:border-blue-800",
    label: "Under Review",
  },

  approved: {
    icon: ShieldCheck,
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-300 dark:border-green-800",
    label: "Approved",
  },

  rejected: {
    icon: XCircle,
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-300 dark:border-red-800",
    label: "Rejected",
  },
};

const VerificationStatus = ({ verification }) => {
  if (!verification) return null;

  const config =
    STATUS[verification.status] ||
    {
      icon: ShieldAlert,
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-300",
      label: verification.status,
    };

  const Icon = config.icon;

  return (
    <section className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">

      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Verification Status
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              Track your verification request.
            </p>

          </div>

          <div
            className={`
              flex items-center gap-2
              px-4 py-2
              rounded-full
              border
              ${config.bg}
              ${config.text}
              ${config.border}
            `}
          >
            <Icon size={18} />

            <span className="font-semibold">
              {config.label}
            </span>
          </div>

        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-5">

          <div>

            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Verification Type
            </label>

            <p className="mt-1 text-zinc-900 dark:text-white font-medium capitalize">
              {verification.type}
            </p>

          </div>

          <div>

            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Full Name
            </label>

            <p className="mt-1 text-zinc-900 dark:text-white font-medium">
              {verification.fullName || "-"}
            </p>

          </div>

          <div>

            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Submitted
            </label>

            <p className="mt-1 text-zinc-900 dark:text-white">
              {new Date(
                verification.createdAt
              ).toLocaleString()}
            </p>

          </div>

          <div>

            <label className="text-xs uppercase tracking-wide text-zinc-500">
              Reviewed
            </label>

            <p className="mt-1 text-zinc-900 dark:text-white">
              {verification.reviewedAt
                ? new Date(
                    verification.reviewedAt
                  ).toLocaleString()
                : "-"}
            </p>

          </div>

        </div>

        {verification.status === "rejected" &&
          verification.rejectionReason && (

            <div className="mt-8 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-5">

              <h3 className="font-semibold text-red-700 dark:text-red-400">
                Rejection Reason
              </h3>

              <p className="mt-2 text-red-600 dark:text-red-300">
                {verification.rejectionReason}
              </p>

            </div>

        )}

        {verification.status === "approved" && (

          <div className="mt-8 rounded-xl border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-5">

            <h3 className="font-semibold text-green-700 dark:text-green-400">
              Verification Approved
            </h3>

            <p className="mt-2 text-green-600 dark:text-green-300">
              Congratulations. Your account has been successfully verified.
            </p>

          </div>

        )}

      </div>

    </section>
  );
};

VerificationStatus.propTypes = {

  verification: PropTypes.shape({

    id: PropTypes.string,

    type: PropTypes.string,

    status: PropTypes.string,

    fullName: PropTypes.string,

    reviewedAt: PropTypes.string,

    rejectionReason: PropTypes.string,

    createdAt: PropTypes.string,

  }).isRequired,

};

export default memo(VerificationStatus);