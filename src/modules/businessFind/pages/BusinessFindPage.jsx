// modules/businessFind/pages/BusinessFindPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import businessFindApi from "../services/businessFind.api";

export default function BusinessFindPage() {
  const [campaigns, setCampaigns] = useState([]);
  
 

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [campaignsRes] = await Promise.all([
    businessFindApi.getAll(),
   
]);

console.log("GET ALL RESPONSE", campaignsRes);
console.log("GET ALL DATA", campaignsRes.data);

setCampaigns(campaignsRes.data);


    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading campaigns...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Business Campaigns
          </h1>

          <p className="text-gray-500 mt-2">
            Manage influencer campaigns.
          </p>

        </div>


      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="rounded-xl border p-5">

          <h3 className="text-sm text-gray-500">
            Total Campaigns
          </h3>

         
        </div>

        <div className="rounded-xl border p-5">

          <h3 className="text-sm text-gray-500">
            Active Campaigns
          </h3>

          

        </div>

        <div className="rounded-xl border p-5">

          <h3 className="text-sm text-gray-500">
            Applications
          </h3>

          

        </div>

      </div>

      {campaigns.length === 0 ? (

        <div className="border rounded-xl p-12 text-center">

          <h2 className="text-2xl font-semibold">
            No Campaigns Yet
          </h2>


        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {campaigns.map((campaign) => (

            <div
              key={campaign.id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {campaign.campaignName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {campaign.businessName}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {campaign.status}
                </span>

              </div>

              <div className="mt-5 space-y-2">

                <p>
                  <strong>Industry:</strong>{" "}
                  {campaign.industry}
                </p>

                <p>
                  <strong>Audience:</strong>{" "}
                  {campaign.targetAudience}
                </p>

                <p>
                  <strong>Budget:</strong>{" "}
                  {campaign.campaignBudget}
                </p>

                <p>
                  <strong>Compensation:</strong>{" "}
                  {campaign.compensationType}
                </p>

                <p>
                  <strong>Applications:</strong>{" "}
                  {campaign.applications?.length || 0}
                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <Link
                  to={`/business-find/${campaign.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  View
                </Link>

                

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}