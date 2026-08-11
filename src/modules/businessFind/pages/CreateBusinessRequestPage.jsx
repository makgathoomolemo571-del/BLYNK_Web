// modules/businessFind/components/CreateBusinessRequestPage.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import businessFindApi from "../services/businessFind.api";

const initialState = {
  businessName: "",
  industry: "",
  campaignName: "",
  campaignObjectives: "",
  targetAudience: "",
  campaignBudget: "",
  compensationType: "fixed",
  visibility: "public",
};

export default function CreateBusinessRequestPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  const onChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
  loadCampaigns();
}, []);

const loadCampaigns = async () => {
  try {
    const response = await businessFindApi.getMyCampaigns();

    console.log(response.data);

    setCampaigns(response.data);
  } catch (err) {
    console.error(err);
  }
};

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

     await businessFindApi.create(form);

setSuccess("Campaign created successfully.");

setForm(initialState);

loadCampaigns();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to create campaign."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Create Business Campaign
      </h1>

      <form
        onSubmit={submit}
        className="space-y-6 bg-white rounded-xl shadow p-8"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <input
            name="businessName"
            placeholder="Business Name"
            value={form.businessName}
            onChange={onChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={onChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            name="campaignName"
            placeholder="Campaign Name"
            value={form.campaignName}
            onChange={onChange}
            required
            className="border rounded-lg p-3 md:col-span-2"
          />

          <textarea
            name="campaignObjectives"
            placeholder="Campaign Objectives"
            rows={5}
            value={form.campaignObjectives}
            onChange={onChange}
            required
            className="border rounded-lg p-3 md:col-span-2"
          />

          <textarea
            name="targetAudience"
            placeholder="Target Audience"
            rows={4}
            value={form.targetAudience}
            onChange={onChange}
            required
            className="border rounded-lg p-3 md:col-span-2"
          />

          <input
            type="number"
            min="0"
            name="campaignBudget"
            placeholder="Campaign Budget"
            value={form.campaignBudget}
            onChange={onChange}
            required
            className="border rounded-lg p-3"
          />

          <select
            name="compensationType"
            value={form.compensationType}
            onChange={onChange}
            className="border rounded-lg p-3"
          >
            <option value="fixed">
              Fixed Fee
            </option>

            <option value="revenue-share">
              Revenue Share
            </option>

            <option value="hybrid">
              Hybrid
            </option>

            <option value="product">
              Product Exchange
            </option>
          </select>

          <select
            name="visibility"
            value={form.visibility}
            onChange={onChange}
            className="border rounded-lg p-3"
          >
            <option value="public">
              Public
            </option>

            <option value="private">
              Private
            </option>
          </select>

        </div>

        {error && (
          <div className="text-red-600 font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 font-medium">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 disabled:opacity-50"
        >
          {loading
            ? "Creating..."
            : "Create Campaign"}
        </button>

      </form>
<div className="mt-10">

  <h2 className="text-2xl font-bold mb-6">
    My Campaigns
  </h2>

  {campaigns.length === 0 ? (

    <div className="text-gray-500">
      No campaigns yet.
    </div>

  ) : (

    <div className="grid md:grid-cols-2 gap-6">

      {campaigns.map((campaign) => (

        <div
          key={campaign.id || campaign._id}
          className="border rounded-xl p-6 shadow bg-white"
        >

          <h3 className="text-xl font-bold">
            {campaign.campaignName}
          </h3>

          <p className="text-gray-500 mt-1">
            {campaign.businessName}
          </p>

          <p className="mt-4">
            {campaign.campaignObjectives}
          </p>

          <div className="mt-4 space-y-1 text-sm">

            <p>
              <strong>Industry:</strong>{" "}
              {campaign.industry}
            </p>

            <p>
              <strong>Audience:</strong>{" "}
              {campaign.targetAudience}
            </p>

            <p>
              <strong>Budget:</strong> R
              {campaign.campaignBudget}
            </p>

            <p>
              <strong>Compensation:</strong>{" "}
              {campaign.compensationType}
            </p>

            <p>
              <strong>Visibility:</strong>{" "}
              {campaign.visibility}
            </p>

          </div>

          <div className="flex gap-3 mt-6">
<button
  onClick={() =>
    navigate(`/business-find/${campaign.id}/applications`)
  }
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Applications
</button>

            <button
              onClick={() =>
                navigate(`/business-find/edit/${campaign.id}`)
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
    </div>
  );
}