import { useEffect, useState } from "react";
import profileAPI from "../services/profile.api.js";

export default function ReferralSection() {

  const [referralCode, setReferralCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH EXISTING REFERRAL
  // ==========================================

  useEffect(() => {

    const fetchReferral = async () => {

      try {

        setError("");

        const response =
          await profileAPI.getMyReferral();

        console.log(
          "REFERRAL MINE RESPONSE:",
          response.data
        );

        setReferralCode(
          response.data?.referralCode || null
        );

      } catch (err) {

        console.error(
          "FAILED TO FETCH REFERRAL:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
          "Could not load referral number."
        );
      }
    };

    fetchReferral();

  }, []);


  // ==========================================
  // GENERATE REFERRAL
  // ==========================================

  const generateReferral = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await profileAPI.generateReferral();

      console.log(
        "REFERRAL GENERATE RESPONSE:",
        response.data
      );

      setReferralCode(
        response.data?.referralCode || null
      );

    } catch (err) {

      console.error(
        "FAILED TO GENERATE REFERRAL:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        "Could not generate referral number."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // COPY
  // ==========================================

  const copyReferral = async () => {

    if (!referralCode) return;

    try {

      await navigator.clipboard.writeText(
        referralCode
      );

    } catch (err) {

      console.error(
        "COPY FAILED:",
        err
      );

    }
  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="max-w-6xl mx-auto px-4 mt-4">

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

        <h3 className="text-lg font-bold mb-4">
          BLYNK Referrals
        </h3>


        {!referralCode ? (

          <div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Generate your personal BLYNK referral
              number and share it with friends.
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

              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                YOUR BLYNK REFERRAL NUMBER
              </p>

              <p className="text-2xl font-bold tracking-wider text-purple-600">
                {referralCode}
              </p>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Share this number with friends and earn
                referral rewards.
              </p>

            </div>


            <button
              type="button"
              onClick={copyReferral}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              Copy
            </button>

          </div>

        )}


        {error && (

          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>

        )}

      </div>

    </div>

  );
}