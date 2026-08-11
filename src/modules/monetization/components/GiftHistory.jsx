import { Gift, Coins } from "lucide-react";

export default function GiftHistory({
  gifts = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Gift History
        </h2>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200" />

              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>

              <div className="h-5 bg-gray-200 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">

      <div className="flex items-center justify-between p-6 border-b">

        <h2 className="text-xl font-bold">
          Gift History
        </h2>

        <Gift className="text-pink-500" />

      </div>

      {gifts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">

          <Gift
            size={52}
            className="mx-auto mb-4 text-pink-300"
          />

          <p>No gifts received yet.</p>

        </div>
      ) : (
        <div className="divide-y">

          {gifts.map((gift) => (

            <div
              key={gift.id}
              className="flex items-center justify-between p-5 hover:bg-gray-50 transition"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    gift.senderAvatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      gift.senderName || "User"
                    )}`
                  }
                  alt={gift.senderName}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-semibold">
                    {gift.senderName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {gift.giftName}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      gift.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <div className="flex items-center justify-end gap-1 font-bold text-amber-600">

                  <Coins size={18} />

                  {gift.coins}

                </div>

                <div className="text-sm text-green-600">

                  +R
                  {(
                    gift.amount || 0
                  ).toFixed(2)}

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}