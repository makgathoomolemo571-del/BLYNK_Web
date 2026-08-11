// modules/analytics/pages/BusinessAnalytics.jsx

import { useEffect, useState } from "react";

import useAnalytics from "../hooks/useAnalytics";

import AnalyticsCard from "../components/AnalyticsCard";
import RevenueStats from "../components/RevenueStats";
import EngagementStats from "../components/EngagementStats";
import AnalyticsFilter from "../components/AnalyticsFilter";

const BusinessAnalytics = () => {

  const {
    loading,
    error,
    getBusinessAnalytics
  } = useAnalytics();

  const [period, setPeriod] =
    useState("30d");

  const [analytics, setAnalytics] =
    useState({

      totalEvents: 0,

      profileViews: 0,

      marketplaceViews: 0,

      campaignViews: 0,

      applications: 0,

      clicks: 0,

      impressions: 0,

      vouchersRedeemed: 0,

      vigPointsEarned: 0,

      metadata: {}

    });

  useEffect(() => {

    loadAnalytics();

  }, [period]);

  const loadAnalytics =
  async () => {

    try {

      const data =
      await getBusinessAnalytics(period);

      setAnalytics(data);

    } catch (err) {

      console.error(err);

    }

  };

  if (loading) {

    return (

      <div className="flex items-center justify-center h-screen">

        <span className="animate-pulse text-lg font-semibold">

          Loading analytics...

        </span>

      </div>

    );

  }

  if (error) {

    return (

      <div className="flex items-center justify-center h-screen text-red-600">

        {error}

      </div>

    );

  }

  return (

    <div className="w-full p-6 space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          Business Analytics

        </h1>

        <AnalyticsFilter

          value={period}

          onChange={setPeriod}

        />

      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

        <AnalyticsCard

          title="Total Events"

          value={analytics.totalEvents}

        />

        <AnalyticsCard

          title="Profile Views"

          value={analytics.profileViews}

        />

        <AnalyticsCard

          title="Marketplace Views"

          value={analytics.marketplaceViews}

        />

        <AnalyticsCard

          title="Campaign Views"

          value={analytics.campaignViews}

        />

        <AnalyticsCard

          title="Applications"

          value={analytics.applications}

        />

        <AnalyticsCard

          title="Clicks"

          value={analytics.clicks}

        />

        <AnalyticsCard

          title="Impressions"

          value={analytics.impressions}

        />

        <AnalyticsCard

          title="VIG Points"

          value={analytics.vigPointsEarned}

        />

      </div>

      <EngagementStats

        data={analytics}

      />

      <RevenueStats

        vouchersRedeemed={
          analytics.vouchersRedeemed
        }

        vigPointsEarned={
          analytics.vigPointsEarned
        }

      />

    </div>

  );

};

export default BusinessAnalytics;