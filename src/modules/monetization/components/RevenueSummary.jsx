// src/modules/monetization/components/RevenueSummary.jsx

import PropTypes from "prop-types";
import {
  Wallet,
  TrendingUp,
  Clock3,
  DollarSign,
  CreditCard,
  PiggyBank
} from "lucide-react";

const currency = (value) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR"
  }).format(value || 0);

export default function RevenueSummary({
  summary
}) {

  const cards = [

    {
      title: "Available Balance",
      value: currency(summary.availableBalance),
      color: "bg-green-500",
      icon: Wallet
    },

    {
      title: "Pending Earnings",
      value: currency(summary.pendingBalance),
      color: "bg-yellow-500",
      icon: Clock3
    },

    {
      title: "Lifetime Earnings",
      value: currency(summary.totalEarnings),
      color: "bg-blue-600",
      icon: TrendingUp
    },

    {
      title: "This Month",
      value: currency(summary.monthlyEarnings),
      color: "bg-purple-600",
      icon: DollarSign
    },

    {
      title: "Withdrawn",
      value: currency(summary.withdrawn),
      color: "bg-red-500",
      icon: CreditCard
    },

    {
      title: "Estimated Next Payout",
      value: currency(summary.nextPayout),
      color: "bg-cyan-600",
      icon: PiggyBank
    }

  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {cards.map(card => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="bg-white rounded-2xl shadow p-6 border"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
              >

                <Icon size={28} />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}

RevenueSummary.propTypes = {

  summary: PropTypes.shape({

    availableBalance: PropTypes.number,

    pendingBalance: PropTypes.number,

    totalEarnings: PropTypes.number,

    monthlyEarnings: PropTypes.number,

    withdrawn: PropTypes.number,

    nextPayout: PropTypes.number

  }).isRequired

};