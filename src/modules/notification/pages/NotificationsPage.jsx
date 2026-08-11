// modules/notification/pages/NotificationsPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiBell } from "react-icons/fi";

import { fetchNotifications } from "../store/notificationActions";
import {
  selectNotifications,
  selectNotificationLoading,
  selectNotificationError,
} from "../store/notificationSelectors";

import NotificationCard from "../components/NotificationCard";

const NotificationsPage = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectNotificationLoading);
  const error = useSelector(selectNotificationError);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
          <FiBell size={24} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500">
            Stay updated with activity across your account.
          </p>
        </div>

      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-12 text-center">

          <FiBell
            size={60}
            className="mx-auto text-gray-300 mb-5"
          />

          <h2 className="text-xl font-semibold mb-2">
            No Notifications
          </h2>

          <p className="text-gray-500">
            You're all caught up.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}

        </div>
      )}

    </main>
  );
};

export default NotificationsPage;