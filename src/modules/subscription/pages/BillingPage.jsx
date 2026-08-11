// modules/subscription/pages/BillingPage.jsx

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CreditCard,
    Calendar,
    ShieldCheck,
    RefreshCw,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

import { fetchSubscription } from "../store/subscriptionActions";
import {
    selectSubscription,
    selectSubscriptionLoading
} from "../store/subscriptionSelectors";

import subscriptionRules from "../../../config/subscriptionRules";
import planPricing from "../../../config/plans.config";

const Badge = ({ status }) => {

    const colors = {
        active:
            "bg-green-100 text-green-700 border-green-300",

        expired:
            "bg-red-100 text-red-700 border-red-300",

        cancelled:
            "bg-yellow-100 text-yellow-700 border-yellow-300"
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status]}`}
        >
            {status?.toUpperCase()}
        </span>
    );
};

export default function BillingPage() {

    const dispatch = useDispatch();

    const subscription =
        useSelector(selectSubscription);

    const loading =
        useSelector(selectSubscriptionLoading);

    useEffect(() => {
        dispatch(fetchSubscription());
    }, [dispatch]);

    const plan =
        useMemo(() => {

            if (!subscription?.plan)
                return null;

            return (
                subscriptionRules[
                    subscription.plan
                ] || null
            );

        }, [subscription]);

    const pricing =
        useMemo(() => {

            if (!subscription?.plan)
                return null;

            return (
                planPricing[
                    subscription.plan
                ] || null
            );

        }, [subscription]);

    if (loading) {

        return (
            <div className="flex items-center justify-center h-[70vh]">

                <RefreshCw
                    size={32}
                    className="animate-spin text-blue-600"
                />

            </div>
        );

    }

    if (!subscription) {

        return (

            <div className="max-w-5xl mx-auto p-8">

                <div className="rounded-xl border bg-white p-8">

                    <AlertTriangle
                        size={40}
                        className="text-yellow-500 mb-4"
                    />

                    <h2 className="text-2xl font-bold">

                        No Subscription Found

                    </h2>

                    <p className="mt-2 text-gray-600">

                        Your account currently has
                        no active subscription.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-8 space-y-8">

            <div>

                <h1 className="text-3xl font-bold">

                    Billing

                </h1>

                <p className="text-gray-500">

                    Subscription overview,
                    pricing and plan limits.

                </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 rounded-2xl bg-white border shadow-sm p-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-2xl font-bold">

                                {pricing?.name ||
                                    subscription.plan}

                            </h2>

                            <p className="text-gray-500 mt-1">

                                {pricing?.currency}

                                {" "}

                                {pricing?.price}

                                /

                                {pricing?.billing}

                            </p>

                        </div>

                        <Badge
                            status={
                                subscription.status
                            }
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-8">

                        <div className="flex gap-4">

                            <Calendar />

                            <div>

                                <p className="text-gray-500">

                                    Started

                                </p>

                                <strong>

                                    {
                                        new Date(
                                            subscription.startDate
                                        ).toLocaleDateString()
                                    }

                                </strong>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Calendar />

                            <div>

                                <p className="text-gray-500">

                                    Ends

                                </p>

                                <strong>

                                    {
                                        subscription.endDate
                                            ? new Date(
                                                subscription.endDate
                                            ).toLocaleDateString()
                                            : "Unlimited"
                                    }

                                </strong>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <RefreshCw />

                            <div>

                                <p className="text-gray-500">

                                    Auto Renew

                                </p>

                                <strong>

                                    {
                                        subscription.autoRenew
                                            ? "Enabled"
                                            : "Disabled"
                                    }

                                </strong>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <CreditCard />

                            <div>

                                <p className="text-gray-500">

                                    Monthly Cost

                                </p>

                                <strong>

                                    {pricing?.currency}

                                    {" "}

                                    {pricing?.price}

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl border bg-white shadow-sm p-6">

                    <h3 className="font-bold text-lg mb-4">

                        Plan Features

                    </h3>

                    <div className="space-y-3">

                        {plan &&
                            Object.entries(
                                plan.features
                            ).map(
                                ([key, value]) => (

                                    <div
                                        key={key}
                                        className="flex justify-between items-center"
                                    >

                                        <span className="capitalize">

                                            {key.replace(
                                                /([A-Z])/g,
                                                " $1"
                                            )}

                                        </span>

                                        {

                                            value ?

                                                <CheckCircle2
                                                    className="text-green-600"
                                                    size={18}
                                                />

                                                :

                                                <AlertTriangle
                                                    className="text-red-500"
                                                    size={18}
                                                />

                                        }

                                    </div>

                                )
                            )}

                    </div>

                </div>

            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-8">

                <h2 className="text-xl font-bold mb-5">

                    Usage Limits

                </h2>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                    {

                        plan &&

                        Object.entries(
                            plan.limits
                        ).map(
                            ([key, value]) => (

                                <div
                                    key={key}
                                    className="border rounded-xl p-4"
                                >

                                    <div className="text-sm text-gray-500">

                                        {key.replace(
                                            /([A-Z])/g,
                                            " $1"
                                        )}

                                    </div>

                                    <div className="font-bold text-2xl mt-2">

                                        {

                                            value === -1

                                                ?

                                                "Unlimited"

                                                :

                                                value

                                        }

                                    </div>

                                </div>

                            )
                        )

                    }

                </div>

            </div>

            <div className="rounded-2xl bg-blue-600 text-white p-8 flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        Need more features?

                    </h2>

                    <p className="opacity-80 mt-2">

                        Upgrade your subscription
                        to unlock more creator,
                        business and monetization
                        tools.

                    </p>

                </div>

                <ShieldCheck
                    size={60}
                />

            </div>

        </div>

    );

}