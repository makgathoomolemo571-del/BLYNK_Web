// src/modules/monetization/pages/MonetizationHome.jsx

import { useNavigate } from "react-router-dom";

import {
    Wallet,
    DollarSign,
    BarChart3,
    CreditCard,
    Users,
    Gift,
    Star,
    Briefcase,
    Megaphone,
    Receipt,
    Settings
} from "lucide-react";

export default function MonetizationHome() {

    const navigate = useNavigate();

    const cards = [

        {
            title: "Earnings Dashboard",
            description: "View total earnings and creator statistics.",
            icon: DollarSign,
            color: "text-green-600",
            path: "/monetization/dashboard"
        },

        {
            title: "Wallet",
            description: "Manage your available balance.",
            icon: Wallet,
            color: "text-blue-600",
            path: "/monetization/wallet"
        },

        {
            title: "Analytics",
            description: "Revenue, views and audience insights.",
            icon: BarChart3,
            color: "text-purple-600",
            path: "/monetization/analytics"
        },

        {
            title: "Withdrawals",
            description: "Request payouts and view history.",
            icon: CreditCard,
            color: "text-red-600",
            path: "/monetization/payouts"
        },

        {
            title: "Subscriptions",
            description: "Manage paid subscribers.",
            icon: Users,
            color: "text-orange-600",
            path: "/monetization/subscriptions"
        },

        {
            title: "Tips",
            description: "View supporter tips.",
            icon: Gift,
            color: "text-pink-600",
            path: "/monetization/tips"
        },

        {
            title: "Stars",
            description: "Creator stars and gifts.",
            icon: Star,
            color: "text-yellow-500",
            path: "/monetization/stars"
        },

        {
            title: "Affiliate",
            description: "Affiliate revenue dashboard.",
            icon: Briefcase,
            color: "text-cyan-600",
            path: "/monetization/affiliate"
        },

        {
            title: "Sponsors",
            description: "Brand campaigns and sponsorships.",
            icon: Megaphone,
            color: "text-indigo-600",
            path: "/monetization/sponsors"
        },

        {
            title: "Tax Center",
            description: "Invoices and tax reports.",
            icon: Receipt,
            color: "text-emerald-600",
            path: "/monetization/tax"
        },

        {
            title: "Settings",
            description: "Configure monetization.",
            icon: Settings,
            color: "text-zinc-600",
            path: "/monetization/settings"
        }

    ];

    return (

        <div className="max-w-7xl mx-auto p-8">

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    Monetization
                </h1>

                <p className="text-zinc-500 mt-2">
                    Manage your creator income, subscriptions, payouts,
                    sponsorships and revenue.
                </p>

            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

                {cards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <button
                            key={card.title}
                            onClick={() => navigate(card.path)}
                            className="rounded-2xl border bg-white hover:shadow-xl transition p-6 text-left"
                        >

                            <Icon
                                size={42}
                                className={`${card.color} mb-5`}
                            />

                            <h2 className="font-bold text-xl">
                                {card.title}
                            </h2>

                            <p className="text-zinc-500 mt-2">
                                {card.description}
                            </p>

                        </button>

                    );

                })}

            </div>

        </div>

    );

}