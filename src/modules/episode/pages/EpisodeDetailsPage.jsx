import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchEpisode,
    playEpisode,
    viewEpisode,
    likeEpisode,
    shareEpisode
} from "../store/episodeSlice";

export default function EpisodeDetailsPage() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        selectedEpisode,
        loading,
        error
    } = useSelector(
        state => state.episode
    );

    useEffect(() => {

        dispatch(fetchEpisode(id));

        dispatch(viewEpisode(id));

    }, [dispatch, id]);

    if (loading) {

        return (

            <div className="p-10 text-center">

                Loading episode...

            </div>

        );

    }

    if (error) {

        return (

            <div className="p-10 text-red-600">

                {error}

            </div>

        );

    }

    if (!selectedEpisode) {

        return (

            <div className="p-10 text-center">

                Episode not found.

            </div>

        );

    }

    return (

        <div className="max-w-5xl mx-auto py-8 px-6">

            <div className="mb-6">

                <Link
                    to={`/podcasts/${selectedEpisode.podcast}`}
                    className="text-blue-600 hover:underline"
                >

                    ← Back to Podcast

                </Link>

            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">

                                Season {selectedEpisode.seasonNumber}
                                ·
                                Episode {selectedEpisode.episodeNumber}

                            </p>

                            <h1 className="text-3xl font-bold mt-2">

                                {selectedEpisode.title}

                            </h1>

                        </div>

                    </div>

                    <p className="mt-5 whitespace-pre-wrap text-gray-700">

                        {selectedEpisode.description}

                    </p>

                </div>

                {

                    selectedEpisode.video && (

                        <div className="px-6 pb-6">

                            <video
                                controls
                                className="w-full rounded-xl"
                                onPlay={() =>
                                    dispatch(
                                        playEpisode(id)
                                    )
                                }
                            >

                                <source
                                    src={selectedEpisode.video}
                                />

                            </video>

                        </div>

                    )

                }

                {

                    selectedEpisode.audio && (

                        <div className="px-6 pb-6">

                            <audio
                                controls
                                className="w-full"
                                onPlay={() =>
                                    dispatch(
                                        playEpisode(id)
                                    )
                                }
                            >

                                <source
                                    src={selectedEpisode.audio}
                                />

                            </audio>

                        </div>

                    )

                }

                <div className="border-t p-6 flex flex-wrap gap-6">

                    <div>

                        <span className="font-semibold">

                            ▶ Plays

                        </span>

                        <p>

                            {selectedEpisode.plays}

                        </p>

                    </div>

                    <div>

                        <span className="font-semibold">

                            👁 Views

                        </span>

                        <p>

                            {selectedEpisode.views}

                        </p>

                    </div>

                    <div>

                        <span className="font-semibold">

                            🔄 Shares

                        </span>

                        <p>

                            {selectedEpisode.shares}

                        </p>

                    </div>

                    <div className="ml-auto flex gap-3">

                        <button
                            onClick={() =>
                                dispatch(
                                    likeEpisode(id)
                                )
                            }
                            className="px-4 py-2 rounded-lg bg-red-500 text-white"
                        >

                            ❤️ Like

                        </button>

                        <button
                            onClick={() =>
                                dispatch(
                                    shareEpisode(id)
                                )
                            }
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                        >

                            🔄 Share

                        </button>

                        <Link
                            to={`/episodes/${id}/edit`}
                            className="px-4 py-2 rounded-lg bg-gray-900 text-white"
                        >

                            ✏ Edit

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}