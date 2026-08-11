import { useEffect, useState } from "react";
import {
  FaCoins,
  FaChartLine,
  FaArrowTrendUp,
  FaWallet
} from "react-icons/fa6";

import analyticsApi from "../services/analytics.api";

const StatCard = ({
  title,
  value,
  icon,
  color
}) => {

  return (
    <div
      className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
            {Number(value || 0).toLocaleString()}
          </h2>

        </div>

        <div
          className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );

};

export default function RevenueStats() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({

      totalEvents: 0,

      today: 0,

      thisWeek: 0,

      profileViews: 0

    });

  useEffect(() => {

    loadRevenue();

  }, []);

  const loadRevenue =
  async () => {

    try {

      const [
        platform,
        user
      ] = await Promise.all([

        analyticsApi.platform(),

        analyticsApi.user()

      ]);

      setStats({

        totalEvents:
          platform.totalEvents,

        today:
          platform.today,

        thisWeek:
          platform.thisWeek,

        profileViews:
          user.profileViews

      });

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {[1,2,3,4].map((i)=>(

          <div
            key={i}
            className="rounded-2xl h-36 animate-pulse bg-zinc-200 dark:bg-zinc-800"
          />

        ))}

      </div>

    );

  }

  return (

    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <StatCard

        title="Platform Events"

        value={stats.totalEvents}

        color="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"

        icon={<FaChartLine size={22}/>}

      />

      <StatCard

        title="Today's Events"

        value={stats.today}

        color="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"

        icon={<FaArrowTrendUp size={22}/>}

      />

      <StatCard

        title="This Week"

        value={stats.thisWeek}

        color="bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400"

        icon={<FaCoins size={22}/>}

      />

      <StatCard

        title="Profile Views"

        value={stats.profileViews}

        color="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"

        icon={<FaWallet size={22}/>}

      />

    </section>

  );

}