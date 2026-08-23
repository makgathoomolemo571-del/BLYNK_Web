// modules/wallet/pages/WalletPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WalletBalance from "../components/WalletBalance";
import walletApi from "../services/wallet.api";
import subscriptionApi from "../../subscription/services/subscription.api";

import {
  Gift,
  Coins,
  Receipt,
  ArrowRight,
  CreditCard,
} from "lucide-react";

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWallet = async () => {
    try {
      setLoading(true);

      const [walletRes, subscriptionRes] = await Promise.all([
        walletApi.getMine(),
        subscriptionApi.getMine(),
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
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="rounded-2xl border bg-white px-8 py-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-lg font-semibold">
            Loading BLYNK Wallet...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // WALLET NOT FOUND
  // =========================

  if (!wallet) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-zinc-900">

          <CreditCard
            size={42}
            className="mx-auto mb-4 text-red-500"
          />

          <h2 className="text-xl font-bold text-red-600">
            Wallet not found
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            We couldn't load your BLYNK wallet.
          </p>

          <button
            type="button"
            onClick={loadWallet}
            className="mt-6 rounded-xl border px-6 py-3 font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
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
          HEADER
      ====================================== */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
            <CreditCard size={28} />
          </div>

          <div>

            <h1 className="text-2xl font-bold md:text-3xl">
              BLYNK Wallet
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your BLYNK wallet and access your rewards and earnings.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          BALANCE
          WalletBalance is the actual balance display.
          There is NO Wallet/Balance navigation button.
      ====================================== */}

      <WalletBalance wallet={wallet} />


      {/* =====================================
          SUBSCRIPTION
      ====================================== */}

      {subscription && (
        <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-zinc-500">
                Current subscription
              </p>

              <h2 className="mt-1 text-xl font-bold">
                {subscription.plan || "FREE_MEMBER"}
              </h2>

            </div>

            <div className="w-fit rounded-full border px-4 py-2 text-sm font-semibold dark:border-zinc-700">
              {subscription.status || "active"}
            </div>

          </div>

        </section>
      )}


      {/* =====================================
          WALLET SERVICES
          ONLY THREE BUTTONS
      ====================================== */}

      <section className="pt-2">

        <div className="mb-4">

          <h2 className="text-xl font-bold">
            Wallet Services
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Access your rewards, monetization and transaction history.
          </p>

        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {/* ===============================
              REWARDS
          ================================ */}

          <Link
            to="/wallet/rewards"
            className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                <Gift
                  size={23}
                  className="text-green-600"
                />
              </div>

              <div>

                <p className="font-bold">
                  Rewards
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Tokens & Points
                </p>

              </div>

            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>

          {/* ===============================
              REDEEM
          ================================ */}

          <Link
            to="/wallet/redeem"
            className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                <Gift
                  size={23}
                  className="text-green-600"
                />
              </div>

              <div>

                <p className="font-bold">
                  Redeem
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  vouchers
                </p>

              </div>

            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>


          {/* ===============================
              MONETIZATION
          ================================ */}

          <Link
            to="/monetization/dashboard"
            className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                <Coins
                  size={23}
                  className="text-purple-600"
                />
              </div>

              <div>

                <p className="font-bold">
                  Monetization
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Earn from BLYNK
                </p>

              </div>

            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>


          {/* ===============================
              TRANSACTIONS
          ================================ */}

          <Link
            to="/wallet/transactions"
            className="group flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                <Receipt
                  size={23}
                  className="text-orange-600"
                />
              </div>

              <div>

                <p className="font-bold">
                  Transactions
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  Wallet activity history
                </p>

              </div>

            </div>

            <ArrowRight
              size={20}
              className="text-zinc-400 transition group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>

    </div>
  );
};

export default WalletPage;