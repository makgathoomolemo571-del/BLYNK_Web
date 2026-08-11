import { useMemo, useState } from "react";

const useBusinessFilters = (campaigns = []) => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        !search ||
        campaign.businessName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        campaign.campaignName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesIndustry =
        !industry || campaign.industry === industry;

      const matchesStatus =
        !status || campaign.status === status;

      const matchesVisibility =
        !visibility ||
        campaign.visibility === visibility;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesStatus &&
        matchesVisibility
      );
    });
  }, [
    campaigns,
    search,
    industry,
    status,
    visibility,
  ]);

  const resetFilters = () => {
    setSearch("");
    setIndustry("");
    setStatus("");
    setVisibility("");
  };

  return {
    search,
    industry,
    status,
    visibility,

    setSearch,
    setIndustry,
    setStatus,
    setVisibility,

    filteredCampaigns,
    resetFilters,
  };
};

export default useBusinessFilters;