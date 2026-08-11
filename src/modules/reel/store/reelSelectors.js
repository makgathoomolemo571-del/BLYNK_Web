export const selectReels = (state) => state.reel.reels;

export const selectCurrentReel = (state) => state.reel.currentReel;

export const selectReelLoading = (state) => state.reel.loading;

export const selectReelError = (state) => state.reel.error;

export const selectActiveReelIndex = (state) =>
  state.reel.activeReelIndex;