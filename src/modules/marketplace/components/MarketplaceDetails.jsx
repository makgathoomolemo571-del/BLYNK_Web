import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaMoneyBillWave,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

import marketplaceApi from "../services/marketplace.api";

const visibilityColors = {
  public:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",

  members:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",

  subscribers:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

const listingColors = {
  creator_service:
    "bg-blue-600",

  business_opportunity:
    "bg-green-600",

  sponsorship:
    "bg-yellow-500",

  collaboration:
    "bg-purple-600",

  freelance_service:
    "bg-pink-600",

  event_opportunity:
    "bg-red-600",
};

export default function MarketplaceDetails({

  marketplaceId,

  onApply

}) {

  const [listing, setListing] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadListing();

  }, [marketplaceId]);

  async function loadListing() {

    try {

      setLoading(true);

      const res =
        await marketplaceApi.getById(
          marketplaceId
        );

      setListing(res.data);

    } catch (err) {

      setError(

        err?.response?.data?.message ||

        "Unable to load listing."

      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="animate-pulse rounded-xl border bg-white dark:bg-zinc-900 p-8">

        <div className="h-8 bg-zinc-200 rounded w-1/2 mb-5" />

        <div className="h-5 bg-zinc-200 rounded w-full mb-3" />

        <div className="h-5 bg-zinc-200 rounded w-3/4" />

      </div>

    );

  }

  if (error) {

    return (

      <div className="rounded-xl bg-red-100 text-red-700 p-5">

        {error}

      </div>

    );

  }

  if (!listing) return null;

  return (

    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden">

      <div
        className={`h-2 ${
          listingColors[listing.listingType]
        }`}
      />

      <div className="p-8">

        <div className="flex items-center justify-between mb-5">

          <h1 className="text-3xl font-bold">

            {listing.title}

          </h1>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              visibilityColors[
                listing.visibility
              ]
            }`}
          >

            {listing.visibility}

          </span>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">

          <div className="flex items-center gap-3">

            <FaTag />

            <span>

              {listing.category}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt />

            <span>

              {listing.location ||

                "Remote"}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaMoneyBillWave />

            <span>

              {listing.price
                ? `R ${listing.price}`
                : listing.budgetRange ||
                  "Negotiable"}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <FaCalendarAlt />

            <span>

              {new Date(
                listing.createdAt
              ).toLocaleDateString()}

            </span>

          </div>

        </div>

        <div className="mb-8">

          <h2 className="font-semibold mb-3">

            Description

          </h2>

          <p className="leading-7 whitespace-pre-wrap text-zinc-600 dark:text-zinc-300">

            {listing.description}

          </p>

        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6 flex flex-wrap gap-8">

          <div className="flex items-center gap-2">

            <FaUsers />

            <span>

              {listing.applicationCount}

              {" "}Applications

            </span>

          </div>

          <div className="flex items-center gap-2">

            <FaUserCircle />

            <span>

              {listing.creator?.displayName ||

                listing.creator?.username ||

                "Creator"}

            </span>

          </div>

        </div>

        <div className="mt-8">

          <button

            onClick={() =>
              onApply?.(listing)
            }

            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3 font-semibold transition"

          >

            Apply Now

          </button>

        </div>

      </div>

    </div>

  );

}