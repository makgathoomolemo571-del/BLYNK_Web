// modules/search/hooks/useSearch.js

import { useCallback, useEffect, useMemo, useState } from "react";
import searchApi from "../services/search.api";

const DEFAULT_RESULTS = {
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

const DEFAULT_TYPE = "all";

export default function useSearch(
  initialQuery = "",
  initialType = DEFAULT_TYPE
) {
  const [query, setQuery] = useState(initialQuery);

  const [type, setType] = useState(initialType);

  const [results, setResults] =
    useState(DEFAULT_RESULTS);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const [searched, setSearched] =
    useState(false);

  const search = useCallback(

    async (

      searchQuery = query,
      searchType = type

    ) => {

      const q = searchQuery.trim();

      if (!q) {

        setResults(DEFAULT_RESULTS);
        setSearched(false);

        return;
      }

      try {

        setLoading(true);

        setError(null);

        const response =
          await searchApi.search({

            q,
            type: searchType

          });

        setResults({

          ...DEFAULT_RESULTS,

          ...response

        });

        setSearched(true);

      } catch (err) {

        setError(

          err.response?.data?.message ||

          err.message ||

          "Search failed"

        );

      } finally {

        setLoading(false);

      }

    },

    [query, type]

  );

  const clear = useCallback(() => {

    setQuery("");

    setType(DEFAULT_TYPE);

    setResults(DEFAULT_RESULTS);

    setError(null);

    setSearched(false);

  }, []);

  useEffect(() => {

    if (!query.trim()) {

      setResults(DEFAULT_RESULTS);

      setSearched(false);

      return;
    }

    const timer = setTimeout(() => {

      search(query, type);

    }, 400);

    return () => clearTimeout(timer);

  }, [query, type, search]);

  const totalResults = useMemo(() => {

    return (

      results.users.length +

      results.creators.length +

      results.businesses.length +

      results.posts.length +

      results.reels.length +

      results.podcasts.length +

      results.marketplace.length +

      results.creatorHires.length +

      results.businessFinds.length

    );

  }, [results]);

  return {

    query,
    setQuery,

    type,
    setType,

    results,

    totalResults,

    loading,

    error,

    searched,

    search,

    clear

  };

}