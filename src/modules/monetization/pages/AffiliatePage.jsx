// src/modules/monetization/pages/AffiliatePage.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

export default function AffiliatePage() {
  const [loading, setLoading] = useState(true);

  const [affiliate, setAffiliate] = useState({
    referralCode: "",
    referralLink: "",
    totalClicks: 0,
    conversions: 0,
    totalSales: 0,
    commission: 0,
    pendingCommission: 0,
    campaigns: []
  });

  useEffect(() => {
    loadAffiliate();
  }, []);

  async function loadAffiliate() {
    try {
      setLoading(true);

      const { data } =
        await monetizationApi.getAffiliate();

      setAffiliate(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  function copyLink() {

    navigator.clipboard.writeText(
      affiliate.referralLink
    );

    alert("Referral link copied.");

  }

  if (loading) {

    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Affiliate Program
          </h1>

          <p className="text-zinc-500">
            Earn commissions by referring creators,
            businesses and advertisers.
          </p>

        </div>

        <button
          className="px-5 py-3 rounded-lg bg-blue-600 text-white"
        >
          Request Payout
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">
            Commission Earned
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            R {affiliate.commission}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">
            Pending
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            R {affiliate.pendingCommission}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">
            Sales
          </h3>

          <h2 className="text-3xl font-bold mt-2">
            {affiliate.totalSales}
          </h2>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow p-6 mb-8">

        <h2 className="font-bold mb-5">

          Referral Link

        </h2>

        <div className="flex gap-3">

          <input

            value={affiliate.referralLink}

            readOnly

            className="flex-1 border rounded-lg p-3"

          />

          <button

            onClick={copyLink}

            className="px-5 rounded-lg bg-green-600 text-white"

          >

            Copy

          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">

            Clicks

          </h3>

          <h2 className="text-3xl font-bold mt-2">

            {affiliate.totalClicks}

          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">

            Conversions

          </h3>

          <h2 className="text-3xl font-bold mt-2">

            {affiliate.conversions}

          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <h3 className="text-zinc-500">

            Conversion Rate

          </h3>

          <h2 className="text-3xl font-bold mt-2">

            {affiliate.totalClicks
              ? (
                  affiliate.conversions /
                  affiliate.totalClicks *
                  100
                ).toFixed(1)
              : 0}%

          </h2>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow">

        <div className="border-b p-5">

          <h2 className="text-xl font-bold">

            Active Campaigns

          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-zinc-100">

            <tr>

              <th className="p-3 text-left">

                Campaign

              </th>

              <th className="p-3">

                Commission

              </th>

              <th className="p-3">

                Sales

              </th>

              <th className="p-3">

                Earned

              </th>

            </tr>

          </thead>

          <tbody>

            {affiliate.campaigns.map(campaign => (

              <tr
                key={campaign.id}
                className="border-t"
              >

                <td className="p-3">

                  {campaign.name}

                </td>

                <td className="p-3 text-center">

                  {campaign.rate}%

                </td>

                <td className="p-3 text-center">

                  {campaign.sales}

                </td>

                <td className="p-3 text-center font-semibold text-green-600">

                  R {campaign.earned}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}