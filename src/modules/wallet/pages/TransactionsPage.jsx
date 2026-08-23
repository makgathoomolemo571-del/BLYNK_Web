// modules/wallet/pages/TransactionsPage.jsx

import { useMemo, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

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
  if (
    [
      "deposit",
      "credit",
      "refund",
      "tip",
      "commission",
      "reward",
      "cashback",
    ].includes(String(type).toLowerCase())
  ) {
    return "text-green-600";
  }

  return "text-red-500";
};

const amountPrefix = (type) => {
  if (
    [
      "deposit",
      "credit",
      "refund",
      "tip",
      "commission",
      "reward",
      "cashback",
    ].includes(String(type).toLowerCase())
  ) {
    return "+";
  }

  return "-";
};

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    error,
    refresh,
  } = useTransactions();

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const list = Array.isArray(transactions)
      ? transactions
      : [];

    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return list;
    }

    return list.filter((tx) => {
      return (
        String(tx?.reference || "")
          .toLowerCase()
          .includes(keyword) ||

        String(tx?.type || "")
          .toLowerCase()
          .includes(keyword) ||

        String(tx?.description || "")
          .toLowerCase()
          .includes(keyword) ||

        String(tx?.status || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [transactions, search]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-zinc-500 mt-1">
            Your BLYNK wallet activity history
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border px-4 py-2 font-medium transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            <FaSyncAlt
              className={loading ? "animate-spin" : ""}
            />

            Refresh
          </button>

          <div className="relative w-full md:w-80">

            <FaSearch
              className="absolute left-3 top-3 text-zinc-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-10 pr-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            />

          </div>

        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="rounded-2xl border p-12 text-center dark:border-zinc-800">
          Loading transactions...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border p-12 text-center dark:border-zinc-800">

          <div className="text-lg font-semibold">
            No transactions found
          </div>

          <p className="mt-2 text-zinc-500">
            Your BLYNK wallet transactions will appear here.
          </p>

        </div>
      )}

      {/* TABLE */}
      {!loading && filtered.length > 0 && (

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-zinc-100 dark:bg-zinc-900">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left">
                    Description
                  </th>

                  <th className="px-5 py-4 text-left">
                    Reference
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-right">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((tx) => {

                  const type =
                    String(tx?.type || "transaction")
                      .toLowerCase();

                  const status =
                    String(tx?.status || "pending")
                      .toLowerCase();

                  const prefix =
                    amountPrefix(type);

                  const currency =
                    tx?.currency || "ZAR";

                  const amount =
                    Number(tx?.amount || 0);

                  return (

                    <tr
                      key={
                        tx?.id ||
                        tx?._id ||
                        tx?.reference ||
                        Math.random()
                      }
                      className="border-t border-zinc-200 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                    >

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              prefix === "+"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-red-100 dark:bg-red-900/30"
                            }`}
                          >

                            {prefix === "+" ? (
                              <FaArrowDown className="text-green-600" />
                            ) : (
                              <FaArrowUp className="text-red-500" />
                            )}

                          </div>

                          <span className="font-medium capitalize">
                            {type.replace(/_/g, " ")}
                          </span>

                        </div>

                      </td>

                      <td className="px-5">
                        {tx?.description || "-"}
                      </td>

                      <td className="px-5 text-sm text-zinc-500">
                        {tx?.reference || "-"}
                      </td>

                      <td className="px-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            badgeColors[status] ||
                            "bg-zinc-100 text-zinc-600"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      <td
                        className={`px-5 text-right font-bold ${amountColor(
                          type
                        )}`}
                      >
                        {prefix}
                        {currency}{" "}
                        {amount.toLocaleString()}
                      </td>

                      <td className="px-5 text-right whitespace-nowrap text-sm text-zinc-500">

                        {tx?.createdAt
                          ? new Date(
                              tx.createdAt
                            ).toLocaleString()
                          : "-"}

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}