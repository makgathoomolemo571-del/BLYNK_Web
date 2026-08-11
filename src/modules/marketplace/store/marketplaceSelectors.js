// modules/marketplace/store/marketplaceSelectors.js

export const selectMarketplace =
(state) =>
state.marketplace;

export const selectListings =
(state) =>
state.marketplace.listings;

export const selectMyListings =
(state) =>
state.marketplace.myListings;

export const selectSelectedListing =
(state) =>
state.marketplace.selectedListing;

export const selectMarketplaceApplications =
(state) =>
state.marketplace.applications;

export const selectMarketplaceLoading =
(state) =>
state.marketplace.loading;

export const selectMarketplaceCreating =
(state) =>
state.marketplace.creating;

export const selectMarketplaceUpdating =
(state) =>
state.marketplace.updating;

export const selectMarketplaceDeleting =
(state) =>
state.marketplace.deleting;

export const selectMarketplaceError =
(state) =>
state.marketplace.error;