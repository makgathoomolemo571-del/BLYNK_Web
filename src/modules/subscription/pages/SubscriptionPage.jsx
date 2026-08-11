import { useEffect, useMemo, useState } from "react";
import { CheckCircle, Crown, ShieldCheck } from "lucide-react";

import subscriptionApi from "../services/subscription.api";
import plans from "../../../config/plans.config";

export default function SubscriptionPage() {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadSubscription();
    }, []);

    async function loadSubscription() {
        try {
            setLoading(true);

            const { data } = await subscriptionApi.getMine();

            setSubscription(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function upgrade(plan) {
        try {
            setProcessing(true);

            await subscriptionApi.upgrade({
                plan
            });

            await loadSubscription();
        } finally {
            setProcessing(false);
        }
    }

    async function cancel() {
        try {
            setProcessing(true);

            await subscriptionApi.cancel();

            await loadSubscription();
        } finally {
            setProcessing(false);
        }
    }

    const currentPlan = useMemo(() => {
        if (!subscription) return null;
        return plans[subscription.plan];
    }, [subscription]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                Loading subscription...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-4xl font-bold mb-8">
                Subscription
            </h1>

            {subscription && (

                <div className="bg-white rounded-xl shadow p-6 mb-10">

                    <div className="flex items-center gap-3">

                        <Crown size={28} />

                        <div>

                            <h2 className="font-bold text-2xl">
                                {currentPlan?.name}
                            </h2>

                            <p className="text-gray-500">
                                {subscription.status}
                            </p>

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">

                        <div>

                            <span className="font-semibold">
                                Started
                            </span>

                            <p>
                                {new Date(
                                    subscription.startDate
                                ).toLocaleDateString()}
                            </p>

                        </div>

                        <div>

                            <span className="font-semibold">
                                Ends
                            </span>

                            <p>
                                {subscription.endDate
                                    ? new Date(
                                          subscription.endDate
                                      ).toLocaleDateString()
                                    : "Unlimited"}
                            </p>

                        </div>

                        <div>

                            <span className="font-semibold">
                                Auto Renew
                            </span>

                            <p>
                                {subscription.autoRenew
                                    ? "Enabled"
                                    : "Disabled"}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={cancel}
                        disabled={processing}
                        className="mt-8 px-6 py-3 rounded bg-red-600 text-white"
                    >
                        Cancel Subscription
                    </button>

                </div>

            )}

            <h2 className="text-3xl font-bold mb-6">
                Available Plans
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">

                {Object.entries(plans).map(([key, plan]) => (

                    <div
                        key={key}
                        className={`rounded-xl border p-8 ${
                            subscription?.plan === key
                                ? "border-blue-600"
                                : ""
                        }`}
                    >

                        <h3 className="text-2xl font-bold">
                            {plan.name}
                        </h3>

                        <p className="text-4xl font-bold mt-4">
                            R{plan.price}
                        </p>

                        <p className="text-gray-500">
                            / {plan.billing}
                        </p>

                        <button
                            disabled={
                                subscription?.plan === key ||
                                processing
                            }
                            onClick={() => upgrade(key)}
                            className="w-full mt-8 bg-blue-600 text-white rounded-lg py-3"
                        >
                            {subscription?.plan === key
                                ? "Current Plan"
                                : "Upgrade"}
                        </button>

                        <div className="mt-8">

                            <h4 className="font-bold mb-4 flex items-center gap-2">

                                <ShieldCheck size={18} />

                                Features

                            </h4>

                            <div className="space-y-2">

                                {Object.entries(
                                    plan.features || {}
                                ).map(([feature, enabled]) => (

                                    <div
                                        key={feature}
                                        className="flex items-center justify-between"
                                    >

                                        <span>
                                            {feature}
                                        </span>

                                        {enabled && (
                                            <CheckCircle
                                                size={18}
                                                className="text-green-600"
                                            />
                                        )}

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}