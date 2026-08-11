import { useState } from "react";
import PropTypes from "prop-types";
import { ShieldAlert, X } from "lucide-react";
import moderationApi from "../services/moderation.api";

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

export default function BanUserModal({
  open,
  report,
  onClose,
  onCompleted
}) {

  const [actionTaken, setActionTaken] =
    useState("warning");

  const [resolutionNotes, setResolutionNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open || !report) return null;

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await moderationApi.reviewReport(
        report.id,
        {
          actionTaken,
          notes: resolutionNotes
        }
      );

      onCompleted?.();

      onClose();

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Failed to review report."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-lg rounded-xl bg-white dark:bg-zinc-900 shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div className="flex items-center gap-3">

            <ShieldAlert
              className="text-red-600"
              size={22}
            />

            <h2 className="text-lg font-semibold">

              Moderation Action

            </h2>

          </div>

          <button
            onClick={onClose}
          >
            <X />
          </button>

        </div>

        <div className="space-y-5 p-6">

          <div>

            <label className="block mb-2 text-sm font-medium">

              Target

            </label>

            <input
              readOnly
              value={`${report.targetType} : ${report.targetId}`}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">

              Reason

            </label>

            <input
              readOnly
              value={report.reason}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">

              Severity

            </label>

            <input
              readOnly
              value={report.severity}
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">

              Action

            </label>

            <select
              value={actionTaken}
              onChange={(e) =>
                setActionTaken(e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >

              {ACTIONS.map(action => (

                <option
                  key={action.value}
                  value={action.value}
                >

                  {action.label}

                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">

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
              className="w-full rounded-lg border p-3"
              placeholder="Internal moderation notes..."
            />

          </div>

        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >

            Cancel

          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >

            {loading
              ? "Processing..."
              : "Apply Action"}

          </button>

        </div>

      </div>

    </div>

  );

}

BanUserModal.propTypes = {

  open: PropTypes.bool.isRequired,

  report: PropTypes.object,

  onClose: PropTypes.func.isRequired,

  onCompleted: PropTypes.func

};