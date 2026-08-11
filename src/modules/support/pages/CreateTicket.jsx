import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supportApi from "../services/support.api";
import { useEffect } from "react";

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

export default function CreateTicket() {
  const navigate = useNavigate();
const [createdTicket, setCreatedTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    subject: "",
    issueType: "technical",
    description: "",
    affectedFeature: "",
    priority: "medium"
  });

  useEffect(() => {
  console.log("CreateTicket mounted");

  return () => {
    console.log("CreateTicket unmounted");
  };
}, []);

useEffect(() => {
  console.log("createdTicket changed:", createdTicket);
}, [createdTicket]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const submit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await supportApi.createTicket(form);

    console.log("FULL RESPONSE:", response);
    console.log("RESPONSE.DATA:", response.data);

    setCreatedTicket(response.data);

  } catch (err) {
    console.log("ERROR:", err.response);
  } finally {
    setLoading(false);
  }
};
console.log("createdTicket state:", createdTicket);

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Support Ticket
      </h1>

      <form
        onSubmit={submit}
        className="space-y-5"
      >

        <div>

          <label className="block mb-2 font-semibold">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            maxLength={150}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block mb-2 font-semibold">
              Issue Type
            </label>

            <select
              name="issueType"
              value={form.issueType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              {ISSUE_TYPES.map((type) => (
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

            <label className="block mb-2 font-semibold">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >

              {PRIORITIES.map((priority) => (
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

          <label className="block mb-2 font-semibold">
            Affected Feature
          </label>

          <input
            type="text"
            name="affectedFeature"
            value={form.affectedFeature}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Description
          </label>

          <textarea
            rows={8}
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 resize-none"
          />

        </div>

        <button
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Submit Ticket"}
        </button>

      </form>
{createdTicket && (
  <div className="mt-10 rounded-xl border bg-white shadow p-6">

    <h2 className="text-2xl font-bold mb-4">
      Ticket Created Successfully
    </h2>

    <div className="space-y-2">

      <p>
        <strong>Ticket:</strong> {createdTicket.ticketNumber}
      </p>

      <p>
        <strong>Subject:</strong> {createdTicket.subject}
      </p>

      <p>
        <strong>Status:</strong> {createdTicket.status}
      </p>

      <p>
        <strong>Priority:</strong> {createdTicket.priority}
      </p>

    </div>

    <div className="mt-6">

      <button
        onClick={() =>
          navigate(`/support/ticket/${createdTicket.id}`)
        }
        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        View Ticket
      </button>

    </div>

  </div>
)}
    </div>
  );
}