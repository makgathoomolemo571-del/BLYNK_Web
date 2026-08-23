// modules/wallet/pages/RedeemPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Gift,
  Coins,
  ArrowLeft,
  Lock,
  Ticket,
  History
} from "lucide-react";

import walletApi from "../services/wallet.api";


/*
========================================================
BLYNK REWARD CONVERSION
========================================================

100 BLYNK Tokens = 1 BLYNK Point

10 BLYNK Points = R10 Voucher

Therefore:

1,000 Tokens  = 10 Points  = R10
5,000 Tokens  = 50 Points  = R50
10,000 Tokens = 100 Points = R100
50,000 Tokens = 500 Points = R500
100,000 Tokens = 1,000 Points = R1,000
========================================================
*/


const AVAILABLE_REWARDS = [
  {
    id: "voucher-10",
    name: "BLYNK R10 Voucher",
    description: "Redeem 10 BLYNK Points for a R10 voucher.",
    type: "VOUCHER",
    costPoints: 10,
    value: "R10"
  },

  {
    id: "voucher-50",
    name: "BLYNK R50 Voucher",
    description: "Redeem 50 BLYNK Points for a R50 voucher.",
    type: "VOUCHER",
    costPoints: 50,
    value: "R50"
  },

  {
    id: "voucher-100",
    name: "BLYNK R100 Voucher",
    description: "Redeem 100 BLYNK Points for a R100 voucher.",
    type: "VOUCHER",
    costPoints: 100,
    value: "R100"
  },

  {
    id: "voucher-500",
    name: "BLYNK R500 Voucher",
    description: "Redeem 500 BLYNK Points for a R500 voucher.",
    type: "VOUCHER",
    costPoints: 500,
    value: "R500"
  },

  {
    id: "voucher-1000",
    name: "BLYNK R1,000 Voucher",
    description: "Redeem 1,000 BLYNK Points for a R1,000 voucher.",
    type: "VOUCHER",
    costPoints: 1000,
    value: "R1,000"
  }
];


export default function RedeemPage() {

  const [wallet, setWallet] = useState(null);

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState(null);


  useEffect(() => {

    loadWallet();

  }, []);


  const loadWallet = async () => {

    try {

      setLoading(true);

      const response =
        await walletApi.getMine();

      const walletData =
        response?.data?.data ??
        response?.data ??
        null;

      setWallet(walletData);

    } catch (error) {

      console.error(
        "REDEEM WALLET ERROR:",
        error
      );

      setMessage(
        "Unable to load your BLYNK Wallet."
      );

    } finally {

      setLoading(false);

    }

  };


  /*
  ========================================================
  BLYNK BALANCES
  ========================================================
  */

  const tokens = Number(
    wallet?.tokens ??
    wallet?.blynkTokens ??
    0
  );


  /*
  100 TOKENS = 1 POINT
  */

  const points = Math.floor(tokens / 100);


  /*
  ========================================================
  REDEMPTION
  ========================================================

  IMPORTANT:

  We are NOT pretending that a voucher was created.

  Until the backend redemption endpoint exists,
  the button only checks eligibility.
  ========================================================
  */

  const redeemReward = (reward) => {

    if (points < reward.costPoints) {

      setMessage(
        `You need ${reward.costPoints.toLocaleString()} BLYNK Points to redeem ${reward.name}.`
      );

      return;

    }


    setMessage(
      `${reward.name} is eligible for redemption. BLYNK voucher redemption is being connected to the reward service.`
    );

  };


  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <p className="font-semibold">
          Loading BLYNK Rewards...
        </p>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      <div className="mx-auto max-w-7xl p-4 md:p-6">


        {/* HEADER */}

        <div className="mb-8">

          <Link
            to="/wallet/rewards"
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <ArrowLeft size={17} />

            Back to BLYNK Rewards

          </Link>


          <h1 className="mt-6 text-3xl font-bold">
            Redeem BLYNK Rewards
          </h1>


          <p className="mt-2 text-zinc-500">
            Convert your BLYNK Points into eligible BLYNK vouchers.
          </p>

        </div>


        {/* CONVERSION INFORMATION */}

        <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm dark:bg-zinc-900">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold text-zinc-500">
                BLYNK Reward Conversion
              </p>

              <p className="mt-1 text-lg font-bold">
                100 BLYNK Tokens = 1 BLYNK Point
              </p>

              <p className="text-sm text-zinc-500">
                10 BLYNK Points = R10 voucher
              </p>

            </div>

            <div className="rounded-xl border px-5 py-3 text-center">

              <p className="text-xs text-zinc-500">
                Example
              </p>

              <p className="font-bold">
                1,000 Tokens = R10
              </p>

            </div>

          </div>

        </div>


        {/* BALANCES */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">


          {/* TOKENS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center gap-4">

              <div className="rounded-xl border p-3">

                <Ticket
                  size={25}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  BLYNK Tokens
                </p>

                <p className="text-3xl font-bold">
                  {tokens.toLocaleString()}
                </p>

              </div>

            </div>

          </div>


          {/* POINTS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center gap-4">

              <div className="rounded-xl border p-3">

                <Coins
                  size={25}
                  className="text-yellow-500"
                />

              </div>

              <div>

                <p className="text-sm text-zinc-500">
                  BLYNK Points
                </p>

                <p className="text-3xl font-bold">
                  {points.toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  100 Tokens = 1 Point
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* MESSAGE */}

        {message && (

          <div className="mb-6 rounded-xl border bg-white p-4 text-sm dark:bg-zinc-900">

            {message}

          </div>

        )}


        {/* REWARDS */}

        <section>

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              BLYNK Vouchers
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Use your BLYNK Points for eligible voucher rewards.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {AVAILABLE_REWARDS.map((reward) => {

              const canRedeem =
                points >= reward.costPoints;


              return (

                <div
                  key={reward.id}
                  className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-zinc-900"
                >

                  <div className="mb-5 flex items-center justify-between">

                    <div className="rounded-xl border p-3">

                      <Gift
                        size={24}
                        className="text-green-600"
                      />

                    </div>

                    <span className="rounded-full border px-3 py-1 text-xs font-semibold">
                      VOUCHER
                    </span>

                  </div>


                  <h3 className="text-lg font-bold">
                    {reward.name}
                  </h3>


                  <p className="mt-2 min-h-[48px] text-sm text-zinc-500">
                    {reward.description}
                  </p>


                  <div className="mt-6 flex items-end justify-between">

                    <div>

                      <p className="text-xs text-zinc-500">
                        Required
                      </p>

                      <p className="font-bold">
                        {reward.costPoints.toLocaleString()} BLYNK Points
                      </p>

                      <p className="text-xs text-zinc-500">
                        {(reward.costPoints * 100).toLocaleString()} Tokens
                      </p>

                    </div>


                    <p className="text-xl font-bold">
                      {reward.value}
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={() => redeemReward(reward)}
                    disabled={!canRedeem}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ${
                      canRedeem
                        ? "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >

                    {canRedeem ? (

                      <>
                        <Gift size={17} />

                        Redeem

                      </>

                    ) : (

                      <>
                        <Lock size={17} />

                        Not Enough Points

                      </>

                    )}

                  </button>

                </div>

              );

            })}

          </div>

        </section>


        {/* BOTTOM BUTTONS */}

        <div className="mt-10 grid gap-4 border-t pt-6 md:grid-cols-2">


          <Link
            to="/wallet"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <span className="flex items-center gap-3">

              <Coins size={21} />

              BLYNK Wallet

            </span>

            <ArrowLeft size={18} />

          </Link>


          <Link
            to="/wallet/transactions"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <span className="flex items-center gap-3">

              <History size={21} />

              Transactions

            </span>

            <ArrowLeft size={18} />

          </Link>

        </div>


      </div>

    </div>

  );

}