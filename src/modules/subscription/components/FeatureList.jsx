// modules/subscription/components/FeatureList.jsx

import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfinity,
} from "react-icons/fa";

const formatLimit = (value) => {
  if (value === -1) return "Unlimited";
  if (value === null || value === undefined) return "-";
  return Number(value).toLocaleString();
};

const prettify = (key) =>
  key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase());

const FeatureList = ({
  planRules = {},
  pricing = {},
  showLimits = true,
  showFeatures = true,
}) => {
  const limits = useMemo(
    () => planRules?.limits || {},
    [planRules]
  );

  const features = useMemo(
    () => planRules?.features || {},
    [planRules]
  );

  return (
    <div className="space-y-8">

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-2xl font-bold">
              {planRules.displayName}
            </h2>

            {pricing && (
              <p className="text-sm text-zinc-500 mt-1">
                {pricing.price === 0
                  ? "Free"
                  : `${pricing.currency} ${pricing.price}/${pricing.billing}`}
              </p>
            )}
          </div>

        </div>

        {showLimits && (
          <>
            <h3 className="font-semibold text-lg mb-4">
              Usage Limits
            </h3>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

              {Object.entries(limits).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
                >
                  <span className="text-sm font-medium">
                    {prettify(key)}
                  </span>

                  <span className="flex items-center gap-2 font-semibold">

                    {value === -1 ? (
                      <>
                        <FaInfinity className="text-emerald-500" />
                        Unlimited
                      </>
                    ) : (
                      formatLimit(value)
                    )}

                  </span>
                </div>
              ))}

            </div>
          </>
        )}

        {showFeatures && (
          <>
            <h3 className="font-semibold text-lg mt-10 mb-4">
              Included Features
            </h3>

            <div className="grid gap-3 md:grid-cols-2">

              {Object.entries(features).map(([key, enabled]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 p-4"
                >
                  <span className="font-medium">
                    {prettify(key)}
                  </span>

                  {enabled ? (
                    <FaCheckCircle
                      className="text-emerald-500 text-xl"
                    />
                  ) : (
                    <FaTimesCircle
                      className="text-red-500 text-xl"
                    />
                  )}
                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

FeatureList.propTypes = {
  planRules: PropTypes.shape({
    displayName: PropTypes.string,
    limits: PropTypes.object,
    features: PropTypes.object,
  }).isRequired,

  pricing: PropTypes.shape({
    price: PropTypes.number,
    currency: PropTypes.string,
    billing: PropTypes.string,
  }),

  showLimits: PropTypes.bool,
  showFeatures: PropTypes.bool,
};

export default memo(FeatureList);