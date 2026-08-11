import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import searchApi from "../services/search.api";

import SearchBar from "../components/SearchBar";
import SearchFilters from "../components/SearchFilters";

import UserCard from "../../user/components/UserCard";
import CreatorCard from "../../creatorHire/components/CreatorCard";
import BusinessCard from "../../businessFind/components/BusinessCard";

import PostCard from "../../post/components/PostCard";
import ReelCard from "../../reel/components/ReelCard";
import PodcastCard from "../../podcast/components/PodcastCard";

import MarketplaceCard from "../../marketplace/components/MarketplaceCard";

const TYPES = [
  "all",
  "users",
  "creators",
  "businesses",
  "posts",
  "reels",
  "podcasts",
  "marketplace",
  "creatorHires",
  "businessFinds"
];

export default function SearchPage() {

  const [params, setParams] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState({

    users: [],
    creators: [],
    businesses: [],

    posts: [],
    reels: [],
    podcasts: [],

    marketplace: [],
    creatorHires: [],
    businessFinds: []

  });

  const query =
    params.get("q") || "";

  const type =
    params.get("type") || "all";

  useEffect(() => {

    if (!query.trim()) return;

    fetchResults();

  }, [query, type]);

  async function fetchResults() {

    try {

      setLoading(true);

      const response =
        await searchApi.search({
          q: query,
          type
        });

      setResults(response);

    }

    finally {

      setLoading(false);

    }

  }

  function handleSearch(value) {

    setParams({
      q: value,
      type
    });

  }

  function handleType(value) {

    setParams({
      q: query,
      type: value
    });

  }

  const total =
    useMemo(() => {

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

  return (

    <div className="max-w-7xl mx-auto p-6">

      <SearchBar

        defaultValue={query}

        onSearch={handleSearch}

      />

      <div className="mt-4">

        <SearchFilters

          value={type}

          options={TYPES}

          onChange={handleType}

        />

      </div>

      <div className="mt-6 text-sm text-gray-500">

        {loading
          ? "Searching..."
          : `${total} results`}

      </div>

      {!!results.users.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Users

          </h2>

          <div className="grid gap-4">

            {results.users.map(user => (

              <UserCard

                key={user.id}

                user={user}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.creators.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Creators

          </h2>

          <div className="grid gap-4">

            {results.creators.map(item => (

              <CreatorCard

                key={item.id}

                creator={item}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.businesses.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Businesses

          </h2>

          <div className="grid gap-4">

            {results.businesses.map(item => (

              <BusinessCard

                key={item.id}

                business={item}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.posts.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Posts

          </h2>

          <div className="grid gap-4">

            {results.posts.map(post => (

              <PostCard

                key={post.id}

                post={post}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.reels.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Reels

          </h2>

          <div className="grid gap-4">

            {results.reels.map(reel => (

              <ReelCard

                key={reel.id}

                reel={reel}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.podcasts.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Podcasts

          </h2>

          <div className="grid gap-4">

            {results.podcasts.map(item => (

              <PodcastCard

                key={item.id}

                podcast={item}

              />

            ))}

          </div>

        </section>

      )}

      {!!results.marketplace.length && (

        <section className="mt-8">

          <h2 className="font-bold text-xl mb-4">

            Marketplace

          </h2>

          <div className="grid gap-4">

            {results.marketplace.map(item => (

              <MarketplaceCard

                key={item.id}

                marketplace={item}

              />

            ))}

          </div>

        </section>

      )}

    </div>

  );

}