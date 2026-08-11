import { useCallback, useEffect, useState } from "react";
import supportService from "../services/support.api";

const initialStats = {
  total: 0,
  open: 0,
  resolved: 0,
  closed: 0,
};

export default function useSupport() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(initialStats);

  const [ticket, setTicket] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const loadTickets = useCallback(async () => {
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

  const loadStats = useCallback(async () => {

    try {

      const data =
        await supportService.getStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    }

  }, []);

  const loadTicket = useCallback(async (id) => {

    try {

      setLoading(true);

      const data =
        await supportService.getTicket(id);

      setTicket(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        err.message
      );

    } finally {

      setLoading(false);

    }

  }, []);

  const createTicket = useCallback(
    async (payload) => {

      const data =
        await supportService.createTicket(
          payload
        );

      setTickets((prev) => [
        data,
        ...prev,
      ]);

      await loadStats();

      return data;

    },
    [loadStats]
  );

  useEffect(() => {

    loadTickets();

    loadStats();

  }, [loadTickets, loadStats]);

  return {

    loading,

    error,

    tickets,

    ticket,

    stats,

    createTicket,

    loadTicket,

    refresh: loadTickets

  };
}