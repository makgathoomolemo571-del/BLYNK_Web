// src/modules/monetization/components/WalletCard.jsx

import {
    Wallet,
    CreditCard,
    TrendingUp,
    Clock
} from "lucide-react";

export default function WalletCard({
    wallet,
    onWithdraw,
    onHistory
}) {

    if (!wallet) {
        return (
            <div className="rounded-2xl bg-white shadow p-6">
                Loading wallet...
            </div>
        );
    }

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 border">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold flex items-center gap-2">

                        <Wallet
                            className="text-purple-600"
                            size={28}
                        />

                        Creator Wallet

                    </h2>

                    <p className="text-zinc-500">
                        Your monetization earnings
                    </p>

                </div>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="rounded-xl bg-purple-50 p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <Wallet
                            size={18}
                            className="text-purple-600"
                        />

                        <span className="text-sm font-medium">
                            Available
                        </span>

                    </div>

                    <h3 className="text-2xl font-bold">

                        R {(wallet.available ?? 0).toFixed(2)}

                    </h3>

                </div>

                <div className="rounded-xl bg-yellow-50 p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <Clock
                            size={18}
                            className="text-yellow-600"
                        />

                        <span className="text-sm font-medium">
                            Pending
                        </span>

                    </div>

                    <h3 className="text-2xl font-bold">

                        R {(wallet.pending ?? 0).toFixed(2)}

                    </h3>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <TrendingUp
                            size={18}
                            className="text-green-600"
                        />

                        <span className="text-sm font-medium">
                            Lifetime
                        </span>

                    </div>

                    <h3 className="text-2xl font-bold">

                        R {(wallet.lifetime ?? 0).toFixed(2)}

                    </h3>

                </div>

                <div className="rounded-xl bg-blue-50 p-4">

                    <div className="flex items-center gap-2 mb-2">

                        <CreditCard
                            size={18}
                            className="text-blue-600"
                        />

                        <span className="text-sm font-medium">
                            Withdrawn
                        </span>

                    </div>

                    <h3 className="text-2xl font-bold">

                        R {(wallet.withdrawn ?? 0).toFixed(2)}

                    </h3>

                </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">

                <button
                    onClick={onWithdraw}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                    Withdraw Funds
                </button>

                <button
                    onClick={onHistory}
                    className="border px-6 py-3 rounded-xl hover:bg-zinc-100 transition"
                >
                    View Transactions
                </button>

            </div>

        </div>

    );

}