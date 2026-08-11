import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import businessFindApi from "../services/businessFind.api";

import ApplyModal from "../../applications/pages/ApplyModal";
import BusinessCard from "../components/BusinessCard";

const BusinessDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showApply, setShowApply] = useState(false);
    
  useEffect(() => {
    loadCampaign();
  }, [id]);

  const loadCampaign = async () => {
    try {

      setLoading(true);

      const result = await businessFindApi.getById(id);
console.log(result.data);
      setCampaign(result.data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteCampaign = async (id) => {

  if (!window.confirm("Delete this campaign?"))
    return;

  try {

    await businessFindApi.remove(id);

    setCampaigns(prev =>
      prev.filter(c => c.id !== id)
    );

  } catch (err) {

    alert(
      err?.response?.data?.message ||
      "Unable to delete campaign."
    );

  }

};



  if (loading)
    return (
      <div className="p-8 text-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        {error}
      </div>
    );

  if (!campaign)
    return (
      <div className="p-8">
        Campaign not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <BusinessCard
        campaign={campaign}
      />

      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-2xl font-bold mb-4">
          Campaign Details
        </h2>

        <div className="space-y-4">

          <div>
            <strong>Business</strong>

            <p>
              {campaign.businessName}
            </p>
          </div>

          <div>
            <strong>Industry</strong>

            <p>
              {campaign.industry}
            </p>
          </div>

          <div>
            <strong>Campaign</strong>

            <p>
              {campaign.campaignName}
            </p>
          </div>

          <div>
            <strong>Objectives</strong>

            <p>
              {campaign.campaignObjectives}
            </p>
          </div>

          <div>
            <strong>Audience</strong>

            <p>
              {campaign.targetAudience}
            </p>
          </div>

          <div>
            <strong>Budget</strong>

            <p>
              {campaign.campaignBudget}
            </p>
          </div>

          <div>
            <strong>Compensation</strong>

            <p>
              {campaign.compensationType}
            </p>
          </div>

          <div>
            <strong>Status</strong>

            <p>
              {campaign.status}
            </p>
          </div>

          <div>
            <strong>Visibility</strong>

            <p>
              {campaign.visibility}
            </p>
          </div>

          <div>
            <strong>Applications</strong>

            <p>
              {campaign.applications?.length || 0}
            </p>
          </div>

        </div>

      </div>
<div className="bg-white rounded-xl shadow border p-6">

  <h2 className="text-2xl font-bold mb-6">
    Actions
  </h2>

  <div className="flex flex-wrap gap-4">

    <button
      onClick={() => setShowApply(true)}
      className="bg-purple-600 text-white px-6 py-3 rounded-lg"
    >
      Apply
    </button>

    <button
      onClick={() => navigate("/applications/my")}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
      My Applications
    </button>

    <button
      onClick={() => navigate(-1)}
      className="border px-6 py-3 rounded-lg"
    >
      Back
    </button>

  </div>

</div>
<ApplyModal
  open={showApply}
  onClose={() => setShowApply(false)}
  targetType="BUSINESS_FIND"
  targetId={campaign.id}
  onCreated={() => {
    alert("Application submitted.");
    setShowApply(false);
  }}
/>

    </div>
  );

};

export default BusinessDetailsPage;