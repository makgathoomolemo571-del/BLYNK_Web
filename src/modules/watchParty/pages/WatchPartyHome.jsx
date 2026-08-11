import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getLiveWatchParties
} from "../services/watchParty.api";
import watchPartyApi from "../services/watchParty.api";

const WatchPartyHome = () => {
  const [watchParties, setWatchParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    loadLiveWatchParties();

}, []);

async function loadLiveWatchParties() {
    try {
        setLoading(true);

        const data = await getLiveWatchParties();

        console.log("LIVE WATCH PARTIES:", data);
console.log("FIRST PARTY:", data[0]);

        setWatchParties(data);
        setError("");

    } catch (err) {

        console.error(err);

        setError(
            err.response?.data?.message ||
            "Failed to load watch parties."
        );

    } finally {

        setLoading(false);

    }
}

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg font-semibold">
          Loading Watch Parties...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center mt-20">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Live Watch Parties
          </h1>

          <p className="text-gray-500 mt-2">
            Join creators, businesses and communities live.
          </p>
        </div>

      </div>

      {watchParties.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No Live Watch Parties
          </h2>

          <p className="mt-3 text-gray-500">
            Nobody is currently streaming.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {watchParties.map((party) => (
            <Link
              key={party._id}
              to={`/watchparties/${party.id}`}
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

                <img
                  src={
                    party.thumbnail ||
                    "/images/default-watchparty.jpg"
                  }
                  alt={party.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between">

                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                      {party.status.toUpperCase()}
                    </span>

                    <span className="text-sm text-gray-500">
                      {party.viewerCount} Watching
                    </span>

                  </div>

                  <h2 className="text-xl font-bold mt-4">
                    {party.title}
                  </h2>

                  <p className="text-gray-500 mt-2 line-clamp-2">
                    {party.description}
                  </p>

                  <div className="flex justify-between mt-5">

                    <span className="text-sm font-medium">
                      {party.type.replace("_", " ")}
                    </span>

                    <span className="text-sm text-gray-400">
                      {party.visibility}
                    </span>

                  </div>

                </div>

              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default WatchPartyHome;