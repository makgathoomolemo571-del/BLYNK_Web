import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sponsorshipApi from "../services/sponsorship.api";

export default function SponsorshipMarketplace() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const res = await sponsorshipApi.getAll();

      setCampaigns(
        res.data || res || []
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load sponsorships."
      );

    } finally {

      setLoading(false);

    }
  }

  if (loading)
    return (
      <div className="p-8">
        Loading Sponsorships...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );

  return (

    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Sponsorship Marketplace
          </h1>

          <p className="text-zinc-500">
            Find campaigns from businesses.
          </p>

        </div>

        <Link
          to="/sponsorship/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Create Campaign
        </Link>

      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        {campaigns.map(item => (

          <div
            key={item.id}
            className="border rounded-xl p-5 bg-white shadow"
          >

            <h2 className="text-xl font-bold mb-2">
              {item.title}
            </h2>

            <p className="text-sm text-zinc-600 mb-3">
              {item.description}
            </p>

            <div className="space-y-1 text-sm">

              <p>
                <strong>Business:</strong>{" "}
                {item.business?.businessName ||
                  item.business?.name}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {item.category}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>Budget:</strong>{" "}
                {item.currency}{" "}
                {item.budget}
              </p>

            </div>

            <Link
              to={`/sponsorship/${item.id}`}
              className="mt-5 inline-block bg-black text-white px-4 py-2 rounded"
            >
              View Campaign
            </Link>

          </div>

        ))}

      </div>

    </div>

  );
}