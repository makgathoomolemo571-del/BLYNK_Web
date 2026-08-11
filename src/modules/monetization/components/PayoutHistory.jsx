// src/modules/monetization/components/PayoutHistory.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700"
};

export default function PayoutHistory() {

  const [loading, setLoading] = useState(true);

  const [payouts, setPayouts] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {

    loadPayouts();

  }, []);

  async function loadPayouts() {

    try {

      setLoading(true);

      const data =
        await monetizationApi.getPayouts();

      setPayouts(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to load payout history."
      );

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="bg-white rounded-xl shadow p-6">

        Loading payout history...

      </div>

    );

  }

  if (error) {

    return (

      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6">

        {error}

      </div>

    );

  }

  return (

    <div className="bg-white rounded-xl shadow">

      <div className="border-b px-6 py-4">

        <h2 className="text-xl font-bold">

          Payout History

        </h2>

      </div>

      {payouts.length === 0 && (

        <div className="p-10 text-center text-zinc-500">

          No payouts yet.

        </div>

      )}

      {payouts.length > 0 && (

        <table className="w-full">

          <thead className="bg-zinc-50">

            <tr>

              <th className="text-left p-4">

                Date

              </th>

              <th className="text-left p-4">

                Amount

              </th>

              <th className="text-left p-4">

                Method

              </th>

              <th className="text-left p-4">

                Reference

              </th>

              <th className="text-left p-4">

                Status

              </th>

            </tr>

          </thead>

          <tbody>

            {payouts.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-zinc-50"
              >

                <td className="p-4">

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </td>

                <td className="p-4 font-semibold">

                  R
                  {Number(
                    item.amount || 0
                  ).toFixed(2)}

                </td>

                <td className="p-4">

                  {item.method}

                </td>

                <td className="p-4">

                  {item.reference}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      STATUS_COLORS[
                        item.status
                      ] ||
                      "bg-zinc-100 text-zinc-700"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}