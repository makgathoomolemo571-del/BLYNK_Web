// modules/wallet/pages/TransactionsPage.jsx

import { useEffect, useMemo, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";
import useTransactions from "../hooks/useTransactions";

const badgeColors = {
  completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  failed:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

  cancelled:
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

const amountColor = (type) => {
  if (["deposit", "credit", "refund", "tip", "commission"].includes(type))
    return "text-green-600";

  return "text-red-500";
};

const amountPrefix = (type) => {
  if (["deposit", "credit", "refund", "tip", "commission"].includes(type))
    return "+";

  return "-";
};

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    error,
    getTransactions,
  } = useTransactions();

  const [search, setSearch] = useState("");

  useEffect(() => {
    getTransactions();
  }, []);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const keyword = search.toLowerCase();

      return (
        tx.reference?.toLowerCase().includes(keyword) ||
        tx.type?.toLowerCase().includes(keyword) ||
        tx.description?.toLowerCase().includes(keyword) ||
        tx.status?.toLowerCase().includes(keyword)
      );
    });
  }, [transactions, search]);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-zinc-500 mt-1">
            Wallet activity history
          </p>

        </div>

        <div className="relative w-80">

          <FaSearch
            className="absolute left-3 top-3 text-zinc-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search..."
            className="w-full rounded-xl border pl-10 pr-4 py-2 bg-white dark:bg-zinc-900"
          />

        </div>

      </div>

      {loading && (
        <div className="text-center py-20">
          Loading transactions...
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}

      {!loading &&
        filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No transactions found.
          </div>
        )}

      {!loading &&
        filtered.length > 0 && (

        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-100 dark:bg-zinc-900">

              <tr>

                <th className="text-left px-5 py-4">
                  Type
                </th>

                <th className="text-left px-5 py-4">
                  Description
                </th>

                <th className="text-left px-5 py-4">
                  Reference
                </th>

                <th className="text-left px-5 py-4">
                  Status
                </th>

                <th className="text-right px-5 py-4">
                  Amount
                </th>

                <th className="text-right px-5 py-4">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((tx) => (

                <tr
                  key={tx.id}
                  className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >

                  <td className="px-5 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`rounded-full p-2 ${
                          amountPrefix(tx.type) === "+"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {amountPrefix(tx.type) === "+" ? (
                          <FaArrowDown className="text-green-600" />
                        ) : (
                          <FaArrowUp className="text-red-500" />
                        )}
                      </div>

                      <span className="capitalize font-medium">
                        {tx.type.replace("_", " ")}
                      </span>

                    </div>

                  </td>

                  <td className="px-5">
                    {tx.description || "-"}
                  </td>

                  <td className="px-5">
                    {tx.reference || "-"}
                  </td>

                  <td className="px-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        badgeColors[tx.status]
                      }`}
                    >
                      {tx.status}
                    </span>

                  </td>

                  <td
                    className={`px-5 text-right font-bold ${amountColor(
                      tx.type
                    )}`}
                  >
                    {amountPrefix(tx.type)}
                    {tx.currency}{" "}
                    {Number(tx.amount).toLocaleString()}
                  </td>

                  <td className="px-5 text-right whitespace-nowrap">
                    {new Date(
                      tx.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}