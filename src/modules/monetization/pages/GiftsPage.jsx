// src/modules/monetization/pages/GiftsPage.jsx

import { useEffect, useState } from "react";
import monetizationApi from "../services/monetization.api";

export default function GiftsPage() {

  const [loading, setLoading] = useState(true);

  const [gifts, setGifts] = useState([]);

  const [summary, setSummary] = useState({
    totalGifts: 0,
    totalCoins: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    loadGifts();
  }, []);

  async function loadGifts() {

    try {

      setLoading(true);

      const data =
        await monetizationApi.getGiftHistory();

      setGifts(data.gifts || []);

      setSummary(
        data.summary || {
          totalGifts: 0,
          totalCoins: 0,
          totalRevenue: 0
        }
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading Gifts...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Gifts
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-zinc-500">
            Total Gifts
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {summary.totalGifts}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-zinc-500">
            Coins Received
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {summary.totalCoins}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-zinc-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-600">
            R {summary.totalRevenue}
          </h2>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-100">

            <tr>

              <th className="p-4 text-left">
                Sender
              </th>

              <th className="p-4 text-left">
                Gift
              </th>

              <th className="p-4 text-left">
                Coins
              </th>

              <th className="p-4 text-left">
                Revenue
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {gifts.length === 0 && (

              <tr>

                <td
                  colSpan="5"
                  className="text-center p-10"
                >
                  No gifts received yet.
                </td>

              </tr>

            )}

            {gifts.map(gift => (

              <tr
                key={gift.id}
                className="border-t"
              >

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <img
                      src={
                        gift.senderAvatar ||
                        "/default-avatar.png"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />

                    <span>
                      {gift.senderName}
                    </span>

                  </div>

                </td>

                <td className="p-4">

                  {gift.giftName}

                </td>

                <td className="p-4">

                  {gift.coins}

                </td>

                <td className="p-4 text-green-600 font-semibold">

                  R {gift.revenue}

                </td>

                <td className="p-4">

                  {new Date(
                    gift.createdAt
                  ).toLocaleDateString()}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}