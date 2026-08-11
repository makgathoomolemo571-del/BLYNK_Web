import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecommendations } from "../store/recommendationActions";
import {
  selectRecommendations,
  selectRecommendationsLoading,
  selectRecommendationsError
} from "../store/recommendationSelectors";

import RecommendationFeed from "../components/RecommendationFeed";

const TrendingPage = () => {

  const dispatch = useDispatch();

  const recommendations = useSelector(
    selectRecommendations
  );

  const loading = useSelector(
    selectRecommendationsLoading
  );

  const error = useSelector(
    selectRecommendationsError
  );

  useEffect(() => {

    dispatch(
      getRecommendations({
        limit: 20
      })
    );

  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-gray-500 text-lg">
          Loading trending...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-red-500">
          {error}
        </span>
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 py-6">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Trending
        </h1>

        <p className="text-gray-500 mt-1">
          Personalized recommendations generated for you.
        </p>

      </div>

      <RecommendationFeed
        recommendations={recommendations}
      />

    </div>

  );

};

export default TrendingPage;