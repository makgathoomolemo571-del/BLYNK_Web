// src/modules/monetization/pages/SubscriptionRevenue.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

export default function SubscriptionRevenue() {
  const [loading, setLoading] = useState(true);

  const [subscriptions, setSubscriptions] = useState([]);

  const [summary, setSummary] = useState({
    activeSubscribers: 0,
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    lifetimeRevenue: 0
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {

      const { data } =
        await monetizationApi.getSubscriptionRevenue();

      setSubscriptions(data.subscriptions || []);

      setSummary({
        activeSubscribers:
          data.activeSubscribers || 0,

        monthlyRevenue:
          data.monthlyRevenue || 0,

        yearlyRevenue:
          data.yearlyRevenue || 0,

        lifetimeRevenue:
          data.lifetimeRevenue || 0
      });

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading Subscription Revenue...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Subscription Revenue
      </h1>

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">

          <h4 className="text-zinc-500">
            Active Subscribers
          </h4>

          <h2 className="text-3xl font-bold text-blue-600 mt-3">
            {summary.activeSubscribers}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h4 className="text-zinc-500">
            Monthly Revenue
          </h4>

          <h2 className="text-3xl font-bold text-green-600 mt-3">
            R {summary.monthlyRevenue.toLocaleString()}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h4 className="text-zinc-500">
            Yearly Revenue
          </h4>

          <h2 className="text-3xl font-bold text-purple-600 mt-3">
            R {summary.yearlyRevenue.toLocaleString()}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h4 className="text-zinc-500">
            Lifetime Revenue
          </h4>

          <h2 className="text-3xl font-bold text-orange-600 mt-3">
            R {summary.lifetimeRevenue.toLocaleString()}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-5 border-b">

          <h2 className="text-xl font-bold">
            Subscribers
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Subscriber
              </th>

              <th className="text-left p-4">
                Plan
              </th>

              <th className="text-left p-4">
                Started
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-right p-4">
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {subscriptions.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-10"
                >

                  No subscribers yet.

                </td>

              </tr>

            )}

            {subscriptions.map((sub) => (

              <tr
                key={sub.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        sub.profilePicture ||
                        `https://ui-avatars.com/api/?name=${sub.name}`
                      }
                      alt={sub.name}
                      className="w-10 h-10 rounded-full"
                    />

                    <div>

                      <strong>
                        {sub.name}
                      </strong>

                      <p className="text-xs text-zinc-500">
                        @{sub.username}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  {sub.plan}
                </td>

                <td className="p-4">
                  {new Date(
                    sub.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

                    {sub.status}

                  </span>

                </td>

                <td className="p-4 text-right font-bold text-green-600">

                  R {sub.amount}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}