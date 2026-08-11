export const selectProfile = (state) => state.profile.profile;

export const selectProfileLoading = (state) =>
  state.profile.loading;

export const selectProfileError = (state) =>
  state.profile.error;

export const selectProfilePicture = (state) =>
  state.profile.profile?.profilePicture;

export const selectDisplayName = (state) =>
  state.profile.profile?.displayName;

export const selectBio = (state) =>
  state.profile.profile?.bio;

export const selectProfileVisibility = (state) =>
  state.profile.profile?.visibility;