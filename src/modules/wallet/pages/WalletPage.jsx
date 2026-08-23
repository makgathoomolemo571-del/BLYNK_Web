// modules/wallet/pages/WalletPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WalletBalance from "../components/WalletBalance";
import TransactionCard from "../components/TransactionCard";

import walletApi from "../services/wallet.api";
import subscriptionApi from "../../subscription/services/subscription.api";

import {
  Wallet,
  Gift,
  Coins,
  Receipt,
  ArrowRight
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

      // =========================
      // WALLET
      // =========================

      const walletData =
        walletRes?.data?.data ??
        walletRes?.data ??
        null;

      setWallet(walletData);

      // =========================
      // TRANSACTIONS
      // =========================

      const transactionData =
        transactionsRes?.data?.data ??
        transactionsRes?.data?.transactions ??
        transactionsRes?.data ??
        [];

      setTransactions(
        Array.isArray(transactionData)
          ? transactionData
          : []
      );

      // =========================
      // SUBSCRIPTION
      // =========================

      const subscriptionData =
        subscriptionRes?.data?.data ??
        subscriptionRes?.data ??
        null;

      setSubscription(subscriptionData);

    } catch (error) {
      console.error("WALLET LOAD ERROR:", error);

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

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl border bg-white px-8 py-6 shadow-sm dark:bg-zinc-900">
          <p className="text-lg font-medium">
            Loading BLYNK Wallet...
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-white px-8 py-6 text-center shadow-sm dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-red-600">
            Wallet not found
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            We couldn't load your BLYNK wallet.
          </p>

          <button
            onClick={loadWallet}
            className="mt-5 rounded-xl border px-5 py-2 font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">

      {/* =====================================
          WALLET HEADER
      ====================================== */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
            <Wallet size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              BLYNK Wallet
            </h1>

            <p className="text-sm text-zinc-500">
              Manage your BLYNK balance, rewards and earnings.
            </p>
          </div>

        </div>

      </div>


      {/* =====================================
          BALANCE
      ====================================== */}

      <WalletBalance wallet={wallet} />


      {/* =====================================
          SUBSCRIPTION
      ====================================== */}

      {subscription && (
        <section className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-sm text-zinc-500">
                Current subscription
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {subscription.plan || "FREE_MEMBER"}
              </h2>
            </div>

            <div className="rounded-full border px-4 py-2 text-sm font-medium">
              {subscription.status || "active"}
            </div>

          </div>

        </section>
      )}


      {/* =====================================
          TRANSACTIONS
      ====================================== */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Transactions
            </h2>

            <p className="text-sm text-zinc-500">
              Your recent wallet activity.
            </p>
          </div>

        </div>


        {transactions.length === 0 ? (

          <div className="rounded-2xl border border-dashed p-8 text-center">

            <Receipt
              className="mx-auto mb-3 text-zinc-400"
              size={32}
            />

            <p className="font-medium">
              No transactions yet
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Your wallet transactions will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {transactions.map((transaction, index) => (

              <TransactionCard
                key={
                  transaction.id ||
                  transaction._id ||
                  `transaction-${index}`
                }
                transaction={transaction}
              />

            ))}

          </div>

        )}

      </section>


      {/* =====================================
          BOTTOM WALLET NAVIGATION
          ONLY ONE COPY
      ====================================== */}

      <section className="border-t pt-6">

        <div className="mb-4">

          <h2 className="text-lg font-bold">
            Wallet
          </h2>

          <p className="text-sm text-zinc-500">
            Manage your BLYNK wallet services.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {/* WALLET */}

          <Link
            to="/wallet"
            className="group flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-50 dark:bg-zinc-800">
                <Wallet size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  Wallet
                </p>

                <p className="text-sm text-zinc-500">
                  Balance
                </p>
              </div>

            </div>

            <ArrowRight
              size={18}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>


          {/* REWARDS */}

          <Link
            to="/wallet/rewards"
            className="group flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-50 dark:bg-zinc-800">
                <Gift size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  Rewards
                </p>

                <p className="text-sm text-zinc-500">
                  VIG Points & vouchers
                </p>
              </div>

            </div>

            <ArrowRight
              size={18}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>


          {/* MONETIZATION */}

          <Link
            to="/monetization/dashboard"
            className="group flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-50 dark:bg-zinc-800">
                <Coins size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  Monetization
                </p>

                <p className="text-sm text-zinc-500">
                  Earn from BLYNK
                </p>
              </div>

            </div>

            <ArrowRight
              size={18}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>


          {/* TRANSACTIONS */}

          <Link
            to="/wallet/transactions"
            className="group flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-900"
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border bg-zinc-50 dark:bg-zinc-800">
                <Receipt size={21} />
              </div>

              <div>
                <p className="font-semibold">
                  Transactions
                </p>

                <p className="text-sm text-zinc-500">
                  Wallet history
                </p>
              </div>

            </div>

            <ArrowRight
              size={18}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>

    </div>
  );
};

export default WalletPage;