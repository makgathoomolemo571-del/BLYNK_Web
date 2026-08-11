 // modules/wallet/pages/RewardsPage.jsx

import { useEffect, useMemo, useState } from "react";
import { Gift, Trophy, Coins, Ticket, Wallet } from "lucide-react";

import useWallet from "../hooks/useWallet";
import useTransactions from "../hooks/useTransactions";

const RewardCard = ({ icon, title, value, color }) => (
  <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <div
      className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
    >
      {icon}
    </div>

    <p className="text-sm text-zinc-500">{title}</p>

    <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
      {value}
    </h2>
  </div>
);

export default function RewardsPage() {
  const { wallet, getWallet } = useWallet();
  const { transactions, getTransactions } = useTransactions();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await Promise.all([
        getWallet(),
        getTransactions(),
      ]);

      setLoading(false);
    })();
  }, []);

  const rewardStats = useMemo(() => {
    const tx = transactions || [];

    const revenue = tx
      .filter(
        (t) =>
          t.type === "commission" ||
          t.type === "tip" ||
          t.type === "marketplace" ||
          t.type === "creator_hire" ||
          t.type === "business_payment"
      )
      .reduce((a, b) => a + Number(b.amount), 0);

    const deposits = tx
      .filter((t) => t.type === "deposit")
      .reduce((a, b) => a + Number(b.amount), 0);

    const vouchers = Math.floor(revenue / 100);

    const vigPoints = Math.floor(revenue);

    return {
      revenue,
      deposits,
      vouchers,
      vigPoints,
    };
  }, [transactions]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg font-semibold">
          Loading rewards...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">

      <div>
        <h1 className="text-3xl font-bold">
          Rewards
        </h1>

        <p className="mt-2 text-zinc-500">
          Earn VIG Points from activity and
          redeem them for vouchers.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">

        <RewardCard
          title="Wallet Balance"
          value={`${wallet?.currency ?? "ZAR"} ${Number(
            wallet?.balance || 0
          ).toLocaleString()}`}
          icon={<Wallet size={26} />}
          color="bg-blue-100 text-blue-600"
        />

        <RewardCard
          title="VIG Points"
          value={rewardStats.vigPoints.toLocaleString()}
          icon={<Coins size={26} />}
          color="bg-amber-100 text-amber-600"
        />

        <RewardCard
          title="Voucher Credits"
          value={rewardStats.vouchers}
          icon={<Ticket size={26} />}
          color="bg-green-100 text-green-600"
        />

        <RewardCard
          title="Total Revenue"
          value={`R ${rewardStats.revenue.toLocaleString()}`}
          icon={<Trophy size={26} />}
          color="bg-purple-100 text-purple-600"
        />

      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <div className="mb-5 flex items-center gap-3">
          <Gift className="text-green-600" />

          <h2 className="text-xl font-semibold">
            Reward Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Type
                </th>

                <th className="py-3 text-left">
                  Amount
                </th>

                <th className="py-3 text-left">
                  Status
                </th>

                <th className="py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {transactions?.map((tx) => (

                <tr
                  key={tx.id}
                  className="border-b last:border-0"
                >

                  <td className="py-4 capitalize">
                    {tx.type.replaceAll("_", " ")}
                  </td>

                  <td className="py-4">
                    {tx.currency}{" "}
                    {Number(tx.amount).toLocaleString()}
                  </td>

                  <td className="py-4 capitalize">
                    {tx.status}
                  </td>

                  <td className="py-4">
                    {new Date(
                      tx.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">

        <h2 className="mb-3 text-xl font-bold">
          Redemption Rules
        </h2>

        <ul className="space-y-2 text-sm">

          <li>
            • Money cannot be withdrawn directly.
          </li>

          <li>
            • Revenue converts into VIG Points.
          </li>

          <li>
            • VIG Points can be redeemed for
            approved vouchers.
          </li>

          <li>
            • Supported voucher categories:
            Grocery, Fuel, Clothing,
            Electronics, Airtime and Partner
            Stores.
          </li>

        </ul>

      </div>

    </div>
  );
}