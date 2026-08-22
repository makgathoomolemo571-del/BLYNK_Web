import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferralSection() {

    const [referralCode, setReferralCode] =
        useState(null);

    const [loading, setLoading] =
        useState(false);


    // Fetch existing referral number
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
                    "Failed to fetch referral:",
                    error
                );

            }
        };

        fetchReferral();

    }, []);


    const generateReferral = async () => {

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "/api/referral/generate"
                );

            setReferralCode(
                response.data.referralCode
            );

        } catch (error) {

            console.error(
                "Failed to generate referral:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div>

            <h3>BLYNK Referrals</h3>


            {!referralCode ? (

                <button
                    type="button"
                    onClick={generateReferral}
                    disabled={loading}
                >
                    {loading
                        ? "Generating..."
                        : "Generate My Referral Number"}
                </button>

            ) : (

                <div>

                    <p>
                        Your BLYNK Referral Number
                    </p>

                    <strong>
                        {referralCode}
                    </strong>

                </div>

            )}

        </div>
    );
}