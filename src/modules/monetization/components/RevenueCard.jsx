// src/modules/monetization/components/RevenueCard.jsx

import PropTypes from "prop-types";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign
} from "lucide-react";

export default function RevenueCard({
  title,
  amount = 0,
  icon,
  color = "blue",
  percentage = 0,
  subtitle = "",
  loading = false
}) {

  const Icon = icon || Wallet;

  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    pink: "bg-pink-500",
    indigo: "bg-indigo-500"
  };

  return (

    <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-all p-6 border">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-gray-500">

            {title}

          </p>

          {loading ? (

            <div className="h-8 w-36 bg-gray-200 animate-pulse rounded mt-2"/>

          ) : (

            <h2 className="text-3xl font-bold mt-2">

              R {Number(amount).toLocaleString()}

            </h2>

          )}

          {subtitle && (

            <p className="text-sm text-gray-400 mt-1">

              {subtitle}

            </p>

          )}

        </div>

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${colors[color]}`}
        >

          <Icon size={30}/>

        </div>

      </div>

      <div className="mt-6 flex items-center">

        {percentage >= 0 ? (

          <TrendingUp
            size={18}
            className="text-green-600"
          />

        ) : (

          <TrendingDown
            size={18}
            className="text-red-600"
          />

        )}

        <span
          className={`ml-2 font-semibold ${
            percentage >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >

          {Math.abs(percentage)}%

        </span>

        <span className="text-gray-400 ml-2">

          vs last month

        </span>

      </div>

    </div>

  );

}

RevenueCard.propTypes = {

  title: PropTypes.string.isRequired,

  amount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),

  icon: PropTypes.elementType,

  color: PropTypes.string,

  percentage: PropTypes.number,

  subtitle: PropTypes.string,

  loading: PropTypes.bool

};