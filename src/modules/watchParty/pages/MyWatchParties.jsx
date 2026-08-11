// modules/watchParty/pages/MyWatchParties.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../config/api";

const STATUS_COLOR = {
  scheduled: "bg-yellow-100 text-yellow-700",
  live: "bg-red-100 text-red-700",
  ended: "bg-zinc-200 text-zinc-700",
};

export default function MyWatchParties() {
  const [watchParties, setWatchParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    loadWatchParties();
  }, []);

  async function loadWatchParties() {
    try {
      setLoading(true);

      /**
       * Backend should return only
       * authenticated user's watch parties.
       *
       * GET /api/watchparties/my
       */

      const { data } = await api.get("/watchparties/my");

      setWatchParties(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteParty(id) {
    if (!window.confirm("Delete this watch party?")) return;

    try {
      await api.delete(`/watchparties/${id}`);

      setWatchParties((prev) =>
        prev.filter((x) => x.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function startParty(id) {
    try {
      const { data } =
        await api.patch(`/watchparties/${id}/start`);

      setWatchParties((prev) =>
        prev.map((x) =>
          x.id === id ? data : x
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function endParty(id) {
    try {
      const { data } =
        await api.patch(`/watchparties/${id}/end`);

      setWatchParties((prev) =>
        prev.map((x) =>
          x.id === id ? data : x
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = useMemo(() => {
    return watchParties.filter((item) => {
      const matchTitle =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : item.status === status;

      return matchTitle && matchStatus;
    });
  }, [watchParties, search, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-lg font-semibold">
        Loading Watch Parties...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Watch Parties
          </h1>

          <p className="text-zinc-500 mt-2">
            Manage all your live streams and watch parties.
          </p>
        </div>

        <Link
          to="/watchparty/create"
          className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          Create Watch Party
        </Link>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          className="border rounded-lg px-4 py-3 flex-1"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="scheduled">
            Scheduled
          </option>
          <option value="live">
            Live
          </option>
          <option value="ended">
            Ended
          </option>
        </select>

      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-zinc-500">
          No Watch Parties Found.
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">

          {filtered.map((party) => (

            <div
              key={party.id}
              className="rounded-xl border bg-white overflow-hidden shadow-sm"
            >

              <img
                src={
                  party.thumbnail ||
                  "/images/watchparty-placeholder.jpg"
                }
                alt={party.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <div className="flex justify-between items-center mb-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[party.status]}`}
                  >
                    {party.status.toUpperCase()}
                  </span>

                  <span className="text-sm text-zinc-500">
                    👁 {party.viewerCount}
                  </span>

                </div>

                <h2 className="text-xl font-bold">
                  {party.title}
                </h2>

                <p className="mt-2 text-zinc-600 line-clamp-2">
                  {party.description}
                </p>

                <div className="flex justify-between mt-5 text-sm text-zinc-500">

                  <span>
                    {party.type}
                  </span>

                  <span>
                    {party.visibility}
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    onClick={() =>
                      startParty(party.id)
                    }
                    disabled={
                      party.status !== "scheduled"
                    }
                    className="bg-green-600 text-white rounded-lg py-2 disabled:opacity-40"
                  >
                    Start
                  </button>

                  <button
                    onClick={() =>
                      endParty(party.id)
                    }
                    disabled={
                      party.status !== "live"
                    }
                    className="bg-orange-600 text-white rounded-lg py-2 disabled:opacity-40"
                  >
                    End
                  </button>

                  <Link
                    to={`/watchparty/${party.id}`}
                    className="bg-blue-600 text-white rounded-lg py-2 text-center"
                  >
                    Open
                  </Link>

                  <button
                    onClick={() =>
                      deleteParty(party.id)
                    }
                    className="bg-red-600 text-white rounded-lg py-2"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}