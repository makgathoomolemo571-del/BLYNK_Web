import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function ReferralSection() {

  const [referralCode, setReferralCode] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const loadReferral = async () => {

      try {

        const response = await api.get("/referral/me");

        console.log(
          "REFERRAL ME:",
          response.data
        );

        setReferralCode(
          response.data?.referralCode || null
        );

      } catch (error) {

        console.error(
          "REFERRAL ME ERROR:",
          error.response?.data || error.message
        );

      }

    };

    loadReferral();

  }, []);

  const generateReferral = async () => {

    try {

      setLoading(true);

      const response =
        await api.post("/referral/generate");

      console.log(
        "REFERRAL GENERATED:",
        response.data
      );

      setReferralCode(
        response.data?.referralCode
      );

    } catch (error) {

      console.error(
        "GENERATE REFERRAL ERROR:",
        error.response?.data || error.message
      );

    } finally {

      setLoading(false);

    }

  };

  const copyReferral = async () => {

    if (!referralCode) return;

    await navigator.clipboard.writeText(
      referralCode
    );

  };

  return (

    <div className="max-w-6xl mx-auto px-4 mt-4">

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

        {!referralCode ? (

          <div>

            <p className="text-sm font-semibold text-zinc-500">
              BLYNK REFERRALS
            </p>

            <p className="text-sm text-zinc-500 mt-1 mb-4">
              Generate your personal BLYNK referral number.
            </p>

            <button
              type="button"
              onClick={generateReferral}
              disabled={loading}
              className="px-5 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
            >
              {loading
                ? "Generating..."
                : "Generate My Referral Number"}
            </button>

          </div>

        ) : (

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-sm font-semibold text-zinc-500">
                BLYNK REFERRAL NUMBER
              </p>

              <p className="text-2xl font-bold tracking-wider text-purple-600">
                {referralCode}
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                Share this number with friends.
              </p>

            </div>

            <button
              type="button"
              onClick={copyReferral}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold"
            >
              Copy
            </button>

          </div>

        )}

      </div>

    </div>

  );
}