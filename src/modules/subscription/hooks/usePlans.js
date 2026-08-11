import { useMemo } from "react";

import subscriptionRules from "../../../config/subscriptionRules";
import plansConfig from "../../../config/plans.config";

const usePlans = () => {

    const plans = useMemo(() => {

        return Object.keys(plansConfig).map((key) => ({

            id: key,

            ...plansConfig[key],

            ...(subscriptionRules[key] || {})

        }));

    }, []);

    const getPlan = (planName) => {

        if (!planName) return null;

        return plans.find(
            (plan) => plan.id === planName
        );

    };

    const getPaidPlans = () => {

        return plans.filter(
            (plan) => Number(plan.price) > 0
        );

    };

    const getFreePlans = () => {

        return plans.filter(
            (plan) => Number(plan.price) === 0
        );

    };

    return {

        plans,

        getPlan,

        getPaidPlans,

        getFreePlans

    };

};

export default usePlans;