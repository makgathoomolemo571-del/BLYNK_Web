// modules/wallet/pages/WalletPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WalletBalance from "../components/WalletBalance";
import WalletCard from "../components/WalletCard";
import TransactionCard from "../components/TransactionCard";

import walletApi from "../services/wallet.api";
import subscriptionApi from "../../subscription/services/subscription.api";

import {
  Wallet,
  Gift,
  Coins,
  Receipt,
  ArrowRight,
  CreditCard,
  RefreshCw
} from "lucide-react";


const WalletPage = () => {

  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);


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


      // ==========================================
      // WALLET
      // ==========================================

      const walletData =
        walletRes?.data?.data ??
        walletRes?.data?.wallet ??
        walletRes?.data ??
        null;

      setWallet(walletData);


      // ==========================================
      // TRANSACTIONS
      // ==========================================

      const rawTransactions =
        transactionsRes?.data?.data ??
        transactionsRes?.data?.transactions ??
        transactionsRes?.data?.items ??
        transactionsRes?.data ??
        [];


      let safeTransactions = [];

      if (Array.isArray(rawTransactions)) {

        safeTransactions = rawTransactions;

      } else if (
        rawTransactions &&
        Array.isArray(rawTransactions.transactions)
      ) {

        safeTransactions = rawTransactions.transactions;

      } else if (
        rawTransactions &&
        Array.isArray(rawTransactions.items)
      ) {

        safeTransactions = rawTransactions.items;

      } else {

        safeTransactions = [];

      }


      setTransactions(safeTransactions);


      // ==========================================
      // SUBSCRIPTION
      // ==========================================

      const subscriptionData =
        subscriptionRes?.data?.data ??
        subscriptionRes?.data?.subscription ??
        subscriptionRes?.data ??
        null;

      setSubscription(subscriptionData);


      console.log("WALLET DATA:", walletData);
      console.log("TRANSACTIONS DATA:", safeTransactions);
      console.log("SUBSCRIPTION DATA:", subscriptionData);

    } catch (error) {

      console.error(
        "WALLET LOAD ERROR:",
        error
      );

      setWallet(null);
      setTransactions([]);
      setSubscription(null);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadWallet();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">

        <div className="text-center">

          <RefreshCw
            className="mx-auto mb-4 animate-spin text-blue-600"
            size={32}
          />

          <p className="text-lg font-medium">
            Loading BLYNK Wallet...
          </p>

        </div>

      </div>
    );

  }


  // ==========================================
  // NO WALLET
  // ==========================================

  if (!wallet) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">

        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm dark:bg-zinc-900">

          <Wallet
            size={42}
            className="mx-auto mb-4 text-blue-600"
          />

          <h2 className="text-xl font-bold">
            Wallet not found
          </h2>

          <p className="mt-2 text-gray-500">
            We couldn't load your BLYNK wallet.
          </p>

          <button
            onClick={loadWallet}
            className="mt-6 rounded-xl border px-5 py-3 font-medium transition hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Try Again
          </button>

        </div>

      </div>
    );

  }


  return (

    <div className="min-h-screen w-full bg-gray-50 dark:bg-zinc-950">

      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">


        {/* =====================================
            HEADER
        ====================================== */}

        <div>

          <p className="text-sm font-medium text-blue-600">
            BLYNK FINANCIAL CENTER
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            BLYNK Wallet
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your balance, rewards, earnings and transactions.
          </p>

        </div>


        {/* =====================================
            BALANCE
        ====================================== */}

        <WalletBalance wallet={wallet} />


        {/* =====================================
            WALLET CARD
        ====================================== */}

        <WalletCard wallet={wallet} />


        {/* =====================================
            SUBSCRIPTION
        ====================================== */}

        {subscription && (

          <section className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center gap-3">

              <div className="rounded-xl border p-3">

                <CreditCard
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="font-bold">
                  Current Subscription
                </h2>

                <p className="text-sm text-gray-500">
                  Your active BLYNK plan
                </p>

              </div>

            </div>


            <div className="mt-5 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border p-4">

                <p className="text-sm text-gray-500">
                  Plan
                </p>

                <p className="mt-1 text-lg font-bold">
                  {subscription.plan || "FREE_MEMBER"}
                </p>

              </div>


              <div className="rounded-xl border p-4">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="mt-1 text-lg font-bold capitalize">
                  {subscription.status || "active"}
                </p>

              </div>

            </div>

          </section>

        )}


        {/* =====================================
            TRANSACTIONS
        ====================================== */}

        <section
          id="transactions"
          className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-900"
        >

          <div className="mb-5 flex items-center gap-3">

            <div className="rounded-xl border p-3">

              <Receipt
                size={22}
                className="text-orange-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Transactions
              </h2>

              <p className="text-sm text-gray-500">
                Your BLYNK wallet history
              </p>

            </div>

          </div>


          {!Array.isArray(transactions) ||
          transactions.length === 0 ? (

            <div className="rounded-xl border border-dashed p-8 text-center">

              <Receipt
                size={36}
                className="mx-auto mb-3 text-gray-400"
              />

              <p className="font-medium">
                No transactions yet
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Your wallet activity will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {transactions.map((transaction, index) => (

                <TransactionCard
                  key={
                    transaction?._id ||
                    transaction?.id ||
                    `transaction-${index}`
                  }
                  transaction={transaction}
                />

              ))}

            </div>

          )}

        </section>


        {/* =====================================
            BOTTOM NAVIGATION
        ====================================== */}

        <section
          id="rewards"
          className="border-t pt-6"
        >

          <h2 className="mb-4 text-lg font-bold">
            BLYNK Wallet Services
          </h2>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


            {/* WALLET */}

            <Link
              to="/wallet"
              className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl border p-3">

                  <Wallet
                    size={22}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="font-bold">
                    Wallet
                  </p>

                  <p className="text-sm text-gray-500">
                    Balance
                  </p>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1"
              />

            </Link>


            {/* REWARDS */}

            <Link
              to="/wallet/rewards"
              className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl border p-3">

                  <Gift
                    size={22}
                    className="text-green-600"
                  />

                </div>

                <div>

                  <p className="font-bold">
                    Rewards
                  </p>

                  <p className="text-sm text-gray-500">
                    Points & vouchers
                  </p>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1"
              />

            </Link>


            {/* MONETIZATION */}

            <Link
              to="/monetization/dashboard"
              className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl border p-3">

                  <Coins
                    size={22}
                    className="text-purple-600"
                  />

                </div>

                <div>

                  <p className="font-bold">
                    Monetization
                  </p>

                  <p className="text-sm text-gray-500">
                    Earn from BLYNK
                  </p>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1"
              />

            </Link>


            {/* TRANSACTIONS */}

            <Link
              to="/wallet/transactions"
              className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl border p-3">

                  <Receipt
                    size={22}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <p className="font-bold">
                    Transactions
                  </p>

                  <p className="text-sm text-gray-500">
                    Wallet history
                  </p>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-gray-400 transition group-hover:translate-x-1"
              />

            </Link>

          </div>

        </section>

      </div>

    </div>

  );

};


export default WalletPage;