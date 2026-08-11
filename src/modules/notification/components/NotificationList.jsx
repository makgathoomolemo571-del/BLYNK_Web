// modules/notification/components/NotificationList.jsx

import { memo } from "react";
import PropTypes from "prop-types";
import NotificationCard from "./NotificationCard";

const NotificationList = ({
  notifications = [],
  loading = false,
  onRead
}) => {

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <span className="text-gray-500">
          Loading notifications...
        </span>
      </div>
    );
  }

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          No Notifications
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          You're all caught up.
        </p>
      </div>
    );
  }

  return (

    <div className="space-y-3">

      {notifications.map((notification) => (

        <NotificationCard
          key={notification.id}
          notification={notification}
          onRead={onRead}
        />

      ))}

    </div>

  );

};

NotificationList.propTypes = {

  notifications: PropTypes.arrayOf(

    PropTypes.shape({

      id: PropTypes.string.isRequired,

      type: PropTypes.string.isRequired,

      title: PropTypes.string,

      message: PropTypes.string,

      entityType: PropTypes.string,

      entityId: PropTypes.string,

      read: PropTypes.bool,

      createdAt: PropTypes.string

    })

  ),

  loading: PropTypes.bool,

  onRead: PropTypes.func

};

export default memo(NotificationList);