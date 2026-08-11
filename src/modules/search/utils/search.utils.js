// search.utils.js

import {
  SEARCH_MIN_LENGTH,
  SEARCH_STORAGE_KEY,
} from "../constants/search.constants";

export const normalizeQuery = (query = "") =>
  query
    .trim()
    .replace(/\s+/g, " ");

export const canSearch = (query = "") =>
  normalizeQuery(query).length >= SEARCH_MIN_LENGTH;

export const buildSearchParams = ({
  query = "",
  type = "all",
  page = 1,
  limit = 20,
  sort = "relevance",
  filters = {},
} = {}) => ({
  q: normalizeQuery(query),
  type,
  page,
  limit,
  sort,
  ...filters,
});

export const saveRecentSearch = (query) => {
  const q = normalizeQuery(query);

  if (!q) return;

  const recent = JSON.parse(
    localStorage.getItem(
      SEARCH_STORAGE_KEY
    ) || "[]"
  );

  const updated = [
    q,
    ...recent.filter(
      (item) => item !== q
    ),
  ].slice(0, 10);

  localStorage.setItem(
    SEARCH_STORAGE_KEY,
    JSON.stringify(updated)
  );
};

export const getRecentSearches = () =>
  JSON.parse(
    localStorage.getItem(
      SEARCH_STORAGE_KEY
    ) || "[]"
  );

export const clearRecentSearches = () =>
  localStorage.removeItem(
    SEARCH_STORAGE_KEY
  );

export const groupResults = (results = {}) => ({
  users: results.users || [],
  creators: results.creators || [],
  businesses: results.businesses || [],
  posts: results.posts || [],
  reels: results.reels || [],
  podcasts: results.podcasts || [],
  marketplace: results.marketplace || [],
  creatorHires:
    results.creatorHires || [],
  businessFinds:
    results.businessFinds || [],
});

export const totalResults = (
  results = {}
) =>
  Object.values(
    groupResults(results)
  ).reduce(
    (sum, list) => sum + list.length,
    0
  );

export const isEmptyResult = (
  results = {}
) =>
  totalResults(results) === 0;