// src/modules/monetization/pages/EarningsDashboard.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    fetchDashboard
} from "../store/monetizationSlice";

import {
    DollarSign,
    Wallet,
    TrendingUp,
    Calendar,
    CreditCard,
    BarChart3
} from "lucide-react";

export default function EarningsDashboard() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        dashboard,
        loading
    } = useSelector(
        state => state.monetization
    );

    useEffect(() => {

        dispatch(fetchDashboard());

    }, [dispatch]);

    if (loading) {

        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        );

    }

    const data = dashboard || {};

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold">

                        Earnings Dashboard

                    </h1>

                    <p className="text-zinc-500 mt-2">

                        Manage your creator income

                    </p>

                </div>

                <button
                    onClick={() =>
                        navigate("/monetization/payout")
                    }
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >

                    Withdraw

                </button>

            </div>

            <div className="grid md:grid-cols-4 gap-5">

                <Card

                    title="Available"

                    value={`R ${data.availableBalance || 0}`}

                    icon={<Wallet />}

                />

                <Card

                    title="Pending"

                    value={`R ${data.pendingBalance || 0}`}

                    icon={<CreditCard />}

                />

                <Card

                    title="Lifetime"

                    value={`R ${data.totalEarnings || 0}`}

                    icon={<DollarSign />}

                />

                <Card

                    title="Today"

                    value={`R ${data.today || 0}`}

                    icon={<TrendingUp />}

                />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-lg mb-5">

                        Revenue Overview

                    </h2>

                    <div className="h-72 flex items-center justify-center text-zinc-400">

                        Revenue Chart

                    </div>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="font-bold text-lg mb-5">

                        Revenue Sources

                    </h2>

                    <div className="space-y-3">

                        <Source
                            name="Advertisements"
                            value={data.adsRevenue}
                        />

                        <Source
                            name="Subscriptions"
                            value={data.subscriptionRevenue}
                        />

                        <Source
                            name="Marketplace"
                            value={data.marketplaceRevenue}
                        />

                        <Source
                            name="Creator Hire"
                            value={data.creatorHireRevenue}
                        />

                        <Source
                            name="Tips"
                            value={data.tipRevenue}
                        />

                        <Source
                            name="Stars"
                            value={data.starRevenue}
                        />

                        <Source
                            name="Watch Parties"
                            value={data.watchPartyRevenue}
                        />

                        <Source
                            name="Podcasts"
                            value={data.podcastRevenue}
                        />

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

                <div className="flex justify-between items-center mb-5">

                    <h2 className="font-bold text-lg">

                        Recent Earnings

                    </h2>

                    <button

                        onClick={() =>
                            navigate("/monetization/analytics")
                        }

                        className="text-blue-600 flex items-center gap-2"

                    >

                        <BarChart3 size={18}/>

                        Analytics

                    </button>

                </div>

                {

                    data.transactions?.length

                        ?

                        data.transactions.map(item => (

                            <div

                                key={item.id}

                                className="flex justify-between border-b py-4"

                            >

                                <div>

                                    <h4 className="font-medium">

                                        {item.source}

                                    </h4>

                                    <small className="text-zinc-500">

                                        {item.createdAt}

                                    </small>

                                </div>

                                <div className="font-bold text-green-600">

                                    +R {item.amount}

                                </div>

                            </div>

                        ))

                        :

                        <div className="text-zinc-500">

                            No earnings yet.

                        </div>

                }

            </div>

        </div>

    );

}

function Card({

    title,

    value,

    icon

}) {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <div className="flex justify-between">

                <div>

                    <p className="text-zinc-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-blue-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}

function Source({

    name,

    value

}) {

    return (

        <div className="flex justify-between">

            <span>{name}</span>

            <strong>

                R {value || 0}

            </strong>

        </div>

    );

}