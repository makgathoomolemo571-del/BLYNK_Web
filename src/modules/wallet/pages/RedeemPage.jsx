import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Gift,
  Coins,
  ArrowLeft,
  CheckCircle,
  Lock,
  Ticket,
  History
} from "lucide-react";

const RedeemPage = () => {
  const [balance, setBalance] = useState({
    points: 0,
    tokens: 0
  });

  const [rewards, setRewards] = useState([]);

  const [loading, setLoading] = useState(true);

  const [redeeming, setRedeeming] = useState(null);

  const [message, setMessage] = useState(null);


  useEffect(() => {

    loadRewards();

  }, []);


  const loadRewards = async () => {

    try {

      setLoading(true);

      /*
       * Replace this with your real rewards API
       * once the endpoint is connected.
       */

      setBalance({
        points: 10,
        tokens: 1500
      });


      setRewards([

        {
          id: "voucher-10",
          name: "BLYNK R10 Voucher",
          description: "Redeem your points for a BLYNK voucher.",
          type: "VOUCHER",
          costPoints: 10,
          value: "R10"
        },

        {
          id: "voucher-50",
          name: "BLYNK R50 Voucher",
          description: "Redeem your points for a R50 voucher.",
          type: "VOUCHER",
          costPoints: 50,
          value: "R50"
        },

        {
          id: "voucher-100",
          name: "BLYNK R100 Voucher",
          description: "Redeem your points for a R100 voucher.",
          type: "VOUCHER",
          costPoints: 100,
          value: "R100"
        },

        {
          id: "future-reward",
          name: "BLYNK Premium Reward",
          description: "Future premium BLYNK reward.",
          type: "PREMIUM",
          costPoints: 500,
          value: "Premium"
        }

      ]);

    } catch (error) {

      console.error(
        "REDEEM LOAD ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  const redeemReward = async (reward) => {

    if (
      balance.points <
      reward.costPoints
    ) {

      setMessage({
        type: "error",
        text: "You do not have enough BLYNK points for this reward."
      });

      return;

    }


    try {

      setRedeeming(reward.id);

      setMessage(null);


      /*
       * Connect your real redeem API here.
       *
       * Example:
       *
       * await rewardApi.redeem(reward.id);
       *
       */


      await new Promise(
        resolve => setTimeout(resolve, 700)
      );


      setBalance(previous => ({
        ...previous,
        points:
          previous.points -
          reward.costPoints
      }));


      setMessage({
        type: "success",
        text: `${reward.name} redeemed successfully.`
      });


    } catch (error) {

      console.error(
        "REDEEM ERROR:",
        error
      );

      setMessage({
        type: "error",
        text: "We could not complete your redemption."
      });

    } finally {

      setRedeeming(null);

    }

  };


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-gray-500">
          Loading BLYNK Rewards...
        </p>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      <div className="mx-auto max-w-7xl p-4 md:p-6">


        {/* HEADER */}

        <div className="mb-6">

          <Link
            to="/wallet"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white"
          >

            <ArrowLeft size={18} />

            Back to Wallet

          </Link>


          <div className="flex items-center gap-4">

            <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900">

              <Gift
                size={30}
                className="text-green-600"
              />

            </div>


            <div>

              <h1 className="text-3xl font-bold">
                Redeem Rewards
              </h1>

              <p className="mt-1 text-gray-500">
                Use your BLYNK points to unlock rewards.
              </p>

            </div>

          </div>

        </div>


        {/* BALANCES */}

        <div className="mb-6 grid gap-4 md:grid-cols-2">


          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center gap-3">

              <Coins
                className="text-yellow-500"
                size={26}
              />

              <div>

                <p className="text-sm text-gray-500">
                  BLYNK Points
                </p>

                <p className="text-3xl font-bold">
                  {balance.points}
                </p>

              </div>

            </div>

          </div>


          <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">

            <div className="flex items-center gap-3">

              <Ticket
                className="text-purple-600"
                size={26}
              />

              <div>

                <p className="text-sm text-gray-500">
                  BLYNK Tokens
                </p>

                <p className="text-3xl font-bold">
                  {balance.tokens}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* MESSAGE */}

        {message && (

          <div
            className={`mb-6 rounded-xl border p-4 ${
              message.type === "success"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >

            <div className="flex items-center gap-2">

              {message.type === "success" && (
                <CheckCircle size={20} />
              )}

              {message.text}

            </div>

          </div>

        )}


        {/* REWARDS */}

        <div>

          <div className="mb-4">

            <h2 className="text-xl font-bold">
              Available Rewards
            </h2>

            <p className="text-sm text-gray-500">
              Select a reward to redeem.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">


            {rewards.map((reward) => {

              const canRedeem =
                balance.points >=
                reward.costPoints;


              const isRedeeming =
                redeeming === reward.id;


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
                      {reward.type}
                    </span>

                  </div>


                  <h3 className="text-lg font-bold">
                    {reward.name}
                  </h3>


                  <p className="mt-2 min-h-[48px] text-sm text-gray-500">
                    {reward.description}
                  </p>


                  <div className="mt-5 flex items-center justify-between">

                    <div>

                      <p className="text-xs text-gray-500">
                        Required
                      </p>

                      <p className="font-bold">
                        {reward.costPoints} points
                      </p>

                    </div>


                    <p className="text-xl font-bold">
                      {reward.value}
                    </p>

                  </div>


                  <button
                    type="button"
                    disabled={!canRedeem || isRedeeming}
                    onClick={() =>
                      redeemReward(reward)
                    }
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition ${
                      canRedeem
                        ? "hover:bg-gray-100 dark:hover:bg-zinc-800"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >

                    {!canRedeem ? (

                      <>
                        <Lock size={17} />

                        Not Enough Points

                      </>

                    ) : isRedeeming ? (

                      "Redeeming..."

                    ) : (

                      <>
                        <Gift size={17} />

                        Redeem

                      </>

                    )}

                  </button>

                </div>

              );

            })}

          </div>

        </div>


        {/* BOTTOM LINKS */}

        <div className="mt-10 grid gap-4 border-t pt-6 md:grid-cols-2">


          <Link
            to="/wallet"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <div className="flex items-center gap-3">

              <Coins size={21} />

              BLYNK Wallet

            </div>

            <ArrowLeft size={18} />

          </Link>


          <Link
            to="/wallet/transactions"
            className="flex items-center justify-between rounded-2xl border bg-white p-5 font-semibold transition hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >

            <div className="flex items-center gap-3">

              <History size={21} />

              Redemption History

            </div>

            <ArrowLeft size={18} />

          </Link>


        </div>

      </div>

    </div>

  );

};


export default RedeemPage;