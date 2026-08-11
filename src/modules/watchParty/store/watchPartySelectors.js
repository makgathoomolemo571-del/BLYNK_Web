export const selectWatchPartyState = (state) =>
  state.watchParty;

export const selectWatchParties = (state) =>
  state.watchParty.watchParties;

export const selectLiveWatchParties = (state) =>
  state.watchParty.liveWatchParties;

export const selectCurrentWatchParty = (state) =>
  state.watchParty.currentWatchParty;

export const selectWatchPartyLoading = (state) =>
  state.watchParty.loading;

export const selectWatchPartyError = (state) =>
  state.watchParty.error;

export const selectJoinedWatchParty = (state) =>
  state.watchParty.joined;

export const selectViewerCount = (state) =>
  state.watchParty.currentWatchParty?.viewerCount || 0;

export const selectWatchPartyStatus = (state) =>
  state.watchParty.currentWatchParty?.status || null;

export const selectWatchPartyVisibility = (state) =>
  state.watchParty.currentWatchParty?.visibility || null;

export const selectWatchPartyTitle = (state) =>
  state.watchParty.currentWatchParty?.title || "";

export const selectWatchPartyCreator = (state) =>
  state.watchParty.currentWatchParty?.creator || null;

export const selectWatchPartyThumbnail = (state) =>
  state.watchParty.currentWatchParty?.thumbnail || null;