// modules/subscription/components/CurrentPlan.jsx

import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
  FaCalendarAlt,
  FaWallet,
  FaShieldAlt,
  FaChartLine,
  FaBroadcastTower,
} from "react-icons/fa";

import subscriptionRules from "../../../config/subscriptionRules";
import planPricing from "../../../config/plans.config";

const booleanIcon = (value) =>
  value ? (
    <FaCheckCircle className="text-emerald-500" />
  ) : (
    <FaTimesCircle className="text-red-500" />
  );

function FeatureRow({ label, enabled }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
      <span className="text-sm text-zinc-600 dark:text-zinc-300">
        {label}
      </span>

      {booleanIcon(enabled)}
    </div>
  );
}

FeatureRow.propTypes = {
  label: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
};

function LimitRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
      <span className="text-sm text-zinc-600 dark:text-zinc-300">
        {label}
      </span>

      <span className="font-semibold text-zinc-900 dark:text-white">
        {value === -1 ? "Unlimited" : value}
      </span>
    </div>
  );
}

LimitRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

function CurrentPlan({ subscription }) {
  const plan = useMemo(() => {
    return (
      subscriptionRules[
        subscription?.plan
      ] || {}
    );
  }, [subscription]);

  const pricing = useMemo(() => {
    return (
      planPricing[
        subscription?.plan
      ] || {}
    );
  }, [subscription]);

  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {plan.displayName}
            </h2>

            <p className="text-sm text-zinc-500 mt-1">
              {pricing.billing}
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-xs font-semibold ${
              subscription?.status === "active"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {subscription?.status}
          </span>

        </div>

        <div className="mt-5 flex items-end gap-2">

          <span className="text-4xl font-bold text-blue-600">
            {pricing.currency}
            {pricing.price}
          </span>

          <span className="text-zinc-500">
            / {pricing.billing}
          </span>

        </div>

      </div>

      {/* Subscription */}

      <div className="grid md:grid-cols-2 gap-6 p-6">

        <div>

          <h3 className="font-bold mb-4">
            Subscription
          </h3>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>
                <FaCalendarAlt className="inline mr-2" />
                Started
              </span>

              <strong>
                {subscription?.startDate
                  ? new Date(
                      subscription.startDate
                    ).toLocaleDateString()
                  : "--"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>
                End Date
              </span>

              <strong>
                {subscription?.endDate
                  ? new Date(
                      subscription.endDate
                    ).toLocaleDateString()
                  : "Unlimited"}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>
                <FaSyncAlt className="inline mr-2" />
                Auto Renew
              </span>

              <strong>
                {subscription?.autoRenew
                  ? "Enabled"
                  : "Disabled"}
              </strong>
            </div>

          </div>

        </div>

        <div>

          <h3 className="font-bold mb-4">
            Feature Access
          </h3>

          <FeatureRow
            label="Wallet"
            enabled={plan.features?.wallet}
          />

          <FeatureRow
            label="Voucher Redemption"
            enabled={
              plan.features?.voucherRedemption
            }
          />

          <FeatureRow
            label="Creator Studio"
            enabled={
              plan.features?.creatorStudio
            }
          />

          <FeatureRow
            label="Analytics"
            enabled={
              plan.features?.analytics
            }
          />

          <FeatureRow
            label="Verification"
            enabled={
              plan.features?.verification
            }
          />

          <FeatureRow
            label="Live Streaming"
            enabled={
              plan.features?.liveStreaming
            }
          />

          <FeatureRow
            label="Priority Support"
            enabled={
              plan.features?.prioritySupport
            }
          />

        </div>

      </div>

      {/* Limits */}

      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">

        <h3 className="font-bold mb-5">
          Plan Limits
        </h3>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

          <LimitRow
            label="Posts / Day"
            value={plan.limits?.postsPerDay}
          />

          <LimitRow
            label="Reels / Day"
            value={plan.limits?.reelsPerDay}
          />

          <LimitRow
            label="Stories / Day"
            value={plan.limits?.storiesPerDay}
          />

          <LimitRow
            label="Podcasts"
            value={plan.limits?.podcasts}
          />

          <LimitRow
            label="Episodes / Month"
            value={
              plan.limits?.episodesPerMonth
            }
          />

          <LimitRow
            label="Watch Parties"
            value={
              plan.limits?.watchParties
            }
          />

          <LimitRow
            label="Marketplace Listings"
            value={
              plan.limits?.marketplaceListings
            }
          />

          <LimitRow
            label="Friends"
            value={plan.limits?.friends}
          />

          <LimitRow
            label="Followers"
            value={plan.limits?.followers}
          />

        </div>

      </div>

      {/* Footer */}

      <div className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 p-5">

        <div className="grid grid-cols-4 gap-4 text-center">

          <div>
            <FaWallet className="mx-auto text-blue-600 mb-2" />
            <p className="text-xs">
              Wallet
            </p>
          </div>

          <div>
            <FaShieldAlt className="mx-auto text-blue-600 mb-2" />
            <p className="text-xs">
              Verification
            </p>
          </div>

          <div>
            <FaChartLine className="mx-auto text-blue-600 mb-2" />
            <p className="text-xs">
              Analytics
            </p>
          </div>

          <div>
            <FaBroadcastTower className="mx-auto text-blue-600 mb-2" />
            <p className="text-xs">
              Live
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

CurrentPlan.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.string,
    plan: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    autoRenew: PropTypes.bool,
  }).isRequired,
};

export default memo(CurrentPlan);