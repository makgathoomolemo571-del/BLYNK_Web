// modules/social/store/socialSelectors.js

export const selectFriends = (state) =>
  state.social?.friends ?? [];

export const selectFollowers = (state) =>
  state.social?.followers ?? [];

export const selectFollowing = (state) =>
  state.social?.following ?? [];

export const selectFriendRequests = (state) =>
  state.social?.friendRequests ?? [];

export const selectSentRequests = (state) =>
  state.social?.sentRequests ?? [];

export const selectSuggestions = (state) =>
  state.social?.suggestions ?? [];

export const selectSocialLoading = (state) =>
  state.social?.loading ?? false;

export const selectFollowersLoading = (state) =>
  state.social?.loading ?? false;

export const selectSocialError = (state) =>
  state.social?.error ?? null;

export const selectFollowersError = (state) =>
    state.social?.error ?? null;

export const selectBlockedUsers = (state) =>
    state.social?.blockedUsers ?? [];



export const selectFollowersCount = (state) =>
  state.social?.followers.length ?? 0;

export const selectFollowingCount = (state) =>
  state.social?.following.length ?? 0;

export const selectFriendsCount = (state) =>
  state.social?.friends.length ?? 0;

export const selectPendingRequestsCount = (state) =>
  state.social?.friendRequests.filter(
    (r) => r.status === "pending"
  ).length;

export const selectRelationship =
  (userId) =>
  (state) => {

    const following =
      state.social?.following.some(
        (u) => u.id === userId
      );

    const follower =
      state.social?.followers.some(
        (u) => u.id === userId
      );

    const friend =
      state.social?.friends.some(
        (u) => u.id === userId
      );

    const requestSent =
      state.social?.sentRequests.some(
        (r) =>
          r.to.id === userId &&
          r.status === "pending"
      );

    const requestReceived =
      state.social?.friendRequests.some(
        (r) =>
          r.from.id === userId &&
          r.status === "pending"
      );

    return {
      following,
      follower,
      friend,
      requestSent,
      requestReceived
    };

};