// src/modules/monetization/pages/AdRevenue.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  DollarSign,
  Eye,
  MousePointerClick,
  BarChart3,
  TrendingUp,
  Calendar
} from "lucide-react";

import {
  loadAdRevenue
} from "../store/monetizationSlice";

export default function AdRevenue() {

  const dispatch = useDispatch();

  const {
    adRevenue,
    loading
  } = useSelector(
    state => state.monetization
  );

  useEffect(() => {

    dispatch(loadAdRevenue());

  }, [dispatch]);

  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading advertisement revenue...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Advertisement Revenue
        </h1>

        <p className="text-zinc-500 mt-2">
          View your earnings from ads displayed on your content.
        </p>

      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="rounded-xl bg-white shadow p-6">

          <DollarSign
            className="text-green-600 mb-3"
            size={30}
          />

          <p className="text-sm text-zinc-500">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            R {adRevenue.totalRevenue}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <Eye
            className="text-blue-600 mb-3"
            size={30}
          />

          <p className="text-sm text-zinc-500">
            Impressions
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {adRevenue.impressions}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <MousePointerClick
            className="text-purple-600 mb-3"
            size={30}
          />

          <p className="text-sm text-zinc-500">
            Clicks
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {adRevenue.clicks}
          </h2>

        </div>

        <div className="rounded-xl bg-white shadow p-6">

          <TrendingUp
            className="text-orange-500 mb-3"
            size={30}
          />

          <p className="text-sm text-zinc-500">
            CPM
          </p>

          <h2 className="text-3xl font-bold mt-2">
            R {adRevenue.cpm}
          </h2>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow p-6">

        <div className="flex items-center gap-2 mb-5">

          <BarChart3 />

          <h2 className="text-xl font-semibold">

            Revenue Breakdown

          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <p className="text-zinc-500">
              RPM
            </p>

            <h3 className="text-2xl font-bold">
              R {adRevenue.rpm}
            </h3>

          </div>

          <div>

            <p className="text-zinc-500">
              CTR
            </p>

            <h3 className="text-2xl font-bold">
              {adRevenue.ctr}%
            </h3>

          </div>

          <div>

            <p className="text-zinc-500">
              Estimated This Month
            </p>

            <h3 className="text-2xl font-bold">
              R {adRevenue.monthRevenue}
            </h3>

          </div>

          <div>

            <p className="text-zinc-500">
              Estimated Today
            </p>

            <h3 className="text-2xl font-bold">
              R {adRevenue.todayRevenue}
            </h3>

          </div>

        </div>

      </div>

      <div className="rounded-xl bg-white shadow">

        <div className="flex items-center gap-2 p-6 border-b">

          <Calendar />

          <h2 className="text-xl font-semibold">
            Recent Earnings
          </h2>

        </div>

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="p-4">Date</th>

              <th className="p-4">Content</th>

              <th className="p-4">Views</th>

              <th className="p-4">Revenue</th>

            </tr>

          </thead>

          <tbody>

            {adRevenue.history?.map(item => (

              <tr
                key={item.id}
                className="border-b hover:bg-zinc-50"
              >

                <td className="p-4">
                  {item.date}
                </td>

                <td className="p-4">
                  {item.content}
                </td>

                <td className="p-4">
                  {item.views}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  R {item.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}