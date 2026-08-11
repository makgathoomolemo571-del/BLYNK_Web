// src/modules/monetization/pages/CreatorFund.jsx

import { useEffect, useState } from "react";
import {
    Wallet,
    DollarSign,
    Users,
    TrendingUp,
    CheckCircle,
    AlertCircle,
    Coins
} from "lucide-react";

import monetizationApi from "../services/monetization.api";

export default function CreatorFund() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const data =
                await monetizationApi.creatorFund();

            setDashboard(data);

        } catch (err) {

            setError(
                err?.response?.data?.message ||
                "Unable to load Creator Fund."
            );

        } finally {

            setLoading(false);

        }

    }

    async function apply() {

        try {

            await monetizationApi.applyCreatorFund();

            loadDashboard();

        } catch (err) {

            alert(
                err?.response?.data?.message ||
                "Unable to apply."
            );

        }

    }

    if (loading)
        return (
            <div className="p-8">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="p-8 text-red-600">
                {error}
            </div>
        );

    return (

        <div className="max-w-7xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">

                Creator Fund

            </h1>

            <div className="grid lg:grid-cols-4 gap-6">

                <Card
                    icon={<DollarSign />}
                    title="Available"
                    value={`R${dashboard.available}`}
                    color="bg-green-600"
                />

                <Card
                    icon={<Wallet />}
                    title="Lifetime"
                    value={`R${dashboard.lifetime}`}
                    color="bg-blue-600"
                />

                <Card
                    icon={<Users />}
                    title="Followers"
                    value={dashboard.followers}
                    color="bg-purple-600"
                />

                <Card
                    icon={<TrendingUp />}
                    title="Views"
                    value={dashboard.views}
                    color="bg-orange-600"
                />

            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-4">

                        Eligibility

                    </h2>

                    <Eligibility
                        title="Followers"
                        ok={dashboard.requirements.followers}
                    />

                    <Eligibility
                        title="Views"
                        ok={dashboard.requirements.views}
                    />

                    <Eligibility
                        title="Verified Identity"
                        ok={dashboard.requirements.kyc}
                    />

                    <Eligibility
                        title="No Community Violations"
                        ok={dashboard.requirements.community}
                    />

                    <Eligibility
                        title="Payment Setup"
                        ok={dashboard.requirements.payment}
                    />

                    <button

                        disabled={
                            dashboard.enrolled ||
                            !dashboard.eligible
                        }

                        onClick={apply}

                        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl"

                    >

                        {dashboard.enrolled
                            ? "Already Enrolled"
                            : "Apply"}

                    </button>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-xl font-bold mb-4">

                        Earnings Breakdown

                    </h2>

                    <div className="space-y-4">

                        <Row
                            label="Creator Fund"
                            value={`R${dashboard.earnings.creatorFund}`}
                        />

                        <Row
                            label="Advertisements"
                            value={`R${dashboard.earnings.ads}`}
                        />

                        <Row
                            label="Subscriptions"
                            value={`R${dashboard.earnings.subscriptions}`}
                        />

                        <Row
                            label="Tips"
                            value={`R${dashboard.earnings.tips}`}
                        />

                        <Row
                            label="Stars"
                            value={`R${dashboard.earnings.stars}`}
                        />

                        <Row
                            label="Marketplace"
                            value={`R${dashboard.earnings.marketplace}`}
                        />

                        <Row
                            label="Watch Parties"
                            value={`R${dashboard.earnings.watchParties}`}
                        />

                        <Row
                            label="Podcasts"
                            value={`R${dashboard.earnings.podcasts}`}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

function Card({
    icon,
    title,
    value,
    color
}) {

    return (

        <div className={`${color} text-white rounded-xl p-6`}>

            <div className="flex justify-between">

                {icon}

                <Coins />

            </div>

            <p className="mt-6 opacity-80">

                {title}

            </p>

            <h2 className="text-3xl font-bold">

                {value}

            </h2>

        </div>

    );

}

function Eligibility({
    title,
    ok
}) {

    return (

        <div className="flex justify-between py-3 border-b">

            <span>{title}</span>

            {ok
                ? <CheckCircle className="text-green-600"/>
                : <AlertCircle className="text-red-500"/>}

        </div>

    );

}

function Row({
    label,
    value
}) {

    return (

        <div className="flex justify-between border-b py-3">

            <span>{label}</span>

            <strong>{value}</strong>

        </div>

    );

}