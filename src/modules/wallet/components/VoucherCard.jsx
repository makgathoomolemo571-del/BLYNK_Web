// modules/wallet/components/VoucherCard.jsx

import PropTypes from "prop-types";
import {
  FaGift,
  FaCoins,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const STATUS = {
  available: {
    icon: <FaGift />,
    color: "bg-green-600",
    text: "Available",
  },

  redeemed: {
    icon: <FaCheckCircle />,
    color: "bg-blue-600",
    text: "Redeemed",
  },

  pending: {
    icon: <FaClock />,
    color: "bg-yellow-500",
    text: "Pending",
  },

  expired: {
    icon: <FaTimesCircle />,
    color: "bg-red-600",
    text: "Expired",
  },
};

export default function VoucherCard({
  voucher,
  onRedeem,
}) {
  const badge =
    STATUS[voucher.status] ||
    STATUS.available;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between p-5">

        <div>

          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            {voucher.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            {voucher.description}
          </p>

        </div>

        <div
          className={`${badge.color} text-white rounded-full px-3 py-2 flex items-center gap-2 text-sm`}
        >
          {badge.icon}
          {badge.text}
        </div>

      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800">

        <div className="grid grid-cols-2">

          <div className="p-5">

            <span className="text-xs uppercase tracking-wide text-zinc-500">
              Cost
            </span>

            <div className="mt-2 flex items-center gap-2">

              <FaCoins className="text-yellow-500" />

              <span className="font-bold text-xl">
                {voucher.pointsRequired.toLocaleString()}
              </span>

              <span className="text-sm text-zinc-500">
                VIG
              </span>

            </div>

          </div>

          <div className="p-5">

            <span className="text-xs uppercase tracking-wide text-zinc-500">
              Category
            </span>

            <div className="mt-2 font-semibold">
              {voucher.category}
            </div>

          </div>

        </div>

      </div>

      {voucher.expiryDate && (
        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">

          Expires:

          {" "}

          {new Date(
            voucher.expiryDate
          ).toLocaleDateString()}

        </div>
      )}

      <div className="p-5">

        <button
          disabled={
            voucher.status !== "available"
          }
          onClick={() => onRedeem(voucher)}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 disabled:cursor-not-allowed text-white py-3 font-semibold transition"
        >
          Redeem Voucher
        </button>

      </div>

    </div>
  );
}

VoucherCard.propTypes = {

  voucher: PropTypes.shape({

    id: PropTypes.string.isRequired,

    title: PropTypes.string.isRequired,

    description: PropTypes.string,

    category: PropTypes.string,

    pointsRequired:
      PropTypes.number.isRequired,

    expiryDate: PropTypes.string,

    status: PropTypes.oneOf([
      "available",
      "redeemed",
      "pending",
      "expired",
    ]),

  }).isRequired,

  onRedeem:
    PropTypes.func.isRequired,

};