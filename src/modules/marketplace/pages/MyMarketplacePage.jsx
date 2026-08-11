import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, MapPin, Users, Calendar } from "lucide-react";

import useMarketplace from "../hooks/useMarketplace";
import MarketplaceCard from "../components/MarketplaceCard";

const MyMarketplacePage = () => {
  const {
    myListings,
    loading,
    error,
    getMyListings,
    deleteListing,
  } = useMarketplace();

  useEffect(() => {
    getMyListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="text-lg font-semibold">
          Loading marketplace...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-red-100 text-red-700 px-5 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Marketplace
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all your creator services,
            sponsorships, collaborations and opportunities.
          </p>

        </div>

        <Link
          to="/marketplace/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <Plus size={18} />
          Create Listing
        </Link>

      </div>

      {!myListings.length ? (
        <div className="bg-white rounded-2xl shadow border p-10 text-center">

          <h2 className="text-2xl font-semibold mb-3">
            No Listings Yet
          </h2>

          <p className="text-gray-500 mb-6">
            Create your first marketplace listing.
          </p>

          <Link
            to="/marketplace/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Create Listing
          </Link>

        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">

          {myListings.map((listing) => (

            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow border overflow-hidden"
            >

              <MarketplaceCard
                marketplace={listing}
              />

              <div className="px-6 pb-6">

                <div className="grid grid-cols-3 gap-4 mb-5">

                  <div className="bg-gray-50 rounded-xl p-3 text-center">

                    <Users
                      size={20}
                      className="mx-auto mb-2 text-blue-600"
                    />

                    <div className="font-bold">
                      {listing.applicationCount}
                    </div>

                    <div className="text-xs text-gray-500">
                      Applications
                    </div>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 text-center">

                    <MapPin
                      size={20}
                      className="mx-auto mb-2 text-green-600"
                    />

                    <div className="font-semibold">
                      {listing.location || "-"}
                    </div>

                    <div className="text-xs text-gray-500">
                      Location
                    </div>

                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 text-center">

                    <Calendar
                      size={20}
                      className="mx-auto mb-2 text-purple-600"
                    />

                    <div className="font-semibold">
                      {new Date(
                        listing.createdAt
                      ).toLocaleDateString()}
                    </div>

                    <div className="text-xs text-gray-500">
                      Posted
                    </div>

                  </div>

                </div>

                <div className="flex gap-3">

                  <Link
                    to={`/marketplace/${listing.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/marketplace/edit/${listing.id}`}
                    className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl text-center transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
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
};

export default MyMarketplacePage;