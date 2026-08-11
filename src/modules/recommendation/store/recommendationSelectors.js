// src/modules/recommendation/store/recommendationSelectors.js

export const selectRecommendations = (state) =>
  state.recommendation?.items || [];


export const selectRecommendationLoading = (state) =>
  state.recommendation?.loading || false;


export const selectRecommendationError = (state) =>
  state.recommendation?.error || null;


export const selectRecommendationStatus = (state) =>
  state.recommendation?.status || "idle";

export const selectRecommendationsError = (state) =>
  state.recommendation.error;

export const selectRecommendationsLoading = (state) =>
  state.recommendation.loading;

