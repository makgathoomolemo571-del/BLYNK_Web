// modules/wallet/pages/WalletPage.jsx

import { useEffect, useState } from "react";

import WalletBalance from "../components/WalletBalance";
import WalletCard from "../components/WalletCard";
import TransactionCard from "../components/TransactionCard";

import walletApi from "../services/wallet.api";
import CurrentPlan from "../../subscription/components/CurrentPlan";
import subscriptionApi from "../../subscription/services/subscription.api";
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

      <div className="flex justify-end">

<Link

to="/monetization"

className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:opacity-90"

>

💰 Monetization

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
    <CurrentPlan
        subscription={subscription}
    />
)}

        </div>

      </section>

    </div>
  );
};

export default WalletPage;