import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Loader2, Send } from "lucide-react";
import supportApi from "../services/support.api";

const ISSUE_TYPES = [
  "technical",
  "account",
  "login",
  "subscription",
  "payment",
  "creator",
  "business",
  "marketplace",
  "wallet",
  "verification",
  "security",
  "other"
];

const PRIORITIES = [
  "low",
  "medium",
  "high",
  "urgent"
];

export default function TicketForm() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({

    subject: "",

    issueType: "technical",

    priority: "medium",

    affectedFeature: "",

    description: ""

  });

  const update = (e) => {

    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const submit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    if (!form.subject.trim())
      return setError("Subject is required.");

    if (!form.description.trim())
      return setError("Description is required.");

    try {

      setLoading(true);

      const { data } =
        await supportApi.createTicket(form);

      setSuccess(
        `Ticket ${data.ticketNumber} created successfully.`
      );

      navigate("/support/my-tickets");

    } catch (err) {

      setError(

        err?.response?.data?.message ||

        "Unable to create support ticket."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form

      onSubmit={submit}

      className="space-y-6 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 p-6"

    >

      <div>

        <h2 className="text-2xl font-bold">

          Create Support Ticket

        </h2>

        <p className="text-sm text-zinc-500 mt-1">

          Tell us about your issue.

        </p>

      </div>

      {error && (

        <div className="flex items-center gap-2 rounded-lg bg-red-50 text-red-700 p-3">

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>

      )}

      {success && (

        <div className="rounded-lg bg-green-50 text-green-700 p-3">

          {success}

        </div>

      )}

      <div>

        <label className="block mb-2 font-medium">

          Subject

        </label>

        <input

          name="subject"

          value={form.subject}

          onChange={update}

          required

          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-3"

          placeholder="Enter ticket subject"

        />

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <div>

          <label className="block mb-2 font-medium">

            Issue Type

          </label>

          <select

            name="issueType"

            value={form.issueType}

            onChange={update}

            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-3"

          >

            {ISSUE_TYPES.map(type => (

              <option

                key={type}

                value={type}

              >

                {type}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">

            Priority

          </label>

          <select

            name="priority"

            value={form.priority}

            onChange={update}

            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-3"

          >

            {PRIORITIES.map(priority => (

              <option

                key={priority}

                value={priority}

              >

                {priority}

              </option>

            ))}

          </select>

        </div>

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Affected Feature

        </label>

        <input

          name="affectedFeature"

          value={form.affectedFeature}

          onChange={update}

          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-3"

          placeholder="Optional"

        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Description

        </label>

        <textarea

          rows={8}

          name="description"

          value={form.description}

          onChange={update}

          required

          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-3"

          placeholder="Describe the issue in detail..."

        />

      </div>

      <button

        disabled={loading}

        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 transition disabled:opacity-60"

      >

        {loading ? (

          <Loader2

            size={18}

            className="animate-spin"

          />

        ) : (

          <Send size={18} />

        )}

        {loading
          ? "Submitting..."
          : "Submit Ticket"}

      </button>

    </form>

  );

}