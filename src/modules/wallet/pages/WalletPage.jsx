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
} from "lucide-react";

const WalletPage = () => {

  // =========================
  // STATE
  // =========================

  const [wallet, setWallet] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [subscription, setSubscription] = useState(null);

  const [loading, setLoading] = useState(true);


  // =========================
  // LOAD WALLET
  // =========================

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


      // =========================
      // WALLET
      // =========================

      const walletData =
        walletRes?.data?.data ??
        walletRes?.data ??
        null;


      // =========================
      // TRANSACTIONS
      // =========================

      const transactionData =
        transactionsRes?.data?.data ??
        transactionsRes?.data?.transactions ??
        transactionsRes?.data ??
        [];


      // =========================
      // SUBSCRIPTION
      // =========================

      const subscriptionData =
        subscriptionRes?.data?.data ??
        subscriptionRes?.data ??
        null;


      // =========================
      // SAVE STATE
      // =========================

      setWallet(walletData);

      setTransactions(
        Array.isArray(transactionData)
          ? transactionData
          : []
      );

      setSubscription(subscriptionData);


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


  // =========================
  // LOAD ON PAGE OPEN
  // =========================

  useEffect(() => {

    loadWallet();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />

          <p className="text-lg font-medium">
            Loading your BLYNK Wallet...
          </p>

        </div>

      </div>

    );

  }


  // =========================
  // NO WALLET
  // =========================

  if (!wallet) {

    return (

      <div className="min-h-screen flex items-center justify-center p-6">

        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm dark:bg-zinc-900">

          <Wallet className="mx-auto mb-4 h-12 w-12 text-red-500" />

          <h2 className="mb-2 text-xl font-bold">
            Wallet not found
          </h2>

          <p className="mb-6 text-sm text-zinc-500">
            We could not load your BLYNK Wallet.
          </p>

          <button
            onClick={loadWallet}
            className="rounded-xl border px-5 py-3 font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Try Again
          </button>

        </div>

      </div>

    );

  }


  // =========================
  // PAGE
  // =========================

  return (

    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">


      {/* =========================
          HEADER
      ========================= */}

      <div>

        <h1 className="text-2xl md:text-3xl font-bold">
          BLYNK Wallet
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your balance, rewards, subscription and transactions.
        </p>

      </div>


      {/* =========================
          BALANCE
      ========================= */}

      <WalletBalance wallet={wallet} />


      {/* =========================
          WALLET CARD
      ========================= */}

      <WalletCard wallet={wallet} />


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <section>

        <h2 className="mb-4 text-xl font-bold">
          Wallet
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


          {/* WALLET */}

          <Link
            to="/wallet"
            className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-start justify-between">

              <div className="rounded-xl border p-3">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>

              <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />

            </div>

            <h3 className="mt-4 font-bold">
              Wallet
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              View your BLYNK balance.
            </p>

          </Link>


          {/* REWARDS */}

          <Link
            to="/wallet/rewards"
            className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-start justify-between">

              <div className="rounded-xl border p-3">
                <Gift className="h-6 w-6 text-green-600" />
              </div>

              <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />

            </div>

            <h3 className="mt-4 font-bold">
              Rewards
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              VIG points, vouchers and BLYNK rewards.
            </p>

          </Link>


          {/* MONETIZATION */}

          <Link
            to="/monetization/dashboard"
            className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-start justify-between">

              <div className="rounded-xl border p-3">
                <Coins className="h-6 w-6 text-purple-600" />
              </div>

              <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />

            </div>

            <h3 className="mt-4 font-bold">
              Monetization
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Earn money through BLYNK.
            </p>

          </Link>


          {/* TRANSACTIONS */}

          <Link
            to="/wallet/transactions"
            className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-start justify-between">

              <div className="rounded-xl border p-3">
                <Receipt className="h-6 w-6 text-orange-600" />
              </div>

              <ArrowRight className="h-5 w-5 text-zinc-400 transition group-hover:translate-x-1" />

            </div>

            <h3 className="mt-4 font-bold">
              Transactions
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              View your wallet history.
            </p>

          </Link>

        </div>

      </section>


      {/* =========================
          SUBSCRIPTION
      ========================= */}

      {subscription && (

        <section>

          <h2 className="mb-4 text-xl font-bold">
            Current Subscription
          </h2>

          <div className="rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="rounded-xl border p-3">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>

                <div>

                  <p className="font-bold">
                    {subscription.plan || "FREE_MEMBER"}
                  </p>

                  <p className="text-sm text-zinc-500">
                    Status:{" "}
                    <span className="font-medium text-green-600">
                      {subscription.status || "active"}
                    </span>
                  </p>

                </div>

              </div>


              <Link
                to="/subscriptions"
                className="rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Manage
              </Link>

            </div>

          </div>

        </section>

      )}


      {/* =========================
          TRANSACTIONS
      ========================= */}

      <section>

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Recent Transactions
            </h2>

            <p className="text-sm text-zinc-500">
              Your latest BLYNK wallet activity.
            </p>

          </div>

          <Link
            to="/wallet/transactions"
            className="hidden sm:flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>


        <div className="space-y-3">

          {transactions.length === 0 ? (

            <div className="rounded-2xl border bg-white p-8 text-center dark:bg-zinc-900">

              <Receipt className="mx-auto mb-3 h-10 w-10 text-zinc-400" />

              <h3 className="font-semibold">
                No transactions yet
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Your wallet activity will appear here.
              </p>

            </div>

          ) : (

            transactions.map((transaction, index) => (

              <TransactionCard
                key={
                  transaction?._id ||
                  transaction?.id ||
                  index
                }
                transaction={transaction}
              />

            ))

          )}

        </div>


        {/* MOBILE VIEW ALL */}

        <div className="mt-4 sm:hidden">

          <Link
            to="/wallet/transactions"
            className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold"
          >
            View All Transactions
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

      </section>


      {/* =========================
          BOTTOM ACTIONS
      ========================= */}

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">

        <Link
          to="/subscriptions"
          className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <CreditCard className="h-5 w-5" />
          Manage Subscription
        </Link>


        <Link
          to="/wallet/rewards"
          className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          <Gift className="h-5 w-5" />
          View Rewards
        </Link>


        <Link
          to="/support/create"
          className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
        >
          Need Help?
        </Link>

      </section>


    </div>

  );

};

export default WalletPage;