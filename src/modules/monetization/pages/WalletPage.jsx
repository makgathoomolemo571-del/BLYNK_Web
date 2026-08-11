import { useEffect, useState } from "react";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowUpRight,
  RefreshCw
} from "lucide-react";

import monetizationApi from "../services/monetization.api";

export default function WalletPage() {

  const [wallet, setWallet] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {

    loadWallet();

  }, []);

  async function loadWallet() {

    try {

      setLoading(true);

      const data =
        await monetizationApi.getWallet();

      setWallet(data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function refreshWallet() {

    try {

      setRefreshing(true);

      const data =
        await monetizationApi.getWallet();

      setWallet(data);

    } finally {

      setRefreshing(false);

    }

  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading Wallet...
      </div>
    );

  return (

    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Creator Wallet
          </h1>

          <p className="text-zinc-500">
            Manage your earnings and payouts.
          </p>

        </div>

        <button
          onClick={refreshWallet}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl"
        >

          <RefreshCw
            size={18}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>

      <div className="grid lg:grid-cols-4 gap-6">

        <WalletCard
          title="Available"
          value={wallet.available}
          icon={Wallet}
          color="bg-green-600"
        />

        <WalletCard
          title="Pending"
          value={wallet.pending}
          icon={Clock}
          color="bg-orange-500"
        />

        <WalletCard
          title="Lifetime"
          value={wallet.lifetime}
          icon={TrendingUp}
          color="bg-purple-600"
        />

        <WalletCard
          title="Withdrawable"
          value={wallet.withdrawable}
          icon={DollarSign}
          color="bg-blue-600"
        />

      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Revenue Summary
          </h2>

          <table className="w-full">

            <tbody>

              <WalletRow
                label="Advertisements"
                value={wallet.adsRevenue}
              />

              <WalletRow
                label="Subscriptions"
                value={wallet.subscriptionRevenue}
              />

              <WalletRow
                label="Marketplace"
                value={wallet.marketplaceRevenue}
              />

              <WalletRow
                label="Creator Hire"
                value={wallet.creatorHireRevenue}
              />

              <WalletRow
                label="Tips"
                value={wallet.tipsRevenue}
              />

              <WalletRow
                label="Stars"
                value={wallet.starsRevenue}
              />

              <WalletRow
                label="Live"
                value={wallet.liveRevenue}
              />

              <WalletRow
                label="Podcast"
                value={wallet.podcastRevenue}
              />

              <WalletRow
                label="Watch Parties"
                value={wallet.watchPartyRevenue}
              />

            </tbody>

          </table>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Quick Actions
          </h2>

          <button className="w-full mb-3 bg-green-600 text-white rounded-xl py-4 flex justify-center items-center gap-3">

            <ArrowUpRight size={20}/>

            Withdraw

          </button>

          <button className="w-full mb-3 bg-blue-600 text-white rounded-xl py-4 flex justify-center items-center gap-3">

            <CreditCard size={20}/>

            Bank Accounts

          </button>

          <button className="w-full border rounded-xl py-4">

            Payout History

          </button>

        </div>

      </div>

    </div>

  );

}

function WalletCard({
  title,
  value,
  icon: Icon,
  color
}) {

  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white mb-5`}>

        <Icon size={24}/>

      </div>

      <p className="text-zinc-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        R {Number(value || 0).toLocaleString()}
      </h2>

    </div>

  );

}

function WalletRow({
  label,
  value
}) {

  return (

    <tr className="border-b">

      <td className="py-4">

        {label}

      </td>

      <td className="py-4 text-right font-semibold">

        R {Number(value || 0).toLocaleString()}

      </td>

    </tr>

  );

}