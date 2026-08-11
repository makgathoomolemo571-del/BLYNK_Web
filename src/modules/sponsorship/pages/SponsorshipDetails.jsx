import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sponsorshipApi from "../services/sponsorship.api";

export default function SponsorshipDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [campaign, setCampaign] = useState(null);

  const [error, setError] = useState("");
const [proposal, setProposal] = useState("");
const [message, setMessage] = useState("");
const [price, setPrice] = useState("");
const [portfolioLinks, setPortfolioLinks] = useState("");

console.log("SponsorshipDetails mounted");
  useEffect(() => {
    loadCampaign();
  }, [id]);

  async function loadCampaign() {
    try {
      setLoading(true);

      const res = await sponsorshipApi.get(id);

      setCampaign(res.data || res);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load sponsorship."
      );
    } finally {
      setLoading(false);
    }
  }

  async function apply() {
    try {

        await sponsorshipApi.apply(id, {

            proposal,

            message,

            proposedPrice: Number(price),

            portfolioLinks: portfolioLinks
                .split("\n")
                .filter(Boolean),

            attachments: [],

            deliverables: []

        });

        alert("Application submitted.");

    } catch (err) {

        alert(
            err.response?.data?.message ||
            "Unable to apply."
        );

    }
}



  if (loading)
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );

  return (

    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-xl shadow">

        <div className="p-6 border-b">

          <h1 className="text-3xl font-bold">
            {campaign.title}
          </h1>

          <p className="mt-2 text-gray-600">
            {campaign.description}
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">

          <div>

            <h3 className="font-bold mb-3">
              Campaign
            </h3>

            <p><strong>Status:</strong> {campaign.status}</p>

            <p><strong>Category:</strong> {campaign.category}</p>

            <p><strong>Budget:</strong> {campaign.currency} {campaign.budget}</p>

            <p><strong>Creator Reward:</strong> {campaign.creatorAmount}</p>

            <p><strong>Commission:</strong> {campaign.platformCommission}</p>

            <p><strong>Start:</strong> {campaign.startDate?.slice(0,10)}</p>

            <p><strong>End:</strong> {campaign.endDate?.slice(0,10)}</p>

          </div>

          

        </div>

        

        <div className="border-t p-6">

    <h2 className="text-2xl font-bold mb-6">
        Apply for this Sponsorship
    </h2>

    <div className="space-y-5">

        <div>
            <label className="block font-semibold mb-2">
                Proposal
            </label>

            <textarea
                rows={5}
                value={proposal}
                onChange={(e)=>setProposal(e.target.value)}
                placeholder="Describe how you will promote this brand..."
                className="w-full border rounded-lg p-3"
            />
        </div>

        <div>
            <label className="block font-semibold mb-2">
                Message to Business
            </label>

            <textarea
                rows={4}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                placeholder="Introduce yourself..."
                className="w-full border rounded-lg p-3"
            />
        </div>

        <div>
            <label className="block font-semibold mb-2">
                Your Price (R)
            </label>

            <input
                type="number"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className="w-full border rounded-lg p-3"
                placeholder="5000"
            />
        </div>

        <div>
            <label className="block font-semibold mb-2">
                Portfolio Links
            </label>

            <textarea
                rows={4}
                value={portfolioLinks}
                onChange={(e)=>setPortfolioLinks(e.target.value)}
                placeholder={`One link per line

https://instagram.com/...
https://youtube.com/...`}
                className="w-full border rounded-lg p-3"
            />
        </div>

        <button
            onClick={apply}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
            Submit Application
        </button>

    </div>

</div>

      </div>

    </div>

  );
}