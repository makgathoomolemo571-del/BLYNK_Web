// modules/marketplace/pages/MarketplaceDetailsPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import marketplaceApi from "../services/marketplace.api";

const MarketplaceDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadListing();
  }, [id]);

  const loadListing = async () => {
    try {
      setLoading(true);

      const data = await marketplaceApi.getMarketplaceById(id);
setListing(data);

      setListing(data);
    } catch (err) {
      console.error(err);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

 
  if (loading)
    return (
      <div className="p-5">
        Loading...
      </div>
    );

  if (!listing)
    return (
      <div className="p-5">
        Listing not found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-3xl font-bold">
              {listing.title}
            </h1>

            <p className="text-gray-500 mt-1">
              {listing.category}
            </p>

          </div>

          <span
            className="
              bg-blue-100
              text-blue-700
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            {listing.listingType}
          </span>

        </div>

        <div className="mt-8">

          <h2 className="font-semibold text-lg mb-2">
            Description
          </h2>

          <p className="leading-7">
            {listing.description}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>

            <h3 className="font-semibold">
              Price
            </h3>

            <p>
              {listing.price
                ? `R ${listing.price}`
                : "-"}
            </p>

          </div>

         

          <div>

            <h3 className="font-semibold">
              Location
            </h3>

            <p>
              {listing.location || "-"}
            </p>

          </div>

          <div>

            <h3 className="font-semibold">
              Visibility
            </h3>

            <p>
              {listing.visibility}
            </p>

          </div>

          

          <div>

            <h3 className="font-semibold">
              Posted
            </h3>

            <p>
              {new Date(
                listing.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
<div>

    <h3 className="font-semibold">
        Condition
    </h3>

    <p>
        {listing.condition || "-"}
    </p>

</div>

<div>

    <h3 className="font-semibold">
        Stock
    </h3>

    <p>
        {listing.stock ?? "-"}
    </p>

</div>

<div className="bg-white rounded-xl shadow p-6 mt-8">

    <h2 className="text-xl font-semibold mb-5">
        Seller Information
    </h2>

    <div className="space-y-3">

        <p>
            <strong>Seller:</strong>{" "}
            {listing.owner?.displayName ||
             listing.owner?.businessName ||
             "Unknown"}
        </p>

        <p>
            <strong>Location:</strong>{" "}
            {listing.location}
        </p>

    </div>

</div>

{listing.images?.length > 0 && (

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

    {listing.images.map((image) => (

        <img
            key={image}
            src={image}
            alt={listing.title}
            className="rounded-lg h-40 w-full object-cover"
        />

    ))}

</div>

)}

<div className="bg-white rounded-xl shadow p-6 mt-8">

    <h2 className="text-xl font-bold mb-5">
        Seller Information
    </h2>

    <div className="flex items-center gap-4">

        <img
            src={
                listing.owner?.profilePicture ||
                "/default-avatar.png"
            }
            alt="Seller"
            className="w-20 h-20 rounded-full object-cover"
        />

        <div>

            <h3 className="text-xl font-semibold">
                {listing.owner?.displayName ||
                 listing.owner?.businessName ||
                 listing.owner?.username}
            </h3>

            <p className="text-gray-500 capitalize">
                {listing.ownerType}
            </p>

            <p>
                {listing.location}
            </p>

            {listing.owner?.verified && (
                <span className="text-blue-600">
                    ✔ Verified
                </span>
            )}

        </div>

    </div>
{/* ACTION BUTTONS */}

<div className="bg-white rounded-xl shadow p-6 mt-8">

  <h2 className="text-xl font-bold mb-5">
    Contact Seller
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    {listing.listingType === "product" ? (

      <>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold"
          onClick={() => navigate(`/checkout/${listing._id || listing.id}`)}
        >
          🛒 Buy Now
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
          onClick={() =>
            navigate(`/messages/new?user=${listing.owner?._id}`)
          }
        >
          💬 Chat Seller
        </button>
      </>

    ) : (

      <>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold"
          onClick={() =>
            navigate(`/messages/new?user=${listing.owner?._id}`)
          }
        >
          💬 Contact Seller
        </button>

        {listing.whatsapp && (
          <a
            href={`https://wa.me/${listing.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-semibold"
          >
            WhatsApp
          </a>
        )}

        {listing.phone && (
          <a
            href={`tel:${listing.phone}`}
            className="bg-gray-800 hover:bg-gray-900 text-white text-center py-4 rounded-xl font-semibold"
          >
            📞 Call
          </a>
        )}

        {listing.email && (
          <a
            href={`mailto:${listing.email}`}
            className="bg-purple-600 hover:bg-purple-700 text-white text-center py-4 rounded-xl font-semibold"
          >
            ✉ Email
          </a>
        )}
      </>

    )}

  </div>

</div>
</div>
       
      </div>

    </div>
  );
};

export default MarketplaceDetailsPage;