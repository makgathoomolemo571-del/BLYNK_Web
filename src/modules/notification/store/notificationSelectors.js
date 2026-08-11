// modules/notification/store/notificationSelectors.js

import { createSelector } from "@reduxjs/toolkit";

/*
|--------------------------------------------------------------------------
| Base
|--------------------------------------------------------------------------
*/

const notificationState = (state) => state.notification;

/*
|--------------------------------------------------------------------------
| Raw State
|--------------------------------------------------------------------------
*/

export const selectNotifications = createSelector(
  [notificationState],
  (notification) => notification.notifications || []
);

export const selectUnreadCount = createSelector(
  [notificationState],
  (notification) => notification.unreadCount || 0
);

export const selectLoading = createSelector(
  [notificationState],
  (notification) => notification.loading
);

export const selectError = createSelector(
  [notificationState],
  (notification) => notification.error
);

/*
|--------------------------------------------------------------------------
| Read
|--------------------------------------------------------------------------
*/

export const selectReadNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter(
      (notification) => notification.read === true
    )
);

/*
|--------------------------------------------------------------------------
| Unread
|--------------------------------------------------------------------------
*/

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.filter(
      (notification) => notification.read === false
    )
);

/*
|--------------------------------------------------------------------------
| Latest
|--------------------------------------------------------------------------
*/

export const selectLatestNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    [...notifications]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
);

/*
|--------------------------------------------------------------------------
| Group By Type
|--------------------------------------------------------------------------
*/

export const selectGroupedNotifications = createSelector(
  [selectNotifications],
  (notifications) =>
    notifications.reduce((groups, notification) => {

      const type =
        notification.type || "general";

      if (!groups[type]) {
        groups[type] = [];
      }

      groups[type].push(notification);

      return groups;

    }, {})
);

/*
|--------------------------------------------------------------------------
| Entity
|--------------------------------------------------------------------------
*/

export const selectNotificationsByEntity = (
  entityType,
  entityId
) =>
  createSelector(
    [selectNotifications],
    (notifications) =>
      notifications.filter(
        (notification) =>
          notification.entityType === entityType &&
          notification.entityId === entityId
      )
  );

/*
|--------------------------------------------------------------------------
| Single Notification
|--------------------------------------------------------------------------
*/

export const selectNotificationById = (id) =>
  createSelector(
    [selectNotifications],
    (notifications) =>
      notifications.find(
        (notification) => notification.id === id
      ) || null
  );

/*
|--------------------------------------------------------------------------
| Has Unread
|--------------------------------------------------------------------------
*/

export const selectHasUnread = createSelector(
  [selectUnreadCount],
  (count) => count > 0
);

/*
|--------------------------------------------------------------------------
| Latest 10
|--------------------------------------------------------------------------
*/

export const selectLatestTenNotifications =
  createSelector(
    [selectLatestNotifications],
    (notifications) =>
      notifications.slice(0, 10)
  );

/*
|--------------------------------------------------------------------------
| Broadcast Notifications
|--------------------------------------------------------------------------
*/

export const selectBroadcastNotifications =
  createSelector(
    [selectNotifications],
    (notifications) =>
      notifications.filter(
        (notification) =>
          notification.entityType === null ||
          notification.entityType === undefined
      )
  );

  // Compatibility exports
export const selectNotificationError = selectError;
export const selectNotificationLoading = selectLoading;