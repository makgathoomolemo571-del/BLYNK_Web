// modules/search/services/search.api.js

import api from "../../../config/api";

/*
==================================================
SEARCH API
==================================================
*/

const BASE_URL = "/search";

/*
==================================================
GLOBAL SEARCH
GET /api/search?q=&type=
==================================================
*/
export const search = async ({
  query,
  type = "all"
}) => {

  const { data } = await api.get(BASE_URL, {
    params: {
      q: query,
      type
    }
  });

  return data;
};

/*
==================================================
SEARCH STATISTICS
GET /api/search/stats
==================================================
*/
export const getSearchStats =
async () => {

  const { data } =
  await api.get(
    `${BASE_URL}/stats`
  );

  return data;
};

/*
==================================================
RECENT SEARCH HISTORY
GET /api/search/history
==================================================
*/
export const getHistory =
async () => {

  const { data } =
  await api.get(
    `${BASE_URL}/history`
  );

  return data;
};

/*
==================================================
DELETE SEARCH HISTORY
DELETE /api/search/history
==================================================
*/
export const clearHistory =
async () => {

  const { data } =
  await api.delete(
    `${BASE_URL}/history`
  );

  return data;
};

/*
==================================================
DELETE SINGLE HISTORY ITEM
DELETE /api/search/history/:id
==================================================
*/
export const deleteHistory =
async (id) => {

  const { data } =
  await api.delete(
    `${BASE_URL}/history/${id}`
  );

  return data;
};

/*
==================================================
TRENDING SEARCHES
GET /api/search/trending
==================================================
*/
export const getTrending =
async () => {

  const { data } =
  await api.get(
    `${BASE_URL}/trending`
  );

  return data;
};

/*
==================================================
SUGGESTIONS
GET /api/search/suggestions
==================================================
*/
export const suggestions =
async (query) => {

  const { data } =
  await api.get(
    `${BASE_URL}/suggestions`,
    {
      params: {
        q: query
      }
    }
  );

  return data;
};

/*
==================================================
EXPORT
==================================================
*/

export default {

  search,

  getSearchStats,

  getHistory,

  clearHistory,

  deleteHistory,

  getTrending,

  suggestions

};