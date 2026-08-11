// src/modules/monetization/pages/RevenueAnalytics.jsx

import { useEffect, useState } from "react";
import {
    DollarSign,
    Eye,
    Users,
    PlayCircle,
    TrendingUp,
    BarChart3,
    Calendar,
    Download
} from "lucide-react";

import monetizationApi from "../services/monetization.api";

export default function RevenueAnalytics() {

    const [loading, setLoading] = useState(true);

    const [analytics, setAnalytics] = useState({

        totalRevenue: 0,

        monthlyRevenue: 0,

        totalViews: 0,

        totalWatchTime: 0,

        subscribers: 0,

        followers: 0,

        estimatedPayout: 0,

        rpm: 0,

        cpm: 0,

        engagement: 0,

        topRevenueSource: "",

        revenueSources: []

    });

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            setLoading(true);

            const data =
                await monetizationApi.getAnalytics();

            setAnalytics(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                Loading Revenue Analytics...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Revenue Analytics

                    </h1>

                    <p className="text-zinc-500">

                        Complete creator earnings overview

                    </p>

                </div>

                <button
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl"
                >

                    <Download size={18} />

                    Export Report

                </button>

            </div>

            <div className="grid lg:grid-cols-4 gap-6">

                <StatCard
                    icon={<DollarSign />}
                    title="Lifetime Revenue"
                    value={`R ${analytics.totalRevenue}`}
                />

                <StatCard
                    icon={<TrendingUp />}
                    title="This Month"
                    value={`R ${analytics.monthlyRevenue}`}
                />

                <StatCard
                    icon={<Eye />}
                    title="Views"
                    value={analytics.totalViews}
                />

                <StatCard
                    icon={<Users />}
                    title="Subscribers"
                    value={analytics.subscribers}
                />

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                <InfoCard
                    title="Estimated Payout"
                    value={`R ${analytics.estimatedPayout}`}
                />

                <InfoCard
                    title="RPM"
                    value={`R ${analytics.rpm}`}
                />

                <InfoCard
                    title="CPM"
                    value={`R ${analytics.cpm}`}
                />

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <h2 className="text-2xl font-bold mb-5">

                    Revenue Sources

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">

                                Source

                            </th>

                            <th>

                                Revenue

                            </th>

                            <th>

                                Percentage

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {analytics.revenueSources.map((item) => (

                            <tr
                                key={item.name}
                                className="border-b"
                            >

                                <td className="py-4">

                                    {item.name}

                                </td>

                                <td className="text-center">

                                    R {item.amount}

                                </td>

                                <td className="text-center">

                                    {item.percent}%

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="font-bold text-xl mb-4">

                        Creator Performance

                    </h2>

                    <PerformanceRow
                        label="Followers"
                        value={analytics.followers}
                    />

                    <PerformanceRow
                        label="Subscribers"
                        value={analytics.subscribers}
                    />

                    <PerformanceRow
                        label="Views"
                        value={analytics.totalViews}
                    />

                    <PerformanceRow
                        label="Watch Time"
                        value={`${analytics.totalWatchTime} hrs`}
                    />

                    <PerformanceRow
                        label="Engagement"
                        value={`${analytics.engagement}%`}
                    />

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="font-bold text-xl mb-4">

                        Top Revenue Source

                    </h2>

                    <div className="text-5xl mb-5">

                        💰

                    </div>

                    <h3 className="text-2xl font-bold">

                        {analytics.topRevenueSource}

                    </h3>

                    <p className="text-zinc-500 mt-3">

                        Your highest earning content category.

                    </p>

                </div>

            </div>

        </div>

    );

}

function StatCard({

    icon,

    title,

    value

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-6">

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

function InfoCard({

    title,

    value

}) {

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <p className="text-zinc-500">

                {title}

            </p>

            <h2 className="text-2xl font-bold">

                {value}

            </h2>

        </div>

    );

}

function PerformanceRow({

    label,

    value

}) {

    return (

        <div className="flex justify-between py-3 border-b">

            <span>{label}</span>

            <strong>{value}</strong>

        </div>

    );

}