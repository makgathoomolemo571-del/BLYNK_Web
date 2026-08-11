import { useEffect, useMemo, useState } from "react";
import { CheckCircle, Crown, ShieldCheck, Rocket } from "lucide-react";

import { useSubscription } from "../hooks/useSubscription";
import subscriptionApi from "../services/subscription.api";

import planRules from "../../../config/subscriptionRules";
import pricing from "../../../config/plans.config";

const ICONS = {
    FREE_MEMBER: ShieldCheck,
    FREE_CREATOR: Rocket,
    MEMBER_BASIC: Crown,
    MEMBER_PLUS: Crown,
    MEMBER_VIP: Crown,
    CREATOR_BASIC: Rocket,
    CREATOR_PLUS: Rocket,
    CREATOR_PRO: Rocket,
    BUSINESS_BASIC: ShieldCheck,
    BUSINESS_PRO: ShieldCheck,
    BUSINESS_ENTERPRISE: ShieldCheck
};

export default function PlansPage() {

    const {
        subscription,
        refreshSubscription,
        upgradeSubscription
    } = useSubscription();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshSubscription();
    }, [refreshSubscription]);

    const plans = useMemo(() => {

        return Object.keys(pricing).map((key) => {

            return {

                id: key,

                ...pricing[key],

                ...planRules[key]

            };

        });

    }, []);

    const upgrade = async (plan) => {

        try {

            setLoading(true);

            await upgradeSubscription(plan);

            await refreshSubscription();

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">

                    Choose Your Plan

                </h1>

                <p className="text-zinc-500 mt-2">

                    Unlock creator tools, marketplace access, analytics,
                    verification and rewards.

                </p>

            </div>

            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">

                {

                    plans.map(plan => {

                        const Icon =
                            ICONS[plan.id] || Crown;

                        const active =
                            subscription?.plan === plan.id;

                        return (

                            <div

                                key={plan.id}

                                className={`rounded-3xl border bg-white shadow-sm overflow-hidden transition hover:shadow-lg ${
                                    active
                                        ? "border-blue-600"
                                        : "border-zinc-200"
                                }`}

                            >

                                <div className="p-8">

                                    <Icon
                                        size={42}
                                        className="text-blue-600 mb-5"
                                    />

                                    <h2 className="text-2xl font-bold">

                                        {plan.name}

                                    </h2>

                                    <div className="mt-4">

                                        <span className="text-5xl font-bold">

                                            R{plan.price}

                                        </span>

                                        <span className="text-zinc-500">

                                            /{plan.billing}

                                        </span>

                                    </div>

                                    {

                                        active && (

                                            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">

                                                <CheckCircle
                                                    size={18}
                                                />

                                                Current Plan

                                            </div>

                                        )

                                    }

                                </div>

                                <div className="border-t p-8">

                                    <h3 className="font-semibold mb-4">

                                        Limits

                                    </h3>

                                    <ul className="space-y-3">

                                        {

                                            Object.entries(plan.limits || {})

                                                .map(([key, value]) => (

                                                    <li
                                                        key={key}
                                                        className="flex justify-between"
                                                    >

                                                        <span>

                                                            {key}

                                                        </span>

                                                        <strong>

                                                            {

                                                                value === -1
                                                                    ? "Unlimited"
                                                                    : value

                                                            }

                                                        </strong>

                                                    </li>

                                                ))

                                        }

                                    </ul>

                                </div>

                                <div className="border-t p-8">

                                    <h3 className="font-semibold mb-4">

                                        Features

                                    </h3>

                                    <ul className="space-y-2">

                                        {

                                            Object.entries(plan.features || {})

                                                .map(([feature, enabled]) => (

                                                    <li
                                                        key={feature}
                                                        className={`flex items-center justify-between ${
                                                            enabled
                                                                ? "text-green-600"
                                                                : "text-zinc-400"
                                                        }`}
                                                    >

                                                        <span>

                                                            {feature}

                                                        </span>

                                                        <CheckCircle
                                                            size={18}
                                                        />

                                                    </li>

                                                ))

                                        }

                                    </ul>

                                </div>

                                <div className="p-8 border-t">

                                    <button

                                        disabled={
                                            active ||
                                            loading
                                        }

                                        onClick={() =>
                                            upgrade(plan.id)
                                        }

                                        className={`w-full rounded-xl py-4 font-semibold transition ${
                                            active
                                                ? "bg-zinc-300 cursor-default"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}

                                    >

                                        {

                                            active
                                                ? "Current Plan"
                                                : loading
                                                    ? "Processing..."
                                                    : "Upgrade"

                                        }

                                    </button>

                                </div>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}