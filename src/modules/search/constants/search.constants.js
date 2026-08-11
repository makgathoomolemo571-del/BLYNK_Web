// search.constants.js

export const SEARCH_TYPES = Object.freeze({
  ALL: "all",
  USERS: "users",
  CREATORS: "creators",
  BUSINESSES: "businesses",
  POSTS: "posts",
  REELS: "reels",
  STORIES: "stories",
  PODCASTS: "podcasts",
  EPISODES: "episodes",
  MARKETPLACE: "marketplace",
  CREATOR_HIRES: "creatorHires",
  BUSINESS_FINDS: "businessFinds",
  JOBS: "jobs",
  VENUES: "venues",
});

export const SEARCH_LIMIT = 20;

export const SEARCH_DEBOUNCE = 400;

export const SEARCH_MIN_LENGTH = 2;

export const SEARCH_SORT = Object.freeze({
  RELEVANCE: "relevance",
  NEWEST: "newest",
  OLDEST: "oldest",
});

export const SEARCH_STORAGE_KEY = "blynk_recent_searches";

export const SEARCH_ENDPOINTS = Object.freeze({
  SEARCH: "/search",
  STATS: "/search/stats",
  HISTORY: "/search/history",
  TRENDING: "/search/trending",
});