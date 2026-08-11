import { createSelector } from "@reduxjs/toolkit";

/**
 * BASE STATE SELECTOR
 */
const selectUserState = (state) => state.user;

/**
 * BASIC USER SELECTORS
 */
export const selectUser = createSelector(
  [selectUserState],
  (userState) => userState.user
);

export const selectUserId = createSelector(
  [selectUser],
  (user) => user?.id || null
);

export const selectUsername = createSelector(
  [selectUser],
  (user) => user?.username || ""
);

export const selectUserRole = createSelector(
  [selectUser],
  (user) => user?.role || "member"
);

export const selectIsVerified = createSelector(
  [selectUser],
  (user) => user?.verified || false
);

export const selectUserStatus = createSelector(
  [selectUser],
  (user) => user?.status || "active"
);

/**
 * AUTH STATE SELECTORS
 */
export const selectIsAuthenticated = createSelector(
  [selectUserState],
  (userState) => userState.isAuthenticated
);

export const selectAuthToken = createSelector(
  [selectUserState],
  (userState) => userState.token
);

/**
 * LOADING / ERROR STATES
 */
export const selectUserLoading = createSelector(
  [selectUserState],
  (userState) => userState.loading
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

/**
 * PROFILE RELATED SELECTORS (if populated via API)
 */
export const selectUserProfile = createSelector(
  [selectUserState],
  (userState) => userState.profile
);

export const selectProfilePicture = createSelector(
  [selectUserProfile],
  (profile) => profile?.profilePicture || null
);

export const selectDisplayName = createSelector(
  [selectUserProfile],
  (profile) =>
    profile?.displayName ||
    `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
);

/**
 * FULL USER STATE COMBINED VIEW
 */
export const selectFullUserData = createSelector(
  [selectUser, selectUserProfile],
  (user, profile) => ({
    ...user,
    profile,
  })
);