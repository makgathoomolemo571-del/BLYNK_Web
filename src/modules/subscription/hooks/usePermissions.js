import { useMemo } from "react";
import { useSelector } from "react-redux";

import subscriptionRules from "../../../config/subscriptionRules";

import {
    selectSubscription
} from "../store/subscriptionSelectors";

const unlimited = (value) =>
    value === -1;

const usePermissions = () => {

    const subscription =
        useSelector(selectSubscription);

    const plan =
        subscription?.plan || "FREE_MEMBER";

    const rules =
        subscriptionRules[plan] || {};

    const features =
        rules.features || {};

    const limits =
        rules.limits || {};

    const hasFeature = (feature) =>
        Boolean(features?.[feature]);

    const getLimit = (limit) =>
        limits?.[limit] ?? 0;

    const isUnlimited = (limit) =>
        unlimited(getLimit(limit));

    const canUse = (feature) =>
        hasFeature(feature);

    const permissions = useMemo(() => ({

        plan,

        rules,

        limits,

        features,

        hasFeature,

        getLimit,

        isUnlimited,

        canUse

    }), [plan]);

    return permissions;

};

export default usePermissions;