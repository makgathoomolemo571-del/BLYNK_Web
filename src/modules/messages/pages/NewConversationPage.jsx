import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conversationApi from "../services/conversation.api";

export default function NewConversationPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: "direct",
    name: "",
    participants: ""
  });

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        type: form.type,
        name: form.name,
        participants: form.participants
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
      };

      const { data } =
        await conversationApi.create(payload);

      navigate(`/messages/${data._id}`);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to create conversation."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        New Conversation
      </h1>

      <form
        onSubmit={submit}
        className="space-y-6 bg-white rounded-xl shadow p-8"
      >

        <div>

          <label className="block font-semibold mb-2">
            Conversation Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={change}
            className="w-full border rounded-lg p-3"
          >
            <option value="direct">
              Direct
            </option>

            <option value="group">
              Group
            </option>
          </select>

        </div>

        {form.type === "group" && (

          <div>

            <label className="block font-semibold mb-2">
              Group Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={change}
              className="w-full border rounded-lg p-3"
            />

          </div>

        )}

        <div>

          <label className="block font-semibold mb-2">
            Participants
          </label>

          <textarea
            rows={4}
            name="participants"
            value={form.participants}
            onChange={change}
            placeholder="User IDs separated by commas"
            className="w-full border rounded-lg p-3"
          />

          <p className="text-xs text-gray-500 mt-2">
            Example:
            684a1...,684a2...,684a3...
          </p>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
        >
          {loading
            ? "Creating..."
            : "Create Conversation"}
        </button>

      </form>

    </div>
  );
}