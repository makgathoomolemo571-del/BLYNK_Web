import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";

import RecommendationFeed from "../components/RecommendationFeed";

import {
  generateRecommendations
} from "../store/recommendationActions";

import {
  selectRecommendations,
  selectRecommendationLoading,
  selectRecommendationError
} from "../store/recommendationSelectors";

const RecommendationPage = () => {

  const dispatch = useDispatch();

  const recommendations =
    useSelector(selectRecommendations);

  const loading =
    useSelector(selectRecommendationLoading);

  const error =
    useSelector(selectRecommendationError);

  useEffect(() => {

    dispatch(
      generateRecommendations()
    );

  }, [dispatch]);

  const refresh = () => {

    dispatch(
      generateRecommendations()
    );

  };

  return (

    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Recommended For You
          </h1>

          <p className="text-gray-500 mt-1">
            Personalized recommendations generated
            by the BLYNK recommendation engine.
          </p>

        </div>

        <button

          onClick={refresh}

          disabled={loading}

          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

        >

          <FiRefreshCw
            className={
              loading
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>

      {

        error && (

          <div
            className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 text-red-600"
          >

            {error}

          </div>

        )

      }

      <RecommendationFeed

        recommendations={
          recommendations
        }

        loading={
          loading
        }

      />

    </div>

  );

};

export default RecommendationPage;