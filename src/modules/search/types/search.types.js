// search.types.js

/**
 * Search Filters
 */
export const SearchFilter = {
  query: "",
  type: "all",
  page: 1,
  limit: 20,
  sort: "relevance",
};

/**
 * Search History
 */
export const SearchHistory = {
  id: "",
  query: "",
  type: "",
  resultsCount: 0,
  clickedResultId: "",
  filters: {},
  createdAt: "",
};

/**
 * Search Statistics
 */
export const SearchStats = {
  totalSearches: 0,
  uniqueUsers: 0,
  topQueries: [],
};

/**
 * Search Response
 */
export const SearchResponse = {
  users: [],
  creators: [],
  businesses: [],
  posts: [],
  reels: [],
  podcasts: [],
  marketplace: [],
  creatorHires: [],
  businessFinds: [],
};

/**
 * Recent Search
 */
export const RecentSearch = {
  query: "",
  createdAt: "",
};