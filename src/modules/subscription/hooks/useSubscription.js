import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import subscriptionApi from "../services/subscription.api";

import {
    setLoading,
    setSubscription,
    setError
} from "../store/subscriptionSlice";

import {
    selectSubscription,
    selectSubscriptionLoading,
    selectSubscriptionError
} from "../store/subscriptionSelectors";

const useSubscription = () => {

    const dispatch = useDispatch();

    const subscription = useSelector(
        selectSubscription
    );

    const loading = useSelector(
        selectSubscriptionLoading
    );

    const error = useSelector(
        selectSubscriptionError
    );

    const loadSubscription = useCallback(async () => {

        try {

            dispatch(setLoading(true));

            const { data } =
                await subscriptionApi.getMine();

            dispatch(
                setSubscription(data)
            );

        } catch (err) {

            dispatch(
                setError(
                    err.response?.data?.message ||
                    err.message
                )
            );

        } finally {

            dispatch(
                setLoading(false)
            );

        }

    }, [dispatch]);

    const upgradePlan = useCallback(async (plan) => {

        const { data } =
            await subscriptionApi.upgrade(plan);

        dispatch(
            setSubscription(data)
        );

        return data;

    }, [dispatch]);

    const cancelSubscription = useCallback(async () => {

        const { data } =
            await subscriptionApi.cancel();

        dispatch(
            setSubscription(data)
        );

        return data;

    }, [dispatch]);

    useEffect(() => {

        loadSubscription();

    }, [loadSubscription]);

    return {

        subscription,

        loading,

        error,

        refresh: loadSubscription,

        upgradePlan,

        cancelSubscription

    };

};

export default useSubscription;