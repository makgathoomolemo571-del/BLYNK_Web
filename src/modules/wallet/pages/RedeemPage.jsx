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


const AVAILABLE_REWARDS = [

  {
    id: "voucher-10",
    name: "BLYNK R10 Voucher",
    description:
      "A BLYNK R10 reward voucher.",
    type: "VOUCHER",
    costPoints: 10,
    value: "R10"
  },

  {
    id: "voucher-50",
    name: "BLYNK R50 Voucher",
    description:
      "A BLYNK R50 reward voucher.",
    type: "VOUCHER",
    costPoints: 50,
    value: "R50"
  },

  {
    id: "voucher-100",
    name: "BLYNK R100 Voucher",
    description:
      "A BLYNK R100 reward voucher.",
    type: "VOUCHER",
    costPoints: 100,
    value: "R100"
  },

  {
    id: "premium-reward",
    name: "BLYNK Premium Reward",
    description:
      "A future premium BLYNK reward.",
    type: "PREMIUM",
    costPoints: 500,
    value: "Premium"
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

    } finally {

      setLoading(false);

    }

  };


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


  /*
   * DO NOT pretend redemption happened.
   *
   * Until the real reward API endpoint is connected,
   * show the user that the reward system is being prepared.
   */

  const redeemReward = (reward) => {

    if (points < reward.costPoints) {

      setMessage(
        `You need ${reward.costPoints} BLYNK Points to redeem ${reward.name}.`
      );

      return;

    }


    setMessage(
      `${reward.name} is available for redemption. The BLYNK redemption service is being connected.`
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
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition hover:bg-white dark:hover:bg-zinc-900"
          >

            <ArrowLeft size={17} />

            Back to BLYNK Rewards

          </Link>


          <h1 className="mt-6 text-3xl font-bold">
            Redeem BLYNK Rewards
          </h1>


          <p className="mt-2 text-zinc-500">
            Use your BLYNK Points for eligible rewards.
          </p>

        </div>


        {/* BALANCES */}

        <div className="mb-8 grid gap-4 md:grid-cols-2">


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

              </div>

            </div>

          </div>


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
              Available BLYNK Rewards
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Rewards available through the BLYNK reward programme.
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

                      {reward.type === "VOUCHER" ? (

                        <Ticket
                          size={24}
                          className="text-green-600"
                        />

                      ) : (

                        <Gift
                          size={24}
                          className="text-purple-600"
                        />

                      )}

                    </div>


                    <span className="rounded-full border px-3 py-1 text-xs font-semibold">
                      {reward.type}
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