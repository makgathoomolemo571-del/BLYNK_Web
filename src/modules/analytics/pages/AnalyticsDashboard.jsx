// modules/analytics/pages/AnalyticsDashboard.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AnalyticsCard from "../components/AnalyticsCard";
import EngagementStats from "../components/EngagementStats";
import RevenueStats from "../components/RevenueStats";
import AnalyticsChart from "../components/AnalyticsChart";

import { fetchPlatformAnalytics } from "../store/analyticsSlice";

const AnalyticsDashboard = () => {

    const dispatch = useDispatch();

    const {
        loading,
        error,
        platform
    } = useSelector(
        state => state.analytics
    );

    useEffect(() => {

        dispatch(
            fetchPlatformAnalytics()
        );

    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-lg font-semibold">
                Loading analytics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600 font-semibold">
                {error}
            </div>
        );
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-3xl font-bold">
                    Platform Analytics
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor platform activity in real time.
                </p>

            </div>

            <section
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6"
            >

                <AnalyticsCard
                    title="Total Events"
                    value={platform.totalEvents}
                />

                <AnalyticsCard
                    title="Today's Events"
                    value={platform.today}
                />

                <AnalyticsCard
                    title="This Week"
                    value={platform.thisWeek}
                />

            </section>

            <AnalyticsChart
                analytics={platform}
            />

            <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6"
            >

                <EngagementStats
                    analytics={platform}
                />

                <RevenueStats
                    analytics={platform}
                />

            </div>

        </div>

    );

};

export default AnalyticsDashboard;