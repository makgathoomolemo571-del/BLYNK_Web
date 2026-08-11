import { useMemo } from "react";
import { useSelector } from "react-redux";

import subscriptionRules from "../../config/subscriptionRules";

const useSubscription = () => {

  const plan = useSelector(
    (state) => state.subscription?.plan
  );

  const rules = useMemo(() => {

    return (
      subscriptionRules[plan] ||
      subscriptionRules.FREE_MEMBER
    );

  }, [plan]);

  const hasFeature = (feature) => {

    return Boolean(
      rules.features?.[feature]
    );

  };

  const getLimit = (limit) => {

    return rules.limits?.[limit] ?? null;

  };

  return {

    plan,

    rules,

    limits: rules.limits,

    features: rules.features,

    hasFeature,

    getLimit

  };

};

export default useSubscription;