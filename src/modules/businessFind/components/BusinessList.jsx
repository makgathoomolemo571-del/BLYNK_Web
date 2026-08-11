import React from "react";
import PropTypes from "prop-types";
import BusinessCard from "./BusinessCard";

const BusinessList = ({
  campaigns = [],
  loading = false,
  emptyMessage = "No campaigns found.",
  onView,
  onApply,
  onDelete,
  onStatusChange
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-72 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!campaigns.length) {
    return (
      <div className="flex items-center justify-center h-72 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700">
        <p className="text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign) => (
        <BusinessCard
          key={campaign.id}
          campaign={campaign}
          onView={onView}
          onApply={onApply}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

BusinessList.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      business: PropTypes.string,
      businessName: PropTypes.string,
      industry: PropTypes.string,
      campaignName: PropTypes.string,
      campaignObjectives: PropTypes.string,
      targetAudience: PropTypes.string,
      campaignBudget: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      compensationType: PropTypes.string,
      status: PropTypes.string,
      visibility: PropTypes.string,
      applications: PropTypes.array,
      createdAt: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onView: PropTypes.func,
  onApply: PropTypes.func,
  onDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default React.memo(BusinessList);