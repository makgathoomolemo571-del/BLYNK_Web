// modules/subscription/components/PlanCard.jsx

import React, { memo } from "react";
import PropTypes from "prop-types";

import {
    FaCheckCircle,
    FaTimesCircle,
    FaInfinity,
    FaStar
} from "react-icons/fa";

const unlimited = (value) =>
    value === -1 ? (
        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
            <FaInfinity />
            Unlimited
        </span>
    ) : (
        value
    );

const Feature = ({ title, enabled }) => (
    <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">

        <span className="text-sm text-zinc-700 dark:text-zinc-300">
            {title}
        </span>

        {enabled ? (
            <FaCheckCircle className="text-green-500" />
        ) : (
            <FaTimesCircle className="text-red-500" />
        )}
    </div>
);

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired
};

const Limit = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">

        <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {label}
        </span>

        <span className="font-semibold text-zinc-900 dark:text-white">
            {unlimited(value)}
        </span>

    </div>
);

Limit.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

const PlanCard = ({
    pricing,
    rules,
    currentPlan,
    loading = false,
    onUpgrade
}) => {

    if (!pricing || !rules) return null;

    const active =
        currentPlan === pricing.name.toUpperCase().replace(/ /g, "_") ||
        currentPlan === pricing.key;

    return (

        <article className={`rounded-2xl border overflow-hidden bg-white dark:bg-zinc-900 transition-all duration-300

        ${active
                ? "border-blue-600 shadow-xl"
                : "border-zinc-200 dark:border-zinc-800"
            }`}>

            <header className="p-6 border-b border-zinc-200 dark:border-zinc-800">

                <div className="flex justify-between items-center">

                    <h2 className="text-xl font-bold">
                        {rules.displayName}
                    </h2>

                    {active && (
                        <span className="flex items-center gap-1 bg-blue-600 text-white rounded-full px-3 py-1 text-xs">

                            <FaStar />

                            Current

                        </span>
                    )}

                </div>

                <h3 className="mt-5 text-5xl font-extrabold">

                    {pricing.currency}

                    {pricing.price}

                </h3>

                <p className="text-zinc-500 mt-2">

                    billed {pricing.billing}

                </p>

            </header>

            <section className="p-6">

                <h4 className="font-bold mb-3">

                    Limits

                </h4>

                {Object.entries(rules.limits || {}).map(
                    ([key, value]) => (

                        <Limit
                            key={key}
                            label={key}
                            value={value}
                        />

                    )
                )}

            </section>

            <section className="px-6 pb-6">

                <h4 className="font-bold mb-3">

                    Features

                </h4>

                {Object.entries(rules.features || {}).map(
                    ([key, value]) => (

                        <Feature
                            key={key}
                            title={key}
                            enabled={value}
                        />

                    )
                )}

            </section>

            <footer className="p-6 border-t border-zinc-200 dark:border-zinc-800">

                <button
                    disabled={active || loading}
                    onClick={() => onUpgrade(pricing.key)}
                    className={`w-full rounded-xl py-3 font-semibold transition

                    ${active
                            ? "bg-zinc-300 cursor-not-allowed dark:bg-zinc-700"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}>

                    {active
                        ? "Current Plan"
                        : loading
                            ? "Processing..."
                            : "Upgrade"}

                </button>

            </footer>

        </article>

    );

};

PlanCard.propTypes = {

    pricing: PropTypes.shape({

        key: PropTypes.string,

        name: PropTypes.string,

        price: PropTypes.number,

        currency: PropTypes.string,

        billing: PropTypes.string

    }),

    rules: PropTypes.shape({

        displayName: PropTypes.string,

        limits: PropTypes.object,

        features: PropTypes.object

    }),

    currentPlan: PropTypes.string,

    loading: PropTypes.bool,

    onUpgrade: PropTypes.func

};

export default memo(PlanCard);