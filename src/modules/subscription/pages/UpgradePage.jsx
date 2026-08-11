import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import subscriptionApi from "../services/subscription.api";
import planPricing from "../../../config/plans.config";
import subscriptionRules from "../../../config/subscriptionRules";

export default function UpgradePage() {
    const navigate = useNavigate();

    const [current, setCurrent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [upgrading, setUpgrading] = useState("");
    const [error, setError] = useState("");

    const plans = useMemo(() => {
        return Object.keys(planPricing).map((key) => ({
            code: key,
            pricing: planPricing[key],
            rules: subscriptionRules[key]
        }));
    }, []);

    useEffect(() => {
        loadSubscription();
    }, []);

    async function loadSubscription() {
        try {
            const res = await subscriptionApi.getMine();
            setCurrent(res.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load subscription.");
        } finally {
            setLoading(false);
        }
    }

    async function upgrade(plan) {
        if (current?.plan === plan) return;

        try {
            setUpgrading(plan);

            await subscriptionApi.upgrade({
                plan
            });

            await loadSubscription();

            alert("Subscription upgraded successfully.");
        } catch (err) {
            console.error(err);
            alert(
                err?.response?.data?.message ||
                "Upgrade failed."
            );
        } finally {
            setUpgrading("");
        }
    }

    if (loading)
        return (
            <div className="p-10 text-center">
                Loading subscription...
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto p-8">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    Upgrade Subscription
                </h1>

                <p className="mt-2 text-gray-500">
                    Current Plan:
                    <span className="ml-2 font-semibold">
                        {current?.plan}
                    </span>
                </p>

            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mb-6">
                    {error}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">

                {plans.map((plan) => (

                    <div
                        key={plan.code}
                        className={`rounded-xl border p-6 shadow-sm ${
                            current?.plan === plan.code
                                ? "border-blue-600 ring-2 ring-blue-500"
                                : "border-gray-200"
                        }`}
                    >

                        <h2 className="text-2xl font-bold">
                            {plan.pricing.name}
                        </h2>

                        <div className="mt-4">

                            <span className="text-4xl font-bold">
                                R{plan.pricing.price}
                            </span>

                            <span className="text-gray-500 ml-2">
                                /{plan.pricing.billing}
                            </span>

                        </div>

                        <div className="mt-8">

                            <h3 className="font-semibold mb-3">
                                Features
                            </h3>

                            <ul className="space-y-2">

                                {Object.entries(
                                    plan.rules?.features || {}
                                ).map(([feature, enabled]) => (

                                    <li
                                        key={feature}
                                        className="flex justify-between"
                                    >
                                        <span>{feature}</span>

                                        <span>
                                            {enabled ? "✅" : "❌"}
                                        </span>

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <div className="mt-8">

                            <h3 className="font-semibold mb-3">
                                Limits
                            </h3>

                            <ul className="space-y-2">

                                {Object.entries(
                                    plan.rules?.limits || {}
                                ).map(([limit, value]) => (

                                    <li
                                        key={limit}
                                        className="flex justify-between"
                                    >
                                        <span>{limit}</span>

                                        <span>
                                            {value === -1
                                                ? "Unlimited"
                                                : value}
                                        </span>

                                    </li>

                                ))}

                            </ul>

                        </div>

                        <button
                            disabled={
                                current?.plan === plan.code ||
                                upgrading === plan.code
                            }
                            onClick={() => upgrade(plan.code)}
                            className={`mt-8 w-full rounded-lg py-3 font-semibold ${
                                current?.plan === plan.code
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            {current?.plan === plan.code
                                ? "Current Plan"
                                : upgrading === plan.code
                                    ? "Upgrading..."
                                    : "Upgrade"}
                        </button>

                    </div>

                ))}

            </div>

            <div className="mt-10">

                <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2 rounded-lg border"
                >
                    Back
                </button>

            </div>

        </div>
    );
}