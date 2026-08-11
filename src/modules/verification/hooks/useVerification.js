// modules/verification/hooks/useVerification.js

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  submitVerification,
  fetchMyVerifications,
  clearVerificationError,
  resetVerificationState
} from "../store/verificationSlice";

export default function useVerification() {

  const dispatch = useDispatch();

  const {
    records,
    loading,
    submitting,
    error
  } = useSelector(
    state => state.verification
  );

  useEffect(() => {
    dispatch(fetchMyVerifications());
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchMyVerifications());
  }, [dispatch]);

  const submit = useCallback(
    data => dispatch(submitVerification(data)),
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(clearVerificationError());
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetVerificationState());
  }, [dispatch]);

  return {

    records,

    loading,

    submitting,

    error,

    refresh,

    submit,

    clearError,

    reset

  };

}