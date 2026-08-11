import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { generateRecommendations } from "../store/recommendationActions";
import {
  selectRecommendations,
  selectRecommendationLoading,
  selectRecommendationError,
} from "../store/recommendationSelectors";

import RecommendationCard from "./RecommendationCard";

const RecommendationFeed = () => {
  const dispatch = useDispatch();

  const recommendations = useSelector(selectRecommendations);
  const loading = useSelector(selectRecommendationLoading);
  const error = useSelector(selectRecommendationError);

  useEffect(() => {
    dispatch(generateRecommendations());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <span className="animate-pulse text-gray-500">
          Loading recommendations...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">
          No recommendations available.
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Interact with BLYNK to improve your recommendations.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-5">
      {recommendations.map((item) => (
        <RecommendationCard
          key={item.id}
          recommendation={item}
        />
      ))}
    </section>
  );
};

export default RecommendationFeed;