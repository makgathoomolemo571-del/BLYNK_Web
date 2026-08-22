import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferralSection() {

    const [referralCode, setReferralCode] =
        useState(null);

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // FETCH EXISTING REFERRAL
    // =====================================================

    useEffect(() => {

        const fetchReferral = async () => {

            try {

                const response =
                    await axios.get(
                        "/api/referral/me"
                    );

                setReferralCode(
                    response.data.referralCode
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

            const response =
                await axios.post(
                    "/api/referral/generate"
                );

            console.log(
                "GENERATED REFERRAL:",
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

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // COPY
    // =====================================================

    const copyReferral = async () => {

        if (!referralCode) return;

        await navigator.clipboard.writeText(
            referralCode
        );

        alert("Referral number copied!");

    };


    return (

        <div className="max-w-6xl mx-auto px-4 mt-4">

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">

                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    BLYNK REFERRALS
                </p>


                {!referralCode ? (

                    <div className="mt-3">

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                            Generate your personal BLYNK referral number
                            and share it with your friends.
                        </p>

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

                    </div>

                ) : (

                    <div className="mt-3">

                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Your BLYNK Referral Number
                        </p>

                        <div className="flex items-center gap-4 mt-2">

                            <strong className="text-2xl font-bold tracking-wider text-purple-600">
                                {referralCode}
                            </strong>

                            <button
                                type="button"
                                onClick={copyReferral}
                                className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700"
                            >
                                Copy
                            </button>

                        </div>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            Share this number with friends and earn referral rewards.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );
}