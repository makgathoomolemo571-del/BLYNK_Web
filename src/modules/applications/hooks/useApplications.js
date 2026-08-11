import { useEffect, useState, useCallback } from "react";

import {
  createApplication,
  getMyApplications,
  getApplication,
  updateApplicationStatus,
  withdrawApplication
} from "../services/application.api";

export default function useApplications() {

  const [applications, setApplications] = useState([]);

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /**
   * ------------------------------------
   * Load My Applications
   * ------------------------------------
   */

  const loadApplications = useCallback(async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getMyApplications();

      setApplications(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to load applications."
      );

    } finally {

      setLoading(false);

    }

  }, []);

  /**
   * ------------------------------------
   * Load Single Application
   * ------------------------------------
   */

  const loadApplication = useCallback(async (id) => {

    try {

      setLoading(true);

      setError("");

      const data = await getApplication(id);

      setApplication(data);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        "Unable to load application."
      );

    } finally {

      setLoading(false);

    }

  }, []);

  /**
   * ------------------------------------
   * Create
   * ------------------------------------
   */

  const create = async (payload) => {

    try {

      setSaving(true);

      const data =
        await createApplication(payload);

      setApplications(prev => [
        data,
        ...prev
      ]);

      return data;

    } finally {

      setSaving(false);

    }

  };

  /**
   * ------------------------------------
   * Update Status
   * ------------------------------------
   */

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      setSaving(true);

      const data =
        await updateApplicationStatus(
          id,
          status
        );

      setApplications(prev =>
        prev.map(item =>
          item.id === id
            ? data
            : item
        )
      );

      if (
        application &&
        application.id === id
      ) {

        setApplication(data);

      }

      return data;

    } finally {

      setSaving(false);

    }

  };

  /**
   * ------------------------------------
   * Withdraw
   * ------------------------------------
   */

  const withdraw = async (id) => {

    try {

      setSaving(true);

      await withdrawApplication(id);

      setApplications(prev =>
        prev.map(item =>
          item.id === id
            ? {
                ...item,
                status: "withdrawn"
              }
            : item
        )
      );

      if (
        application &&
        application.id === id
      ) {

        setApplication(prev => ({
          ...prev,
          status: "withdrawn"
        }));

      }

    } finally {

      setSaving(false);

    }

  };

  useEffect(() => {

    loadApplications();

  }, [loadApplications]);

  return {

    loading,

    saving,

    error,

    applications,

    application,

    loadApplications,

    loadApplication,

    create,

    updateStatus,

    withdraw

  };

}