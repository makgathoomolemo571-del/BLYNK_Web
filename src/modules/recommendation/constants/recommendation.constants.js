export const RECOMMENDATION_TYPES = Object.freeze({
  CREATOR: "creator",
  BUSINESS: "business",
  POST: "post",
  REEL: "reel",
  STORY: "story",
  PODCAST: "podcast",
  MARKETPLACE: "marketplace",
  CREATOR_HIRE: "creatorHire",
  BUSINESS_FIND: "businessFind",
  VENUE: "venue",
});

export const RECOMMENDATION_EVENTS = Object.freeze({
  GENERATED: "RECOMMENDATION_GENERATED",
  VIEWED: "RECOMMENDATION_VIEWED",
  CLICKED: "RECOMMENDATION_CLICKED",
});

export const RECOMMENDATION_SORT = Object.freeze({
  SCORE: "score",
  CREATED_AT: "createdAt",
});

export const DEFAULT_RECOMMENDATION_LIMIT = 20;

export const RECOMMENDATION_REASON = Object.freeze({
  FOLLOWING: "Following",
  TRENDING: "Trending",
  NEARBY: "Nearby",
  INTEREST: "Interest",
  SIMILAR: "Similar",
  POPULAR: "Popular",
  NEW: "New",
});