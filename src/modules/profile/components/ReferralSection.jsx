import { useEffect, useState } from "react";
import profileAPI from "../services/profile.api.js";

export default function ReferralSection() {

    const [referralCode, setReferralCode] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    // =================================================
    // FETCH EXISTING REFERRAL
    // =================================================

    useEffect(() => {

        const fetchReferral = async () => {

            try {

                setError("");

                const response = await profileAPI.getMyReferral();

                console.log(
                    "REFERRAL MINE RESPONSE:",
                    response.data
                );

                setReferralCode(
                    response.data?.referralCode || null
                );

            } catch (error) {

                console.error(
                    "FAILED TO FETCH REFERRAL:",
                    error.response?.data ||
                    error.message
                );

                setError(
                    "Unable to load referral number."
                );
            }
        };

        fetchReferral();

    }, []);


    // =================================================
    // GENERATE REFERRAL
    // =================================================

    const generateReferral = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await profileAPI.generateReferral();

            console.log(
                "REFERRAL CREATE RESPONSE:",
                response.data
            );

            setReferralCode(
                response.data?.referralCode || null
            );

        } catch (error) {

            console.error(
                "FAILED TO GENERATE REFERRAL:",
                error.response?.data ||
                error.message
            );

            setError(
                error.response?.data?.message ||
                "Unable to generate referral number."
            );

        } finally {

            setLoading(false);

        }
    };


    // =================================================
    // UI
    // =================================================

    return (

        <div className="max-w-6xl mx-auto px-4 mt-4">

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    BLYNK REFERRALS
                </p>


                {!referralCode ? (

                    <div>

                        <p className="text-sm text-zinc-500 mt-2">
                            Generate your personal BLYNK referral number and share it with friends.
                        </p>

                        <button
                            type="button"
                            onClick={generateReferral}
                            disabled={loading}
                            className="mt-4 px-5 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
                        >

                            {loading
                                ? "Generating..."
                                : "Generate My Referral Number"}

                        </button>


                        {error && (

                            <p className="mt-3 text-sm text-red-500">
                                {error}
                            </p>

                        )}

                    </div>

                ) : (

                    <div className="flex items-center justify-between gap-4 mt-3">

                        <div>

                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Your BLYNK Referral Number
                            </p>

                            <p className="text-2xl font-bold tracking-wider text-purple-600">
                                {referralCode}
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    referralCode
                                )
                            }
                            className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
                        >
                            Copy
                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}