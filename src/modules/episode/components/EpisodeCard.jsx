// src/modules/episode/components/EpisodeCard.jsx

import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    Play,
    Eye,
    Heart,
    Share2,
    Clock,
    Pencil,
    Trash2
} from "lucide-react";

const formatNumber = (value = 0) => {

    if (value >= 1000000)
        return `${(value / 1000000).toFixed(1)}M`;

    if (value >= 1000)
        return `${(value / 1000).toFixed(1)}K`;

    return value;

};

const formatDuration = (seconds = 0) => {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;

};

const EpisodeCard = ({

    episode,

    showActions = false,

    onEdit = () => {},

    onDelete = () => {}

}) => {

    return (

        <div className="bg-white rounded-2xl shadow border overflow-hidden">

            {/* COVER */}

            <div className="relative">

                {

                    episode.thumbnail ? (

                        <img

                            src={episode.thumbnail}

                            alt={episode.title}

                            className="w-full h-52 object-cover"

                        />

                    ) : (

                        <div className="w-full h-52 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">

                            <Play
                                className="text-white"
                                size={55}
                            />

                        </div>

                    )

                }

                <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">

                    {formatDuration(
                        episode.duration
                    )}

                </span>

            </div>

            {/* BODY */}

            <div className="p-5">

                <div className="flex justify-between">

                    <div>

                        <p className="text-xs text-gray-500">

                            Season {episode.seasonNumber}
                            •
                            Episode {episode.episodeNumber}

                        </p>

                        <h2 className="font-bold text-lg mt-1">

                            {episode.title}

                        </h2>

                    </div>

                    <span
                        className={`text-xs px-3 py-1 rounded-full h-fit ${
                            episode.status === "published"
                                ? "bg-green-100 text-green-700"
                                : episode.status === "draft"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                    >

                        {episode.status}

                    </span>

                </div>

                {episode.description && (

                    <p className="text-gray-600 mt-3 line-clamp-3">

                        {episode.description}

                    </p>

                )}

                {/* STATS */}

                <div className="flex gap-5 mt-5 text-sm text-gray-500">

                    <div className="flex items-center gap-1">

                        <Play size={16} />

                        {formatNumber(
                            episode.plays
                        )}

                    </div>

                    <div className="flex items-center gap-1">

                        <Eye size={16} />

                        {formatNumber(
                            episode.views
                        )}

                    </div>

                    <div className="flex items-center gap-1">

                        <Heart size={16} />

                        {formatNumber(
                            episode.likes?.length || 0
                        )}

                    </div>

                    <div className="flex items-center gap-1">

                        <Share2 size={16} />

                        {formatNumber(
                            episode.shares
                        )}

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="flex justify-between mt-6">

                    <Link

                        to={`/episodes/${episode.id}`}

                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"

                    >

                        Open Episode

                    </Link>

                    {

                        showActions && (

                            <div className="flex gap-2">

                                <button

                                    onClick={() =>
                                        onEdit(episode)
                                    }

                                    className="p-2 rounded-lg border hover:bg-gray-100"

                                >

                                    <Pencil size={18} />

                                </button>

                                <button

                                    onClick={() =>
                                        onDelete(episode.id)
                                    }

                                    className="p-2 rounded-lg border text-red-600 hover:bg-red-50"

                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </div>

    );

};

EpisodeCard.propTypes = {

    episode: PropTypes.object.isRequired,

    showActions: PropTypes.bool,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func

};

export default memo(EpisodeCard);