import {
  recommendationsStart,
  recommendationsSuccess,
  recommendationsFail
} from "./recommendationSlice";

import recommendationApi from "../services/recommendation.api";

export const getRecommendations = () => async (dispatch) => {

  try {

    dispatch({
      type: "RECOMMENDATIONS_LOADING"
    });


    const data =
      await recommendationApi.getRecommendations();


    dispatch({
      type: "RECOMMENDATIONS_SUCCESS",
      payload: data
    });


  } catch (error) {


    dispatch({
      type: "RECOMMENDATIONS_ERROR",
      payload:
        error.response?.data?.message ||
        "Failed to load recommendations"
    });


  }

};

export const generateRecommendations =
  () => async (dispatch) => {

    try {

      dispatch(recommendationsStart());


      const data =
        await recommendationApi.getRecommendations();


      dispatch(
        recommendationsSuccess(data)
      );


    } catch (error) {

      dispatch(
        recommendationsFail(
          error.response?.data?.message ||
          "Unable to load recommendations"
        )
      );

    }

  };