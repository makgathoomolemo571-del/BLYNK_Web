// modules/marketplace/pages/MarketplacePage.jsx

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import marketplaceApi from "../services/marketplace.api";

const LISTING_TYPES = [
  "all",
  "creator_service",
  "business_opportunity",
  "sponsorship",
  "collaboration",
  "freelance_service",
  "event_opportunity",
];

export default function MarketplacePage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [marketplace, setMarketplace] = useState([]);

  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);


  const [listingType, setListingType] = useState("all");

  const [visibility, setVisibility] = useState("all");

  const [error, setError] = useState("");

 const loadMarketplace = async () => {
    try {
        setLoading(true);

        const data = await marketplaceApi.getMarketplace();

        console.log("Marketplace:", data);

        setListings(data);

    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    loadMarketplace();
  }, []);

  const filteredMarketplace = useMemo(() => {
  return listings.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesListing =
        listingType === "all"
          ? true
          : item.listingType === listingType;

      const matchesVisibility =
        visibility === "all"
          ? true
          : item.visibility === visibility;

      return (
        matchesSearch &&
        matchesListing &&
        matchesVisibility
      );
    });
  }, [
    listings,
    search,
    listingType,
    visibility,
  ]);

  return (
    <div className="container mx-auto px-5 py-8">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Marketplace
          </h1>

          <p className="text-gray-500 mt-1">
            Creator services, collaborations,
            sponsorships and business opportunities.
          </p>

        </div>

    "Newly Listed"

      </div>

      <div className="grid lg:grid-cols-4 gap-4 mb-6">

        <input
          className="border rounded-lg p-3"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border rounded-lg p-3"
          value={listingType}
          onChange={(e) =>
            setListingType(e.target.value)
          }
        >
          {LISTING_TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg p-3"
          value={visibility}
          onChange={(e) =>
            setVisibility(e.target.value)
          }
        >
          <option value="all">
            All Visibility
          </option>

          <option value="public">
            Public
          </option>

          <option value="members">
            Members
          </option>

          <option value="subscribers">
            Subscribers
          </option>
        </select>

        <button
          onClick={() => {
            setRefreshing(true);
            loadMarketplace();
          }}
          className="rounded-lg bg-black text-white"
        >
          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading Marketplace...
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-5 text-red-700">
          {error}
        </div>
      )}

      {!loading &&
        filteredMarketplace.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No marketplace listings found.
          </div>
        )}

      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-5">

        {filteredMarketplace.map((item) => (

          <div
            key={item.id}
            className="rounded-xl border bg-white shadow-sm overflow-hidden"
          >

            <div className="p-5">

              <div className="flex justify-between">

                <span className="px-2 py-1 bg-blue-100 rounded text-xs font-semibold">
                  {item.listingType}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

              <h2 className="font-bold text-xl mt-4">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-3 line-clamp-3">
                {item.description}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-5 text-sm">

                <div>
                  <strong>Category</strong>
                  <br />
                  {item.category || "-"}
                </div>

                <div>
                  <strong>Location</strong>
                  <br />
                  {item.location || "-"}
                </div>

                <div>
                  <strong>Price</strong>
                  <br />
                  {item.price
                    ? `R ${item.price}`
                    : "-"}
                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <Link
                  to={`/marketplace/${item.id}`}
                  className="flex-1 text-center rounded-lg bg-black text-white py-2"
                >
                  View
                </Link>

            

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}