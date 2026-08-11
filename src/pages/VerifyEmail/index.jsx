
import React, {
    useEffect,
    useRef,
    useState
} from "react";

import {
    useSearchParams,
    useNavigate,
    useLocation
} from "react-router-dom";

import { verifyEmail } from "./verifyEmail.service";

export default function VerifyEmail() {

    const [params] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const token = params.get("token");

    // This may exist when coming from registration,
    // but will normally be empty when arriving from an email.
    const email = location.state?.email || "";

    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);

    // Prevent React StrictMode from submitting the same
    // verification token twice.
    const verificationStarted = useRef(false);

    useEffect(() => {

        if (verificationStarted.current) {
            return;
        }

        verificationStarted.current = true;

        const runVerification = async () => {

            if (!token) {

                setError("Missing verification token.");
                setStatus("error");

                return;
            }

            try {

                console.log(
                    "🔐 VERIFYING BLYNK EMAIL TOKEN"
                );

                const res = await verifyEmail(token);

                console.log(
                    "✅ VERIFICATION RESPONSE:",
                    res
                );

                if (res?.success) {

                    setStatus("success");

                } else {

                    setError(
                        res?.message ||
                        "Verification failed."
                    );

                    setStatus("error");
                }

            } catch (err) {

                console.error(
                    "❌ EMAIL VERIFICATION ERROR:",
                    err
                );

                const serverMessage =
                    err?.response?.data?.message;

                setError(
                    serverMessage ||
                    "This verification link is invalid or has expired."
                );

                setStatus("error");
            }
        };

        runVerification();

    }, [token]);

    /*
     * LOADING
     */
    if (status === "loading") {

        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-4">

                <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">

                    <div className="
                        mx-auto
                        mb-6
                        h-12
                        w-12
                        animate-spin
                        rounded-full
                        border-4
                        border-purple-200
                        border-t-purple-600
                    " />

                    <h1 className="text-2xl font-bold text-gray-900">
                        Verifying your email...
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Please wait while we verify your BLYNK account.
                    </p>

                </div>

            </div>
        );
    }

    /*
     * SUCCESS
     */
    if (status === "success") {

        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-4">

                <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">

                    <div className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-green-100
                        text-3xl
                    ">
                        ✅
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-green-600">
                        Email Verified
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Your BLYNK account has been successfully verified.
                    </p>

                    {email && (
                        <p className="mt-3 font-semibold text-gray-900">
                            {email}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="
                            mt-8
                            w-full
                            rounded-lg
                            bg-purple-600
                            px-4
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-purple-700
                        "
                    >
                        OK — Continue to Login
                    </button>

                </div>

            </div>
        );
    }

    /*
     * FAILED
     */
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">

            <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg">

                <div className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-red-100
                    text-3xl
                ">
                    ❌
                </div>

                <h1 className="mt-6 text-2xl font-bold text-red-600">
                    Verification Failed
                </h1>

                <p className="mt-4 text-gray-600">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="
                        mt-8
                        w-full
                        rounded-lg
                        bg-gray-900
                        px-4
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-gray-800
                    "
                >
                    Back to Register
                </button>

            </div>

        </div>
    );
}

