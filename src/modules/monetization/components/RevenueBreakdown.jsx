// src/modules/monetization/components/RevenueBreakdown.jsx

import PropTypes from "prop-types";

const colors = {
  ads: "bg-blue-500",
  subscriptions: "bg-purple-600",
  tips: "bg-green-500",
  gifts: "bg-pink-500",
  marketplace: "bg-orange-500",
  affiliate: "bg-cyan-500",
  sponsors: "bg-red-500",
  podcasts: "bg-yellow-500",
  livestreams: "bg-indigo-500",
  creatorFund: "bg-emerald-600"
};

export default function RevenueBreakdown({

  revenue = {}

}) {

  const items = [

    {
      key: "ads",
      label: "Advertising Revenue",
      value: revenue.ads || 0
    },

    {
      key: "subscriptions",
      label: "Subscriptions",
      value: revenue.subscriptions || 0
    },

    {
      key: "tips",
      label: "Tips",
      value: revenue.tips || 0
    },

    {
      key: "gifts",
      label: "Virtual Gifts",
      value: revenue.gifts || 0
    },

    {
      key: "marketplace",
      label: "Marketplace",
      value: revenue.marketplace || 0
    },

    {
      key: "affiliate",
      label: "Affiliate",
      value: revenue.affiliate || 0
    },

    {
      key: "sponsors",
      label: "Sponsors",
      value: revenue.sponsors || 0
    },

    {
      key: "podcasts",
      label: "Podcasts",
      value: revenue.podcasts || 0
    },

    {
      key: "livestreams",
      label: "Live Streams",
      value: revenue.livestreams || 0
    },

    {
      key: "creatorFund",
      label: "Creator Fund",
      value: revenue.creatorFund || 0
    }

  ];

  const total = items.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">

        Revenue Breakdown

      </h2>

      <div className="space-y-5">

        {items.map(item => {

          const percent =
            total === 0
              ? 0
              : (item.value / total) * 100;

          return (

            <div key={item.key}>

              <div className="flex justify-between mb-2">

                <span className="font-medium">

                  {item.label}

                </span>

                <span className="font-semibold">

                  R{item.value.toLocaleString()}

                </span>

              </div>

              <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">

                <div

                  className={`${colors[item.key]} h-3 transition-all duration-700`}

                  style={{
                    width: `${percent}%`
                  }}

                />

              </div>

              <div className="text-right text-xs text-zinc-500 mt-1">

                {percent.toFixed(1)}%

              </div>

            </div>

          );

        })}

      </div>

      <div className="border-t mt-8 pt-6 flex justify-between">

        <span className="text-xl font-bold">

          Total Revenue

        </span>

        <span className="text-2xl font-bold text-blue-600">

          R{total.toLocaleString()}

        </span>

      </div>

    </div>

  );

}

RevenueBreakdown.propTypes = {

  revenue: PropTypes.shape({

    ads: PropTypes.number,

    subscriptions: PropTypes.number,

    tips: PropTypes.number,

    gifts: PropTypes.number,

    marketplace: PropTypes.number,

    affiliate: PropTypes.number,

    sponsors: PropTypes.number,

    podcasts: PropTypes.number,

    livestreams: PropTypes.number,

    creatorFund: PropTypes.number

  })

};