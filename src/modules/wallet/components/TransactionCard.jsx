import React from "react";
import PropTypes from "prop-types";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    CreditCard,
    RotateCcw,
    Wallet,
    ShoppingBag,
    Users,
    BadgeDollarSign,
    CheckCircle2,
    Clock3,
    XCircle,
    Ban
} from "lucide-react";

const typeIcons = {
    credit: <Wallet size={18} />,
    debit: <Wallet size={18} />,
    deposit: <ArrowDownCircle size={18} />,
    withdrawal: <ArrowUpCircle size={18} />,
    refund: <RotateCcw size={18} />,
    commission: <BadgeDollarSign size={18} />,
    tip: <CreditCard size={18} />,
    subscription: <CreditCard size={18} />,
    marketplace: <ShoppingBag size={18} />,
    creator_hire: <Users size={18} />,
    business_payment: <BadgeDollarSign size={18} />
};

const statusIcons = {
    completed: (
        <CheckCircle2
            size={16}
            className="text-green-600"
        />
    ),

    pending: (
        <Clock3
            size={16}
            className="text-yellow-500"
        />
    ),

    failed: (
        <XCircle
            size={16}
            className="text-red-600"
        />
    ),

    cancelled: (
        <Ban
            size={16}
            className="text-zinc-500"
        />
    )
};

const amountColor = (type) => {

    switch (type) {

        case "deposit":
        case "credit":
        case "refund":
        case "commission":
        case "tip":
            return "text-green-600";

        default:
            return "text-red-600";
    }

};

const amountPrefix = (type) => {

    switch (type) {

        case "deposit":
        case "credit":
        case "refund":
        case "commission":
        case "tip":
            return "+";

        default:
            return "-";
    }

};

const TransactionCard = ({ transaction }) => {

    if (!transaction) return null;

    return (

        <article
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:shadow-lg transition-all"
        >

            <div className="flex items-start justify-between">

                <div className="flex gap-3">

                    <div
                        className="w-11 h-11 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
                    >
                        {typeIcons[transaction.type]}
                    </div>

                    <div>

                        <h3
                            className="font-semibold capitalize text-zinc-900 dark:text-white"
                        >
                            {transaction.type.replace("_", " ")}
                        </h3>

                        <p
                            className="text-sm text-zinc-500"
                        >
                            {transaction.description || "No description"}
                        </p>

                        <p
                            className="text-xs text-zinc-400 mt-1"
                        >
                            Ref:
                            {" "}
                            {transaction.reference || "N/A"}
                        </p>

                    </div>

                </div>

                <div className="text-right">

                    <p
                        className={`font-bold text-lg ${amountColor(transaction.type)}`}
                    >
                        {amountPrefix(transaction.type)}
                        {transaction.currency}
                        {" "}
                        {Number(transaction.amount).toLocaleString()}
                    </p>

                    <div
                        className="flex items-center justify-end gap-1 mt-1"
                    >
                        {statusIcons[transaction.status]}

                        <span
                            className="capitalize text-xs text-zinc-500"
                        >
                            {transaction.status}
                        </span>

                    </div>

                </div>

            </div>

            <div
                className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-3 flex items-center justify-between text-xs text-zinc-500"
            >

                <span>
                    {new Date(
                        transaction.createdAt
                    ).toLocaleString()}
                </span>

                <span>
                    ID:
                    {" "}
                    {transaction.id}
                </span>

            </div>

        </article>

    );

};

TransactionCard.propTypes = {

    transaction: PropTypes.shape({

        id: PropTypes.string.isRequired,

        type: PropTypes.string.isRequired,

        amount: PropTypes.number.isRequired,

        currency: PropTypes.string.isRequired,

        status: PropTypes.string.isRequired,

        reference: PropTypes.string,

        description: PropTypes.string,

        createdAt: PropTypes.string.isRequired

    }).isRequired

};

export default React.memo(TransactionCard);