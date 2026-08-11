import {
  RECOMMENDATION_TYPES,
} from "../constants/recommendation.constants";

export const normalizeRecommendation = (item = {}) => ({
  id: item.id,
  type: item.type,
  targetId: item.targetId,
  score: Number(item.score || 0),
  reason: item.reason || "",
});

export const recommendationIcon = (type) => {
  switch (type) {
    case RECOMMENDATION_TYPES.CREATOR:
      return "person";

    case RECOMMENDATION_TYPES.BUSINESS:
      return "business";

    case RECOMMENDATION_TYPES.POST:
      return "article";

    case RECOMMENDATION_TYPES.REEL:
      return "movie";

    case RECOMMENDATION_TYPES.STORY:
      return "history";

    case RECOMMENDATION_TYPES.PODCAST:
      return "podcasts";

    case RECOMMENDATION_TYPES.MARKETPLACE:
      return "store";

    case RECOMMENDATION_TYPES.CREATOR_HIRE:
      return "groups";

    case RECOMMENDATION_TYPES.BUSINESS_FIND:
      return "travel_explore";

    case RECOMMENDATION_TYPES.VENUE:
      return "place";

    default:
      return "star";
  }
};

export const recommendationRoute = ({
  type,
  targetId,
}) => {

  switch (type) {

    case RECOMMENDATION_TYPES.POST:
      return `/posts/${targetId}`;

    case RECOMMENDATION_TYPES.REEL:
      return `/reels/${targetId}`;

    case RECOMMENDATION_TYPES.STORY:
      return `/stories/${targetId}`;

    case RECOMMENDATION_TYPES.PODCAST:
      return `/podcasts/${targetId}`;

    case RECOMMENDATION_TYPES.CREATOR:
      return `/profile/${targetId}`;

    case RECOMMENDATION_TYPES.BUSINESS:
      return `/business/${targetId}`;

    case RECOMMENDATION_TYPES.MARKETPLACE:
      return `/marketplace/${targetId}`;

    case RECOMMENDATION_TYPES.CREATOR_HIRE:
      return `/creator-hire/${targetId}`;

    case RECOMMENDATION_TYPES.BUSINESS_FIND:
      return `/business-find/${targetId}`;

    case RECOMMENDATION_TYPES.VENUE:
      return `/venues/${targetId}`;

    default:
      return "/";
  }

};

export const sortRecommendations = (
  list = []
) =>
  [...list].sort(
    (a, b) => b.score - a.score
  );