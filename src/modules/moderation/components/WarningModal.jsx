import { useState } from "react";
import PropTypes from "prop-types";
import {
  AlertTriangle,
  ShieldAlert,
  X,
} from "lucide-react";

const ACTIONS = [
  {
    value: "warning",
    label: "Issue Warning"
  },
  {
    value: "remove_content",
    label: "Remove Content"
  },
  {
    value: "suspend_user",
    label: "Suspend User"
  },
  {
    value: "ban_user",
    label: "Ban User"
  }
];

export default function WarningModal({
  open,
  report,
  loading,
  onClose,
  onSubmit,
}) {
  const [actionTaken, setActionTaken] =
    useState("warning");

  const [resolutionNotes, setResolutionNotes] =
    useState("");

  if (!open || !report) return null;

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      reportId: report.id,
      actionTaken,
      notes: resolutionNotes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-neutral-900">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div className="flex items-center gap-3">

            <ShieldAlert className="h-6 w-6 text-red-600" />

            <div>

              <h2 className="text-lg font-bold">
                Review Moderation Report
              </h2>

              <p className="text-sm text-neutral-500">
                Report #{report.id}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X size={20} />
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div className="rounded-xl border bg-neutral-50 p-4 dark:bg-neutral-950">

            <div className="grid gap-2 text-sm">

              <div>
                <strong>Target</strong> : {report.targetType}
              </div>

              <div>
                <strong>Target ID</strong> : {report.targetId}
              </div>

              <div>
                <strong>Reason</strong> : {report.reason}
              </div>

              <div>
                <strong>Severity</strong> : {report.severity}
              </div>

              <div>
                <strong>Status</strong> : {report.status}
              </div>

            </div>

          </div>

          {report.severity === "critical" && (

            <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">

              <AlertTriangle size={18} />

              Critical report requires immediate action.

            </div>

          )}

          <form
            onSubmit={submit}
            className="space-y-5"
          >

            <div>

              <label className="mb-2 block font-medium">
                Moderation Action
              </label>

              <select
                value={actionTaken}
                onChange={(e) =>
                  setActionTaken(e.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
              >

                {ACTIONS.map((item) => (

                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Resolution Notes
              </label>

              <textarea
                rows={5}
                value={resolutionNotes}
                onChange={(e) =>
                  setResolutionNotes(
                    e.target.value
                  )
                }
                className="w-full resize-none rounded-xl border px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Describe the moderation decision..."
              />

            </div>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border px-5 py-3"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                type="submit"
                className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : "Apply Action"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

WarningModal.propTypes = {

  open: PropTypes.bool.isRequired,

  loading: PropTypes.bool,

  onClose: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  report: PropTypes.shape({

    id: PropTypes.string,

    targetType: PropTypes.string,

    targetId: PropTypes.string,

    reason: PropTypes.string,

    severity: PropTypes.string,

    status: PropTypes.string,

  }),

};

WarningModal.defaultProps = {

  loading: false,

  report: null,

};