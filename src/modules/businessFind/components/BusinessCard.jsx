// modules/businessFind/components/BusinessCard.jsx

import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Building2,
  Briefcase,
  Users,
  Wallet,
  CalendarDays,
  Eye,
} from "lucide-react";

const STATUS_COLORS = {
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

  paused:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",

  closed:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
};

const VISIBILITY_COLORS = {
  public:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",

  private:
    "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
};

const formatCurrency = (amount) => {

  if (!amount) return "Negotiable";

  return new Intl.NumberFormat(
    "en-ZA",
    {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0
    }
  ).format(amount);

};

const BusinessCard = ({
  campaign,
  onOpen
}) => {

  return (

    <article
      onClick={() => onOpen(campaign)}
      className="
      cursor-pointer
      rounded-2xl
      border
      border-zinc-200
      dark:border-zinc-800
      bg-white
      dark:bg-zinc-900
      shadow-sm
      hover:shadow-lg
      transition-all
      duration-300
      overflow-hidden
      "
    >

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">

              {campaign.campaignName}

            </h2>

            <div className="mt-2 flex items-center gap-2 text-zinc-500">

              <Building2 size={17} />

              <span>

                {campaign.businessName}

              </span>

            </div>

          </div>

          <span
            className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${STATUS_COLORS[campaign.status]}
            `}
          >

            {campaign.status}

          </span>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="flex gap-2 items-center">

            <Briefcase
              size={18}
              className="text-blue-500"
            />

            <div>

              <small className="text-zinc-400">

                Industry

              </small>

              <p className="font-semibold">

                {campaign.industry}

              </p>

            </div>

          </div>

          <div className="flex gap-2 items-center">

            <Wallet
              size={18}
              className="text-green-500"
            />

            <div>

              <small className="text-zinc-400">

                Budget

              </small>

              <p className="font-semibold">

                {formatCurrency(
                  campaign.campaignBudget
                )}

              </p>

            </div>

          </div>

          <div className="flex gap-2 items-center">

            <Users
              size={18}
              className="text-purple-500"
            />

            <div>

              <small className="text-zinc-400">

                Audience

              </small>

              <p className="font-semibold">

                {campaign.targetAudience}

              </p>

            </div>

          </div>

          <div className="flex gap-2 items-center">

            <Eye
              size={18}
              className="text-orange-500"
            />

            <div>

              <small className="text-zinc-400">

                Visibility

              </small>

              <span
                className={`
                px-2
                py-1
                rounded-full
                text-xs
                font-medium
                ${VISIBILITY_COLORS[campaign.visibility]}
                `}
              >

                {campaign.visibility}

              </span>

            </div>

          </div>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold mb-2">

            Campaign Objective

          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">

            {campaign.campaignObjectives}

          </p>

        </div>

        <div className="mt-6 flex justify-between items-center border-t pt-4">

          <div className="text-sm">

            <strong>

              {campaign.applications?.length || 0}

            </strong>{" "}

            Applications

          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <CalendarDays size={16} />

            {new Date(
              campaign.createdAt
            ).toLocaleDateString()}

          </div>

        </div>

      </div>

    </article>

  );

};

BusinessCard.propTypes = {

  campaign: PropTypes.shape({

    id: PropTypes.string,

    business: PropTypes.string,

    businessName: PropTypes.string,

    industry: PropTypes.string,

    campaignName: PropTypes.string,

    campaignObjectives: PropTypes.string,

    targetAudience: PropTypes.string,

    campaignBudget: PropTypes.number,

    compensationType: PropTypes.string,

    status: PropTypes.string,

    visibility: PropTypes.string,

    applications: PropTypes.array,

    createdAt: PropTypes.string

  }).isRequired,

  onOpen: PropTypes.func

};

BusinessCard.defaultProps = {

  onOpen: () => {}

};

export default memo(BusinessCard);