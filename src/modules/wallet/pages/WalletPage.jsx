// modules/wallet/pages/WalletPage.jsx
import { useEffect, useState } from "react";

import WalletBalance from "../components/WalletBalance";
import WalletCard from "../components/WalletCard";
import TransactionCard from "../components/TransactionCard";

import walletApi from "../services/wallet.api";

import CurrentPlan from "../../subscription/components/CurrentPlan";
import subscriptionApi from "../../subscription/services/subscription.api";

import {
  Wallet,
  Gift,
  Coins,
  Receipt
} from "lucide-react";

import { Link } from "react-router-dom";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);

const loadWallet = async () => {
    try {

        setLoading(true);

        const [
            walletRes,
            transactionsRes,
            subscriptionRes
        ] = await Promise.all([

            walletApi.getMine(),

            walletApi.getTransactions(),

            subscriptionApi.getMine()

        ]);

        setWallet(walletRes.data);

        setTransactions(transactionsRes.data);

        setSubscription(subscriptionRes.data);

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }
};

  useEffect(() => {
    loadWallet();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading wallet...
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        Wallet not found.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">

      <WalletBalance wallet={wallet} />

<div className="grid grid-cols-2 gap-4 md:grid-cols-4">

  <Link
    to="/wallet"
    className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-zinc-900"
  >
    <Wallet className="text-blue-600" />
    <div>
      <p className="font-semibold">Wallet</p>
      <p className="text-sm text-zinc-500">
        Balance
      </p>
    </div>
  </Link>

  <Link
    to="/wallet/rewards"
    className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-zinc-900"
  >
    <Gift className="text-green-600" />
    <div>
      <p className="font-semibold">Rewards</p>
      <p className="text-sm text-zinc-500">
        VIG Points & vouchers
      </p>
    </div>
  </Link>

  <Link
    to="/monetization"
    className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-zinc-900"
  >
    <Coins className="text-purple-600" />
    <div>
      <p className="font-semibold">Monetization</p>
      <p className="text-sm text-zinc-500">
        Earn from BLYNK
      </p>
    </div>
  </Link>

  <Link
    to="/wallet/transactions"
    className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-zinc-900"
  >
    <Receipt className="text-orange-600" />
    <div>
      <p className="font-semibold">Transactions</p>
      <p className="text-sm text-zinc-500">
        Wallet history
      </p>
    </div>
  </Link>

</div>

      <WalletCard wallet={wallet} />

      <section>

        <h2 className="text-xl font-semibold mb-4">
          Transactions
        </h2>

        <div className="space-y-3">

          {transactions.length === 0 ? (
            <div className="rounded-lg border p-6 text-center text-gray-500">
              No transactions available.
            </div>
          ) : (
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))
          )}

          {subscription && (
  <div>
    <p>{subscription.plan}</p>
    <p>{subscription.status}</p>
  </div>
)}

        </div>

      </section>

    </div>
  );
};

export default WalletPage;