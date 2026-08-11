// src/modules/advertisements/components/AdvertisementPreview.jsx

import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaImage,
  FaMousePointer,
  FaEye,
  FaPause,
  FaCheckCircle
} from "react-icons/fa";

import {
  trackClick,
  trackImpression
} from "../services/advertisement.api";

export default function AdvertisementPreview({
  advertisement
}) {

  useEffect(() => {

    if (!advertisement?.id) return;

    trackImpression(advertisement.id)
      .catch(() => {});

  }, [advertisement]);

  if (!advertisement) return null;

  const handleClick = () => {

    trackClick(advertisement.id)
      .catch(() => {});

  };

  const progress =
    advertisement.budget > 0
      ? Math.min(
          (advertisement.spent /
            advertisement.budget) *
            100,
          100
        )
      : 0;

  return (

    <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow overflow-hidden border border-zinc-200 dark:border-zinc-800">

      {/* MEDIA */}

      <div className="relative bg-black aspect-video">

        {advertisement.type === "video" ? (

          <video
            src={advertisement.media}
            controls
            className="w-full h-full object-cover"
          />

        ) : (

          <img
            src={advertisement.media}
            alt={advertisement.title}
            className="w-full h-full object-cover"
          />

        )}

        <div className="absolute top-3 left-3">

          <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">

            {advertisement.type === "video"
              ? <FaPlay />
              : <FaImage />}

            {advertisement.type}

          </span>

        </div>

      </div>

      {/* BODY */}

      <div className="p-5 space-y-4">

        <div>

          <h2 className="text-xl font-bold">

            {advertisement.title}

          </h2>

          <p className="text-zinc-500 mt-2">

            {advertisement.description}

          </p>

        </div>

        {/* STATUS */}

        <div className="flex flex-wrap gap-3">

          <span className="flex items-center gap-2 text-sm">

            {advertisement.status === "active" &&
              <FaCheckCircle className="text-green-500" />}

            {advertisement.status === "paused" &&
              <FaPause className="text-orange-500" />}

            {advertisement.status}

          </span>

        </div>

        {/* ANALYTICS */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">

            <div className="flex items-center gap-2">

              <FaEye />

              <span className="font-semibold">

                Impressions

              </span>

            </div>

            <h3 className="text-2xl mt-2">

              {advertisement.impressions}

            </h3>

          </div>

          <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">

            <div className="flex items-center gap-2">

              <FaMousePointer />

              <span className="font-semibold">

                Clicks

              </span>

            </div>

            <h3 className="text-2xl mt-2">

              {advertisement.clicks}

            </h3>

          </div>

        </div>

        {/* BUDGET */}

        <div>

          <div className="flex justify-between text-sm mb-2">

            <span>

              Budget

            </span>

            <span>

              R{advertisement.spent}
              {" / "}
              R{advertisement.budget}

            </span>

          </div>

          <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">

            <div
              className="h-full bg-blue-600"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>

        {/* CTA */}

        <div className="flex gap-3 pt-2">

          <button
            onClick={handleClick}
            className="flex-1 rounded-xl bg-blue-600 text-white py-3 font-semibold hover:bg-blue-700"
          >

            Visit Advertisement

          </button>

          <Link
            to={`/advertisements/${advertisement.id}`}
            className="px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700"
          >

            Details

          </Link>

        </div>

      </div>

    </div>

  );

}