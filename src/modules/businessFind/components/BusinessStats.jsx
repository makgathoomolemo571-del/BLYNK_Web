import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Briefcase,
  Activity,
  Users,
} from "lucide-react";

const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">

    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
      {icon}
    </div>

    <div className="flex flex-col">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        {title}
      </span>

      <span className="text-3xl font-bold text-zinc-900 dark:text-white">
        {value.toLocaleString()}
      </span>
    </div>

  </div>
);

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const BusinessStats = ({ campaigns = [] }) => {

  const stats = useMemo(() => {

    let totalCampaigns = campaigns.length;

    let activeCampaigns = 0;

    let totalApplications = 0;

    campaigns.forEach((campaign) => {

      if (campaign.status === "active")
        activeCampaigns++;

      totalApplications +=
        campaign.applications?.length || 0;

    });

    return {

      totalCampaigns,

      activeCampaigns,

      totalApplications,

    };

  }, [campaigns]);

  return (

    <section className="grid gap-5 md:grid-cols-3">

      <StatCard
        icon={<Briefcase size={26} />}
        title="Campaigns"
        value={stats.totalCampaigns}
      />

      <StatCard
        icon={<Activity size={26} />}
        title="Active Campaigns"
        value={stats.activeCampaigns}
      />

      <StatCard
        icon={<Users size={26} />}
        title="Applications"
        value={stats.totalApplications}
      />

    </section>

  );

};

BusinessStats.propTypes = {

  campaigns: PropTypes.arrayOf(

    PropTypes.shape({

      id: PropTypes.string,

      status: PropTypes.string,

      applications: PropTypes.array,

    })

  ),

};

export default React.memo(BusinessStats);