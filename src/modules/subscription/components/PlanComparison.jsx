import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { Check, X } from "lucide-react";

const formatLimit = (value) => {
  if (value === -1) return "Unlimited";
  if (value === 0) return "Not Included";
  return value;
};

const PlanComparison = ({
  pricing = {},
  rules = {},
  currentPlan,
  onSelect,
}) => {
  const plans = useMemo(() => {
    return Object.keys(pricing).map((key) => ({
      key,
      pricing: pricing[key],
      rules: rules[key] || {},
    }));
  }, [pricing, rules]);

  const featureKeys = useMemo(() => {
    const set = new Set();

    plans.forEach((plan) => {
      Object.keys(plan.rules.features || {}).forEach((f) =>
        set.add(f)
      );
    });

    return [...set];
  }, [plans]);

  const limitKeys = useMemo(() => {
    const set = new Set();

    plans.forEach((plan) => {
      Object.keys(plan.rules.limits || {}).forEach((f) =>
        set.add(f)
      );
    });

    return [...set];
  }, [plans]);

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">

      <table className="min-w-full text-sm">

        <thead className="bg-zinc-100 dark:bg-zinc-900">

          <tr>

            <th className="p-4 text-left font-semibold">
              Feature
            </th>

            {plans.map((plan) => (
              <th
                key={plan.key}
                className="min-w-[220px] p-4 text-center border-l border-zinc-200 dark:border-zinc-800"
              >
                <div className="font-bold text-lg">
                  {plan.pricing?.name ||
                    plan.rules?.displayName ||
                    plan.key}
                </div>

                <div className="mt-2 text-3xl font-black">
                  R{plan.pricing?.price ?? 0}
                </div>

                <div className="text-xs text-zinc-500">
                  {plan.pricing?.billing}
                </div>

                <button
                  onClick={() => onSelect(plan.key)}
                  disabled={currentPlan === plan.key}
                  className={`mt-4 w-full rounded-lg px-4 py-2 font-semibold transition
                    ${
                      currentPlan === plan.key
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                  {currentPlan === plan.key
                    ? "Current Plan"
                    : "Choose"}
                </button>
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          <tr className="bg-zinc-50 dark:bg-zinc-950">
            <td
              colSpan={plans.length + 1}
              className="font-bold p-4"
            >
              Usage Limits
            </td>
          </tr>

          {limitKeys.map((limit) => (
            <tr
              key={limit}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <td className="p-4 font-medium">
                {limit}
              </td>

              {plans.map((plan) => (
                <td
                  key={plan.key}
                  className="text-center border-l border-zinc-200 dark:border-zinc-800"
                >
                  {formatLimit(
                    plan.rules?.limits?.[limit] ?? 0
                  )}
                </td>
              ))}
            </tr>
          ))}

          <tr className="bg-zinc-50 dark:bg-zinc-950">
            <td
              colSpan={plans.length + 1}
              className="font-bold p-4"
            >
              Features
            </td>
          </tr>

          {featureKeys.map((feature) => (
            <tr
              key={feature}
              className="border-t border-zinc-200 dark:border-zinc-800"
            >
              <td className="p-4 font-medium">
                {feature}
              </td>

              {plans.map((plan) => (
                <td
                  key={plan.key}
                  className="text-center border-l border-zinc-200 dark:border-zinc-800"
                >
                  {plan.rules?.features?.[feature] ? (
                    <Check className="mx-auto text-green-600" size={18} />
                  ) : (
                    <X className="mx-auto text-red-500" size={18} />
                  )}
                </td>
              ))}
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

PlanComparison.propTypes = {
  pricing: PropTypes.object.isRequired,
  rules: PropTypes.object.isRequired,
  currentPlan: PropTypes.string,
  onSelect: PropTypes.func,
};

PlanComparison.defaultProps = {
  currentPlan: "",
  onSelect: () => {},
};

export default memo(PlanComparison);