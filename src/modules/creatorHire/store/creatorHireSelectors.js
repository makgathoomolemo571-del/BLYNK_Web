export const selectCreatorHireState = (state) => state.creatorHire;

export const selectJobs = (state) =>
  state.creatorHire.jobs;

export const selectCurrentJob = (state) =>
  state.creatorHire.currentJob;

export const selectCreatorHireLoading = (state) =>
  state.creatorHire.loading;

export const selectCreatorHireError = (state) =>
  state.creatorHire.error;