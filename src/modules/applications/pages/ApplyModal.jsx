import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { createApplication } from "../services/application.api";

export default function ApplyModal({
  open,
  onClose,
  targetType,
  targetId,
  onCreated
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    message: "",

    proposal: "",

    deliverables: "",

    proposedPrice: "",

    portfolioLinks: "",

    attachments: ""

  });

  if (!open) return null;

  const change = (e) => {

    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  };

  const submit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {

        targetType,

        targetId,

        message: form.message,

        proposal: form.proposal,

        deliverables: form.deliverables,

        proposedPrice: Number(form.proposedPrice),

        portfolioLinks: form.portfolioLinks
          ? form.portfolioLinks
              .split(",")
              .map(i => i.trim())
          : [],

        attachments: form.attachments
          ? form.attachments
              .split(",")
              .map(i => i.trim())
          : []

      };

      const res =
        await createApplication(payload);

      onCreated?.(res);

      onClose();

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Unable to submit application."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">

      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-2xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-2xl font-bold">
            Submit Application
          </h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <form
          onSubmit={submit}
          className="p-6 space-y-5"
        >

          <div>

            <label className="font-semibold">
              Message
            </label>

            <textarea
              rows="3"
              name="message"
              value={form.message}
              onChange={change}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Proposal
            </label>

            <textarea
              rows="5"
              name="proposal"
              value={form.proposal}
              onChange={change}
              className="w-full border rounded-lg p-3 mt-2"
              required
            />

          </div>

          <div>

            <label className="font-semibold">
              Deliverables
            </label>

            <textarea
              rows="4"
              name="deliverables"
              value={form.deliverables}
              onChange={change}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              Proposed Price (ZAR)
            </label>

            <input
              type="number"
              name="proposedPrice"
              value={form.proposedPrice}
              onChange={change}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              Portfolio Links
            </label>

            <textarea
              rows="3"
              name="portfolioLinks"
              value={form.portfolioLinks}
              onChange={change}
              placeholder="https://..., https://..."
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              Attachments
            </label>

            <textarea
              rows="3"
              name="attachments"
              value={form.attachments}
              onChange={change}
              placeholder="https://..., https://..."
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-purple-700 text-white"
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}