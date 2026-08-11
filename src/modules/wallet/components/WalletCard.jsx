import React from "react";
import PropTypes from "prop-types";

import {
    Wallet,
    TrendingUp,
    TrendingDown,
    BadgeCent,
    ShieldCheck
} from "lucide-react";

const statusColors = {
    active:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

    frozen:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    suspended:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",

    closed:
        "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
};

const money = (value, currency) =>
    new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency
    }).format(value || 0);

export default function WalletCard({ wallet }) {
    if (!wallet) return null;

    return (
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 text-white">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="text-sm opacity-80">
                            BLYNK Wallet
                        </div>

                        <h2 className="text-4xl font-bold mt-2">
                            {money(
                                wallet.balance,
                                wallet.currency
                            )}
                        </h2>

                    </div>

                    <Wallet size={52} />

                </div>

                <div className="mt-6 flex items-center gap-2">

                    <ShieldCheck size={18} />

                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[
                                wallet.status
                            ]
                        }`}
                    >
                        {wallet.status.toUpperCase()}
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 p-6">

                <Stat
                    icon={<TrendingUp size={20} />}
                    title="Deposits"
                    value={money(
                        wallet.totalDeposits,
                        wallet.currency
                    )}
                />

                <Stat
                    icon={<TrendingDown size={20} />}
                    title="Withdrawals"
                    value={money(
                        wallet.totalWithdrawals,
                        wallet.currency
                    )}
                />

                <Stat
                    icon={<BadgeCent size={20} />}
                    title="Revenue"
                    value={money(
                        wallet.totalRevenue,
                        wallet.currency
                    )}
                />

                <Info
                    label="Currency"
                    value={wallet.currency}
                />

                <Info
                    label="Wallet ID"
                    value={wallet.id}
                />

                <Info
                    label="Created"
                    value={new Date(
                        wallet.createdAt
                    ).toLocaleDateString()}
                />

            </div>

        </div>
    );
}

function Stat({
    icon,
    title,
    value
}) {
    return (
        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 p-4">

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">

                {icon}

                <span className="text-sm font-semibold">
                    {title}
                </span>

            </div>

            <div className="text-lg font-bold text-zinc-900 dark:text-white">
                {value}
            </div>

        </div>
    );
}

function Info({
    label,
    value
}) {
    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">

            <div className="text-xs uppercase tracking-wide text-zinc-500">

                {label}

            </div>

            <div className="mt-2 font-semibold text-zinc-900 dark:text-white break-all">

                {value}

            </div>

        </div>
    );
}

WalletCard.propTypes = {

    wallet: PropTypes.shape({

        id: PropTypes.string,

        balance: PropTypes.number,

        currency: PropTypes.string,

        status: PropTypes.string,

        totalDeposits: PropTypes.number,

        totalWithdrawals: PropTypes.number,

        totalRevenue: PropTypes.number,

        createdAt: PropTypes.string

    })

};