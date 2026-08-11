import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { createWatchParty } from "../services/watchParty.api";

const TYPES = [
  "watch_party",
  "creator_live",
  "business_live",
  "venue_live"
];

const VISIBILITY = [
  "public",
  "followers",
  "subscribers",
  "private"
];

export default function WatchPartyCreateModal({
  open,
  onClose,
  onCreated
}) {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "watch_party",
    visibility: "public",
    thumbnail: ""
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

    if (!form.title.trim()) return;

    try {

      setLoading(true);

     const res = await createWatchParty(form);

if (onCreated) {
  onCreated(res);
}

onClose();

console.log("Watch Party Response:", res);

navigate(`/watchparties/${res.id}/studio`);

    } catch (err) {
    console.log(err);
    console.log(err.response);
    console.log(err.response?.data);

    alert(
        JSON.stringify(err.response?.data) ||
        err.message
    );

    } finally {

      setLoading(false);

    }

  };

  

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Create Watch Party
          </h2>

          <button
            onClick={onClose}
          >
            <FaTimes size={20}/>
          </button>

        </div>

        <form
          onSubmit={submit}
          className="p-6 space-y-5"
        >

          <div>

            <label className="font-medium">
              Title
            </label>

            <input
              className="w-full border rounded-lg p-3 mt-1"
              name="title"
              value={form.title}
              onChange={change}
              required
            />

          </div>

          <div>

            <label className="font-medium">
              Description
            </label>

            <textarea
              className="w-full border rounded-lg p-3 mt-1"
              rows="4"
              name="description"
              value={form.description}
              onChange={change}
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="font-medium">
                Party Type
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-1"
                name="type"
                value={form.type}
                onChange={change}
              >

                {TYPES.map(type => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type.replaceAll("_"," ")}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="font-medium">
                Visibility
              </label>

              <select
                className="w-full border rounded-lg p-3 mt-1"
                name="visibility"
                value={form.visibility}
                onChange={change}
              >

                {VISIBILITY.map(v => (

                  <option
                    key={v}
                    value={v}
                  >
                    {v}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <div>

            <label className="font-medium">
              Thumbnail URL
            </label>

            <input
              className="w-full border rounded-lg p-3 mt-1"
              name="thumbnail"
              value={form.thumbnail}
              onChange={change}
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-lg bg-blue-600 text-white"
            >
              {loading
                ? "Creating..."
                : "Create Watch Party"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}