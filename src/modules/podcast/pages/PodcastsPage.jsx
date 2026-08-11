// modules/podcast/pages/PodcastsPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PodcastCard from "../components/PodcastCard";

import {
  startLoading,
  stopLoading,
  setPodcasts,
  podcastError,
} from "../store/podcastSlice";

import podcastApi from "../services/podcast.api";

import {
    selectPodcasts,
    selectPodcastLoading,
    selectPodcastError
} from "../store/podcastSelectors";

const PodcastsPage = () => {
const navigate = useNavigate();
    const dispatch = useDispatch();

    const podcasts = useSelector(
        selectPodcasts
    );

    const loading = useSelector(
        selectPodcastLoading
    );

    const error = useSelector(
        selectPodcastError
    );

    useEffect(() => {

        const fetchPodcasts = async () => {
            dispatch(startLoading());
            try {
                const data = await podcastApi.getAll();
                dispatch(setPodcasts(data));
            } catch (err) {
                dispatch(podcastError(err?.message || "Unable to load podcasts."));
            } finally {
                dispatch(stopLoading());
            }
        };

        fetchPodcasts();
    }, [dispatch]);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-blue-600" />

            </div>

        );

    }

    if (error) {

        return (

            <div className="max-w-7xl mx-auto p-6">

                <div className="rounded-xl bg-red-100 text-red-700 p-5">

                    {error}

                </div>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-6">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold">

                        Podcasts

                    </h1>

                    <p className="text-gray-500 mt-1">

                        Discover podcasts from creators.

                    </p>

                </div>

            </div>

            {

                podcasts.length === 0 ?

                (

                    <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">

                        No podcasts available.

                    </div>

                )

                :

                (

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >

                        {

                            podcasts.map(

                                podcast => (

                                   <PodcastCard
  key={podcast.id || podcast._id}
  podcast={podcast}
  onClick={(podcast) =>
    navigate(`/podcasts/${podcast.id}/episodes`)
  }
/>

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

};

export default PodcastsPage;