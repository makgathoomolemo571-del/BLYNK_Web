import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import advertisementApi from "../services/advertisement.api";

export default function AdvertisementDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [advertisement, setAdvertisement] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {

    loadAdvertisement();

  }, [id]);

  async function loadAdvertisement() {

    try {

      const ads =
        await advertisementApi.getAdvertisements();

      const ad =
        ads.find(item => item.id === id);

      if (!ad) {

        setError("Advertisement not found.");

        setLoading(false);

        return;

      }

      setAdvertisement(ad);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to load advertisement."
      );

    } finally {

      setLoading(false);

    }

  }

  async function pauseAdvertisement() {

    try {

      const updated =
        await advertisementApi.pauseAdvertisement(id);

      setAdvertisement(updated);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Unable to pause advertisement."
      );

    }

  }

  async function resumeAdvertisement() {

    try {

      const updated =
        await advertisementApi.resumeAdvertisement(id);

      setAdvertisement(updated);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Unable to resume advertisement."
      );

    }

  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  return (

    <div className="max-w-6xl mx-auto p-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-lg bg-zinc-800 text-white"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden">

        <div className="aspect-video bg-black">

          {advertisement.type === "video" ? (

            <video
              controls
              className="w-full h-full object-cover"
              src={advertisement.media}
            />

          ) : (

            <img
              src={advertisement.media}
              alt={advertisement.title}
              className="w-full h-full object-cover"
            />

          )}

        </div>

        <div className="p-8 space-y-6">

          <div>

            <h1 className="text-3xl font-bold">
              {advertisement.title}
            </h1>

            <p className="mt-2 text-zinc-500">
              {advertisement.description}
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <p className="text-sm text-zinc-500">
                Budget
              </p>

              <h2 className="text-2xl font-bold">
                R{advertisement.budget}
              </h2>

            </div>

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <p className="text-sm text-zinc-500">
                Spent
              </p>

              <h2 className="text-2xl font-bold">
                R{advertisement.spent}
              </h2>

            </div>

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <p className="text-sm text-zinc-500">
                Impressions
              </p>

              <h2 className="text-2xl font-bold">
                {advertisement.impressions}
              </h2>

            </div>

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <p className="text-sm text-zinc-500">
                Clicks
              </p>

              <h2 className="text-2xl font-bold">
                {advertisement.clicks}
              </h2>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <h3 className="font-semibold mb-3">
                Target Audience
              </h3>

              <p>
                Age:
                {" "}
                {advertisement.targetAudience?.ageMin}
                {" - "}
                {advertisement.targetAudience?.ageMax}
              </p>

              <p>
                Gender:
                {" "}
                {advertisement.targetAudience?.gender}
              </p>

              <p>
                Countries:
                {" "}
                {advertisement.targetAudience?.countries?.join(", ")}
              </p>

              <p>
                Interests:
                {" "}
                {advertisement.targetAudience?.interests?.join(", ")}
              </p>

            </div>

            <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">

              <h3 className="font-semibold mb-3">
                Campaign
              </h3>

              <p>
                Type:
                {" "}
                {advertisement.type}
              </p>

              <p>
                Status:
                {" "}
                <span className="font-semibold">
                  {advertisement.status}
                </span>
              </p>

              <p>
                Created:
                {" "}
                {new Date(
                  advertisement.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <div className="flex gap-4">

            {advertisement.status === "active" && (

              <button
                onClick={pauseAdvertisement}
                className="px-6 py-3 rounded-lg bg-yellow-500 text-white"
              >
                Pause Campaign
              </button>

            )}

            {advertisement.status === "paused" && (

              <button
                onClick={resumeAdvertisement}
                className="px-6 py-3 rounded-lg bg-green-600 text-white"
              >
                Resume Campaign
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}