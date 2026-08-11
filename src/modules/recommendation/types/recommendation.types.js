/**
 * Recommendation DTO
 *
 * {
 *   id: String,
 *   type: String,
 *   targetId: String,
 *   score: Number,
 *   reason: String
 * }
 */

export const RecommendationTypes = Object.freeze({

  creator: "creator",

  business: "business",

  post: "post",

  reel: "reel",

  story: "story",

  podcast: "podcast",

  marketplace: "marketplace",

  creatorHire: "creatorHire",

  businessFind: "businessFind",

  venue: "venue"

});

export const RecommendationShape = Object.freeze({

  id: "",

  type: "",

  targetId: "",

  score: 0,

  reason: ""

});