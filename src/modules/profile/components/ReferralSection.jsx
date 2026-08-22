import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferralSection() {

    const [referralCode, setReferralCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // FETCH EXISTING REFERRAL CODE
    // =====================================================

    useEffect(() => {

        const fetchReferral = async () => {

            try {

                setError("");

                const response = await axios.get(
                    "/api/referral/mine"
                );

                console.log(
                    "REFERRAL MINE RESPONSE:",
                    response.data
                );

                setReferralCode(
                    response.data.referralCode || null
                );

            } catch (error) {

                console.error(
                    "FAILED TO FETCH REFERRAL:",
                    error
                );

            }

        };

        fetchReferral();

    }, []);


    // =====================================================
    // GENERATE REFERRAL
    // =====================================================

    const generateReferral = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await axios.post(
                "/api/referral/create"
            );

            console.log(
                "REFERRAL CREATE RESPONSE:",
                response.data
            );

            setReferralCode(
                response.data.referralCode
            );

        } catch (error) {

            console.error(
                "FAILED TO GENERATE REFERRAL:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to generate referral number."
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // COPY
    // =====================================================

    const copyReferral = async () => {

        if (!referralCode) return;

        try {

            await navigator.clipboard.writeText(
                referralCode
            );

        } catch (error) {

            console.error(
                "FAILED TO COPY:",
                error
            );

        }

    };


    return (

        <div className="max-w-6xl mx-auto px-4 mt-4">

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

                <div className="flex items-center justify-between gap-4">

                    <div>

                        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                            BLYNK REFERRALS
                        </p>


                        {!referralCode ? (

                            <>
                                <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                                    You don't have a referral number yet.
                                </p>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Generate your personal BLYNK referral number
                                    and share it with your friends.
                                </p>
                            </>

                        ) : (

                            <>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                                    Your BLYNK Referral Number
                                </p>

                                <p className="text-2xl font-bold tracking-wider text-purple-600">
                                    {referralCode}
                                </p>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Share your referral number with friends
                                    and earn referral rewards.
                                </p>
                            </>

                        )}


                        {error && (

                            <p className="text-sm text-red-500 mt-2">
                                {error}
                            </p>

                        )}

                    </div>


                    {!referralCode ? (

                        <button
                            type="button"
                            onClick={generateReferral}
                            disabled={loading}
                            className="px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50"
                        >

                            {loading
                                ? "Generating..."
                                : "Generate My Referral Number"}

                        </button>

                    ) : (

                        <button
                            type="button"
                            onClick={copyReferral}
                            className="px-5 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
                        >
                            Copy
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

}