// modules/subscription/components/BillingHistory.jsx

import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

const statusColors = {
  paid: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const statusIcons = {
  paid: <FaCheckCircle />,
  pending: <FaClock />,
  failed: <FaTimesCircle />,
};

const BillingHistory = ({ history = [] }) => {
  const records = useMemo(
    () =>
      [...history].sort(
        (a, b) =>
          new Date(b.paymentDate || b.createdAt) -
          new Date(a.paymentDate || a.createdAt)
      ),
    [history]
  );

  if (!records.length) {
    return (
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 text-center">
        <FaCreditCard className="mx-auto text-5xl text-zinc-400 mb-4" />

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          No Billing History
        </h2>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Your subscription payments will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Plan
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Billing
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => (
              <tr
                key={item.id}
                className="border-t border-zinc-200 dark:border-zinc-800"
              >
                <td className="px-5 py-4 font-semibold">
                  {item.plan}
                </td>

                <td className="px-5 py-4">
                  {item.currency || "ZAR"}{" "}
                  {Number(item.amount || 0).toFixed(2)}
                </td>

                <td className="px-5 py-4 capitalize">
                  {item.billing || "monthly"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />

                    {new Date(
                      item.paymentDate || item.createdAt
                    ).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColors[item.status] ||
                      statusColors.pending
                    }`}
                  >
                    {statusIcons[item.status] ||
                      statusIcons.pending}

                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

BillingHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,

      plan: PropTypes.string.isRequired,

      amount: PropTypes.number,

      currency: PropTypes.string,

      billing: PropTypes.string,

      paymentDate: PropTypes.string,

      createdAt: PropTypes.string,

      status: PropTypes.oneOf([
        "paid",
        "pending",
        "failed",
      ]),
    })
  ),
};

export default memo(BillingHistory);