import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import advertisementApi from "../services/advertisement.api";

export default function AdsDashboard() {

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAds();
  }, []);

  async function loadAds() {

    try {

      const data = await advertisementApi.getAll();

      setAds(Array.isArray(data) ? data : []);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to load advertisements."
      );

    } finally {

      setLoading(false);

    }

  }

  async function pause(id) {

    await advertisementApi.pause(id);

    loadAds();

  }

  async function resume(id) {

    await advertisementApi.resume(id);

    loadAds();

  }

  if (loading)
    return (
      <div className="p-8">
        Loading advertisements...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );

  return (

    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Advertisement Manager
          </h1>

          <p className="text-zinc-500">
            Manage all your advertising campaigns.
          </p>

        </div>

        <Link
          to="/advertisements/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Create Advertisement
        </Link>

      </div>

      {ads.length === 0 && (

        <div className="bg-white rounded-xl p-12 text-center">

          <h2 className="text-2xl font-semibold mb-3">
            No Advertisements
          </h2>

          <p className="text-zinc-500 mb-6">
            Start promoting your business.
          </p>

          <Link
            to="/advertisements/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create First Ad
          </Link>

        </div>

      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {ads.map(ad => (

          <div
            key={ad.id}
            className="bg-white rounded-xl shadow border overflow-hidden"
          >

            <img
              src={ad.media}
              alt={ad.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <div className="flex justify-between items-center">

                <h2 className="font-bold text-lg">

                  {ad.title}

                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    ad.status === "active"
                      ? "bg-green-100 text-green-700"
                      : ad.status === "paused"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {ad.status}
                </span>

              </div>

              <p className="text-sm text-zinc-600 mt-3">

                {ad.description}

              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

                <div>

                  <strong>Budget</strong>

                  <br/>

                  R{ad.budget}

                </div>

                <div>

                  <strong>Spent</strong>

                  <br/>

                  R{ad.spent}

                </div>

                <div>

                  <strong>Impressions</strong>

                  <br/>

                  {ad.impressions}

                </div>

                <div>

                  <strong>Clicks</strong>

                  <br/>

                  {ad.clicks}

                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <Link
                  to={`/advertisements/${ad.id}/edit`}
                  className="flex-1 bg-blue-600 text-white py-2 rounded text-center"
                >
                  Edit
                </Link>

                {ad.status === "active" ? (

                  <button
                    onClick={() => pause(ad.id)}
                    className="flex-1 bg-yellow-500 text-white rounded"
                  >
                    Pause
                  </button>

                ) : (

                  <button
                    onClick={() => resume(ad.id)}
                    className="flex-1 bg-green-600 text-white rounded"
                  >
                    Resume
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}