// src/modules/subscription/store/subscriptionSelectors.js

import { createSelector } from "@reduxjs/toolkit";

const selectSubscriptionState = (state) => state.subscription;

/*
|--------------------------------------------------------------------------
| BASIC
|--------------------------------------------------------------------------
*/

export const selectSubscription = createSelector(
  [selectSubscriptionState],
  (subscription) => subscription.subscription
);

export const selectCurrentPlan = createSelector(
  [selectSubscription],
  (subscription) => subscription?.plan ?? "FREE_MEMBER"
);

export const selectSubscriptionStatus = createSelector(
  [selectSubscription],
  (subscription) => subscription?.status ?? "active"
);

export const selectSubscriptionId = createSelector(
  [selectSubscription],
  (subscription) => subscription?.id ?? null
);

export const selectSubscriptionUserId = createSelector(
  [selectSubscription],
  (subscription) => subscription?.userId ?? null
);

export const selectSubscriptionStartDate = createSelector(
  [selectSubscription],
  (subscription) => subscription?.startDate ?? null
);

export const selectSubscriptionEndDate = createSelector(
  [selectSubscription],
  (subscription) => subscription?.endDate ?? null
);

export const selectAutoRenew = createSelector(
  [selectSubscription],
  (subscription) => subscription?.autoRenew ?? false
);

/*
|--------------------------------------------------------------------------
| PLAN CONFIG
|--------------------------------------------------------------------------
*/

export const selectPlans = createSelector(
  [selectSubscriptionState],
  (subscription) => subscription.plans ?? {}
);

export const selectCurrentPlanConfig = createSelector(
  [selectPlans, selectCurrentPlan],
  (plans, currentPlan) => plans[currentPlan] ?? null
);

export const selectPlanLimits = createSelector(
  [selectCurrentPlanConfig],
  (plan) => plan?.limits ?? {}
);

export const selectPlanFeatures = createSelector(
  [selectCurrentPlanConfig],
  (plan) => plan?.features ?? {}
);

export const selectPlanPricing = createSelector(
  [selectCurrentPlanConfig],
  (plan) => ({
    price: plan?.price ?? 0,
    currency: plan?.currency ?? "ZAR",
    billing: plan?.billing ?? "monthly",
    displayName: plan?.displayName ?? plan?.name ?? ""
  })
);

/*
|--------------------------------------------------------------------------
| FEATURE FLAGS
|--------------------------------------------------------------------------
*/

export const selectCanCreatePodcast = createSelector(
  [selectPlanLimits],
  (limits) => (limits.podcasts ?? 0) !== 0
);

export const selectCanUploadEpisodes = createSelector(
  [selectPlanLimits],
  (limits) => (limits.episodesPerMonth ?? 0) !== 0
);

export const selectCanGoLive = createSelector(
  [selectPlanFeatures],
  (features) => !!features.liveStreaming
);

export const selectHasAnalytics = createSelector(
  [selectPlanFeatures],
  (features) => !!features.analytics
);

export const selectHasVerification = createSelector(
  [selectPlanFeatures],
  (features) => !!features.verification
);

export const selectHasCreatorStudio = createSelector(
  [selectPlanFeatures],
  (features) => !!features.creatorStudio
);

export const selectHasPrioritySupport = createSelector(
  [selectPlanFeatures],
  (features) => !!features.prioritySupport
);

export const selectCanRedeemVouchers = createSelector(
  [selectPlanFeatures],
  (features) => !!features.voucherRedemption
);

export const selectCanUseWallet = createSelector(
  [selectPlanFeatures],
  (features) => !!features.wallet
);

export const selectCanWithdrawCash = createSelector(
  [selectPlanFeatures],
  (features) => !!features.cashWithdrawal
);

export const selectHasVigRewards = createSelector(
  [selectPlanFeatures],
  (features) => !!features.vigRewards
);

/*
|--------------------------------------------------------------------------
| LIMITS
|--------------------------------------------------------------------------
*/

export const selectPostLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.postsPerDay ?? 0
);

export const selectReelLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.reelsPerDay ?? 0
);

export const selectStoryLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.storiesPerDay ?? 0
);

export const selectMarketplaceLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.marketplaceListings ?? 0
);

export const selectWatchPartyLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.watchParties ?? 0
);

export const selectFriendLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.friends ?? 0
);

export const selectFollowerLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.followers ?? 0
);

export const selectFollowingLimit = createSelector(
  [selectPlanLimits],
  (limits) => limits.following ?? 0
);

/*
|--------------------------------------------------------------------------
| UI
|--------------------------------------------------------------------------
*/

export const selectSubscriptionLoading = createSelector(
  [selectSubscriptionState],
  (subscription) => subscription.loading
);

export const selectSubscriptionError = createSelector(
  [selectSubscriptionState],
  (subscription) => subscription.error
);

export const selectSubscriptionInitialized = createSelector(
  [selectSubscriptionState],
  (subscription) => subscription.initialized
);