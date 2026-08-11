import { useMemo } from "react";
import { useNotifications } from "./useNotifications";

/**
 * useUnreadCount
 * Derived state hook (no API calls)
 */
export const useUnreadCount = () => {
  const { notifications } = useNotifications();

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  return unreadCount;
};