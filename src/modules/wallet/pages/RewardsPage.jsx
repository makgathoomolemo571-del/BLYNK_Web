// modules/wallet/pages/RewardsPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Gift,
  Coins,
  Ticket,
  Wallet,
  ArrowRight,
  History
} from "lucide-react";

import walletApi from "../services/wallet.api";


const RewardCard = ({
  icon,
  title,
  value,
  description
}) => {

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border">
        {icon}
      </div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-xs text-zinc-500">
          {description}
        </p>
      )}

    </div>
  );
};


export default function RewardsPage() {

  const [wallet, setWallet] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);


  const loadRewards = async () => {

    try {

      setLoading(true);

      const [
        walletRes,
        transactionsRes
      ] = await Promise.all([

        walletApi.getMine(),

        walletApi.getTransactions()

      ]);


      const walletData =
        walletRes?.data?.data ??
        walletRes?.data ??
        null;


      const transactionData =
        transactionsRes?.data?.data ??
        transactionsRes?.data?.transactions ??
        transactionsRes?.data ??
        [];


      setWallet(walletData);


      setTransactions(
        Array.isArray(transactionData)
          ? transactionData
          : []
      );


    } catch (error) {

      console.error(
        "BLYNK REWARDS LOAD ERROR:",
        error
      );

      setTransactions([]);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadRewards();

  }, []);


  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center">

        <p className="font-semibold">
          Loading BLYNK Rewards...
        </p>

      </div>
    );

  }


  /*
   * IMPORTANT:
   *
   * These are BLYNK rewards.
   * NO VIG terminology.
   */

  const points =
    Number(
      wallet?.points ??
      wallet?.blynkPoints ??
      0
    );


  const tokens =
    Number(
      wallet?.tokens ??
      wallet?.blynkTokens ??
      0
    );


  const voucherCredits =
    Number(
      wallet?.voucherCredits ??
      wallet?.blynkVoucherCredits ??
      0
    );


  return (

    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-6">


        {/* HEADER */}

        <div>

          <Link
            to="/wallet"
            className="mb-5 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-white dark:hover:bg-zinc-900"
          >

            <Wallet size={17} />

            BLYNK Wallet

          </Link>


          <h1 className="mt-5 text-3xl font-bold">
            BLYNK Rewards
          </h1>


          <p className="mt-2 text-zinc-500">
            Earn BLYNK Points and Tokens through
            activity, referrals, campaigns and other
            qualifying BLYNK activities.
          </p>

        </div>


        {/* BALANCES */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <RewardCard
            title="BLYNK Points"
            value={points.toLocaleString()}
            description="Your current reward points."
            icon={
              <Coins
                size={25}
                className="text-yellow-500"
              />
            }
          />


          <RewardCard
            title="BLYNK Tokens"
            value={tokens.toLocaleString()}
            description="Your BLYNK token balance."
            icon={
              <Coins
                size={25}
                className="text-purple-600"
              />
            }
          />


          <RewardCard
            title="Voucher Credits"
            value={voucherCredits.toLocaleString()}
            description="Available voucher credits."
            icon={
              <Ticket
                size={25}
                className="text-green-600"
              />
            }
          />


          <RewardCard
            title="Transactions"
            value={transactions.length.toLocaleString()}
            description="Recorded wallet activity."
            icon={
              <History
                size={25}
                className="text-blue-600"
              />
            }
          />

        </div>


        {/* REDEEM */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl border p-3">
                  <Gift
                    size={24}
                    className="text-green-600"
                  />
                </div>

                <h2 className="text-xl font-bold">
                  Redeem BLYNK Rewards
                </h2>

              </div>


              <p className="mt-3 max-w-2xl text-sm text-zinc-500">
                Use your eligible BLYNK Points to unlock
                available vouchers and other BLYNK rewards.
              </p>

            </div>


            <Link
              to="/wallet/rewards/redeem"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-semibold transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >

              View Rewards

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>


        {/* HOW IT WORKS */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

          <h2 className="text-xl font-bold">
            How BLYNK Rewards Work
          </h2>


          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl border p-5">

              <div className="mb-3 rounded-xl border p-3 w-fit">
                <Coins
                  size={22}
                  className="text-yellow-500"
                />
              </div>

              <h3 className="font-bold">
                1. Earn
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Participate in qualifying BLYNK activities
                and campaigns to earn rewards.
              </p>

            </div>


            <div className="rounded-xl border p-5">

              <div className="mb-3 rounded-xl border p-3 w-fit">
                <Gift
                  size={22}
                  className="text-green-600"
                />
              </div>

              <h3 className="font-bold">
                2. Accumulate
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Build your BLYNK Points, Tokens and
                eligible reward credits.
              </p>

            </div>


            <div className="rounded-xl border p-5">

              <div className="mb-3 rounded-xl border p-3 w-fit">
                <Ticket
                  size={22}
                  className="text-purple-600"
                />
              </div>

              <h3 className="font-bold">
                3. Redeem
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Redeem eligible points for available
                BLYNK rewards and vouchers.
              </p>

            </div>

          </div>

        </section>


        {/* BOTTOM BUTTONS */}

        <div className="grid gap-4 border-t pt-6 md:grid-cols-3">

          <Link
            to="/wallet"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <span className="flex items-center gap-3">
              <Wallet size={20} />
              BLYNK Wallet
            </span>

            <ArrowRight size={18} />

          </Link>


          <Link
            to="/wallet/rewards/redeem"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <span className="flex items-center gap-3">
              <Gift size={20} />
              Redeem Rewards
            </span>

            <ArrowRight size={18} />

          </Link>


          <Link
            to="/wallet/transactions"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <span className="flex items-center gap-3">
              <History size={20} />
              Transactions
            </span>

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </div>

  );
}