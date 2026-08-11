// modules/recommendation/pages/DiscoverPage.jsx

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import RecommendationFeed from "../components/RecommendationFeed";

import recommendationApi from "../services/recommendation.api";

const DiscoverPage = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [recommendations, setRecommendations] = useState([]);

  const [error, setError] = useState("");

  const loadRecommendations = async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await recommendationApi.getRecommendations();

      setRecommendations(data);

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Unable to load recommendations."

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadRecommendations();

  }, []);

  const openRecommendation = async (item) => {

    try {

      await recommendationApi.trackClick(item.id);

    } catch (_) {}

    switch (item.type) {

      case "creator":
        navigate(`/profile/${item.targetId}`);
        break;

      case "business":
        navigate(`/business/${item.targetId}`);
        break;

      case "post":
        navigate(`/posts/${item.targetId}`);
        break;

      case "reel":
        navigate(`/reels/${item.targetId}`);
        break;

      case "story":
        navigate(`/stories/${item.targetId}`);
        break;

      case "podcast":
        navigate(`/podcasts/${item.targetId}`);
        break;

      case "marketplace":
        navigate(`/marketplace/${item.targetId}`);
        break;

      case "creatorHire":
        navigate(`/creator-hire/${item.targetId}`);
        break;

      case "businessFind":
        navigate(`/business-find/${item.targetId}`);
        break;

      case "venue":
        navigate(`/venues/${item.targetId}`);
        break;

      default:
        break;

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <span className="animate-spin h-10 w-10 border-4 border-blue-600 rounded-full border-t-transparent" />

      </div>

    );

  }

  if (error) {

    return (

      <div className="flex flex-col justify-center items-center h-[70vh]">

        <h2 className="text-red-600 text-lg font-semibold">

          {error}

        </h2>

        <button

          onClick={loadRecommendations}

          className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white"

        >

          Retry

        </button>

      </div>

    );

  }

  return (

    <main className="max-w-7xl mx-auto px-4 py-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Discover

        </h1>

        <p className="text-gray-500 mt-2">

          Personalized recommendations generated for you.

        </p>

      </div>

      <RecommendationFeed

        recommendations={recommendations}

        onOpen={openRecommendation}

      />

    </main>

  );

};

export default DiscoverPage;