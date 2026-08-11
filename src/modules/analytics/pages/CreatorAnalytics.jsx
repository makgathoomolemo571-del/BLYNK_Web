// modules/analytics/pages/CreatorAnalytics.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AnalyticsCard from "../components/AnalyticsCard";

import {
    getCreatorAnalytics
} from "../store/analyticsActions";

import {
    selectCreatorAnalytics,
    selectAnalyticsLoading
} from "../store/analyticsSelectors";

const CreatorAnalytics = () => {

    const dispatch = useDispatch();

    const analytics =
        useSelector(selectCreatorAnalytics);

    const loading =
        useSelector(selectAnalyticsLoading);

    useEffect(() => {

        dispatch(
            getCreatorAnalytics()
        );

    }, [dispatch]);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />

            </div>

        );

    }

    return (

        <div className="w-full p-6 space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Creator Analytics

                </h1>

                <p className="text-gray-500 mt-1">

                    Performance statistics for your creator account.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <AnalyticsCard
                    title="Reel Views"
                    value={
                        analytics?.reelViews || 0
                    }
                />

                <AnalyticsCard
                    title="Podcast Plays"
                    value={
                        analytics?.podcastPlays || 0
                    }
                />

                <AnalyticsCard
                    title="Profile Views"
                    value={
                        analytics?.profileViews || 0
                    }
                />

                <AnalyticsCard
                    title="Total Engagement"
                    value={
                        (analytics?.reelViews || 0) +
                        (analytics?.podcastPlays || 0) +
                        (analytics?.profileViews || 0)
                    }
                />

            </div>

        </div>

    );

};

export default CreatorAnalytics;