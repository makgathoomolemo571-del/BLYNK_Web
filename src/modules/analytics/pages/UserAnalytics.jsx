// modules/analytics/pages/UserAnalytics.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import EngagementStats from "../components/EngagementStats";

import {
    fetchUserAnalytics
} from "../store/analyticsActions";

import {
    selectUserAnalytics,
    selectAnalyticsLoading,
    selectAnalyticsError
} from "../store/analyticsSelectors";

const UserAnalytics = () => {

    const dispatch = useDispatch();

    const analytics =
        useSelector(selectUserAnalytics);

    const loading =
        useSelector(selectAnalyticsLoading);

    const error =
        useSelector(selectAnalyticsError);

    useEffect(() => {

        dispatch(
            fetchUserAnalytics()
        );

    }, [dispatch]);

    if (loading) {

        return (

            <div className="flex items-center justify-center h-full">

                <span className="animate-pulse text-lg font-semibold">
                    Loading analytics...
                </span>

            </div>

        );

    }

    if (error) {

        return (

            <div className="flex justify-center items-center h-full">

                <div className="rounded-lg bg-red-100 text-red-700 px-6 py-4">

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="w-full p-6 space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    User Analytics

                </h1>

                <p className="text-gray-500">

                    Personal engagement overview

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <AnalyticsCard

                    title="Profile Views"

                    value={
                        analytics?.profileViews || 0
                    }

                />

                <AnalyticsCard

                    title="Today's Events"

                    value={
                        analytics?.today || 0
                    }

                />

                <AnalyticsCard

                    title="This Week"

                    value={
                        analytics?.thisWeek || 0
                    }

                />

            </div>

            <AnalyticsChart

                analytics={analytics}

            />

            <EngagementStats

                analytics={analytics}

            />

        </div>

    );

};

export default UserAnalytics;