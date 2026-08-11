import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sponsorshipApi from "../services/sponsorship.api";



export default function SponsorshipDashboard() {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
 

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    try {
      setLoading(true);

      const res = await sponsorshipApi.getAll();

      setCampaigns(res.data || res);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load sponsorship campaigns."
      );

    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="p-8 text-center">
        Loading sponsorships...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Sponsorship Marketplace
          </h1>

          <p className="text-zinc-500">
            Discover sponsorship opportunities.
          </p>
        </div>

        

      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        {campaigns.map(item => (

          <div
            key={item.id}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow border p-5"
          >

            <h2 className="text-xl font-bold">
              {item.title}
            </h2>

            <p className="text-sm text-zinc-500 mt-2">
              {item.description}
            </p>

            <div className="mt-5 space-y-2">

              <div>
                <strong>Business:</strong>{" "}
                {item.business?.businessName ||
                 item.business?.name}
              </div>

              <div>
                <strong>Category:</strong>{" "}
                {item.category}
              </div>

              <div>
                <strong>Budget:</strong>{" "}
                {item.currency}
                {" "}
                {item.budget}
              </div>

              <div>
                <strong>Status:</strong>{" "}
                {item.status}
              </div>

            </div>

            <div className="mt-6">
{console.log("SPONSORSHIP ITEM:", item)}
              <Link
                to={`/sponsorships/${item._id}`}
                className="w-full block text-center bg-blue-600 text-white rounded-lg py-3"
              >
                View Campaign
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}