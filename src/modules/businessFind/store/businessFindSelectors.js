export const selectBusinessFind = (state) =>
  state.businessFind;

export const selectCampaigns = (state) =>
  state.businessFind.campaigns;

export const selectCurrentCampaign = (state) =>
  state.businessFind.currentCampaign;

export const selectBusinessStats = (state) =>
  state.businessFind.stats;

export const selectBusinessLoading = (state) =>
  state.businessFind.loading;

export const selectBusinessError = (state) =>
  state.businessFind.error;

export const selectBusinessSuccess = (state) =>
  state.businessFind.success;

export const selectActiveCampaigns = (state) =>
  state.businessFind.campaigns.filter(
    (item) => item.status === "active"
  );

export const selectClosedCampaigns = (state) =>
  state.businessFind.campaigns.filter(
    (item) => item.status === "closed"
  );

export const selectDraftCampaigns = (state) =>
  state.businessFind.campaigns.filter(
    (item) => item.status === "draft"
  );