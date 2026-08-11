// modules/wallet/components/WalletBalance.jsx

import { memo } from "react";
import PropTypes from "prop-types";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Coins
} from "lucide-react";

const formatMoney = (value = 0, currency = "ZAR") =>
    new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency
    }).format(Number(value));

function WalletBalance({ wallet }) {

    if (!wallet) return null;

    return (
        <section className="w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-6 text-white">

                <div className="flex items-center gap-3">

                    <div className="p-3 rounded-xl bg-white/15">

                        <Wallet size={30} />

                    </div>

                    <div>

                        <h2 className="text-lg font-semibold">
                            Wallet Balance
                        </h2>

                        <p className="text-sm text-blue-100">
                            {wallet.status.toUpperCase()}
                        </p>

                    </div>

                </div>

                <h1 className="mt-6 text-4xl font-bold">

                    {formatMoney(
                        wallet.balance,
                        wallet.currency
                    )}

                </h1>

                <p className="mt-2 text-sm text-blue-100">

                    Wallet ID

                    <span className="ml-2 font-medium text-white">

                        {wallet.id}

                    </span>

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

                <Card
                    icon={<TrendingUp />}
                    title="Total Deposits"
                    value={wallet.totalDeposits}
                    currency={wallet.currency}
                    color="text-emerald-600"
                />

                <Card
                    icon={<TrendingDown />}
                    title="Total Withdrawals"
                    value={wallet.totalWithdrawals}
                    currency={wallet.currency}
                    color="text-red-600"
                />

                <Card
                    icon={<Coins />}
                    title="Total Revenue"
                    value={wallet.totalRevenue}
                    currency={wallet.currency}
                    color="text-amber-500"
                />

            </div>

        </section>
    );

}

function Card({
    icon,
    title,
    value,
    currency,
    color
}) {

    return (

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-950">

            <div className={`mb-3 ${color}`}>

                {icon}

            </div>

            <p className="text-sm text-zinc-500">

                {title}

            </p>

            <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">

                {formatMoney(value, currency)}

            </h3>

        </div>

    );

}

WalletBalance.propTypes = {

    wallet: PropTypes.shape({

        id: PropTypes.string.isRequired,

        userId: PropTypes.string,

        balance: PropTypes.number.isRequired,

        currency: PropTypes.string.isRequired,

        status: PropTypes.string.isRequired,

        totalDeposits: PropTypes.number.isRequired,

        totalWithdrawals: PropTypes.number.isRequired,

        totalRevenue: PropTypes.number.isRequired,

        createdAt: PropTypes.string

    }).isRequired

};

Card.propTypes = {

    icon: PropTypes.node.isRequired,

    title: PropTypes.string.isRequired,

    value: PropTypes.number.isRequired,

    currency: PropTypes.string.isRequired,

    color: PropTypes.string.isRequired

};

export default memo(WalletBalance);