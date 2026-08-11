// modules/subscription/components/UpgradeButton.jsx

import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaArrowUp, FaSpinner } from "react-icons/fa";

import subscriptionService from "../services/subscription.service";

import plansConfig from "../../../config/plans.config";
import subscriptionRules from "../../../config/subscriptionRules";

const UpgradeButton = ({
  currentPlan,
  targetPlan,
  onSuccess,
  onError,
  className = "",
}) => {
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => {
    return (
      loading ||
      !targetPlan ||
      currentPlan === targetPlan
    );
  }, [loading, currentPlan, targetPlan]);

  const pricing = plansConfig[targetPlan];
  const rules = subscriptionRules[targetPlan];

  const handleUpgrade = async () => {
    try {
      setLoading(true);

      const result =
        await subscriptionService.upgrade(targetPlan);

      onSuccess?.(result);
    } catch (error) {
      console.error(error);
      onError?.(
        error?.response?.data?.message ||
          error.message ||
          "Unable to upgrade subscription."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!pricing || !rules) return null;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleUpgrade}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-200
      ${
        disabled
          ? "cursor-not-allowed bg-zinc-300 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-500"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }
      ${className}`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <FaArrowUp />
          {pricing.price === 0
            ? "Current Plan"
            : `Upgrade to ${pricing.name}`}
        </>
      )}
    </button>
  );
};

UpgradeButton.propTypes = {
  currentPlan: PropTypes.string.isRequired,
  targetPlan: PropTypes.string.isRequired,
  className: PropTypes.string,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
};

export default UpgradeButton;