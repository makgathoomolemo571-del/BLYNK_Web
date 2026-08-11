import { useCallback, useEffect, useState } from "react";
import supportService from "../services/support.api";

export default function useTickets() {

  const [tickets, setTickets] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchTickets =
    useCallback(async () => {

      try {

        setLoading(true);

        setError(null);

        const data =
          await supportService.getMyTickets();

        setTickets(data);

      } catch (err) {

        setError(
          err.response?.data?.message ||
          err.message
        );

      } finally {

        setLoading(false);

      }

    }, []);

  const refresh =
    () => fetchTickets();

  useEffect(() => {

    fetchTickets();

  }, [fetchTickets]);

  return {

    tickets,

    loading,

    error,

    refresh

  };

}