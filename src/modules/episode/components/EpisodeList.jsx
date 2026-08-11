// src/modules/episode/components/EpisodeList.jsx

import PropTypes from "prop-types";
import { Edit3, Trash2, PlayCircle } from "lucide-react";

const EpisodeList = ({
    episodes = [],
    loading = false,
    onEdit = () => {},
    onDelete = () => {},
    onView = () => {}
}) => {

    if (loading) {

        return (

            <div className="py-10 text-center">

                Loading episodes...

            </div>

        );

    }

    if (episodes.length === 0) {

        return (

            <div className="bg-white rounded-xl shadow p-10 text-center">

                <h2 className="text-lg font-semibold">

                    No Episodes Yet

                </h2>

                <p className="text-gray-500 mt-2">

                    Create your first podcast episode.

                </p>

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {

                episodes.map((episode) => (

                    <div

                        key={episode.id}

                        className="bg-white rounded-xl shadow p-5 flex justify-between items-center"

                    >

                        <div>

                            <h3 className="text-lg font-semibold">

                                {episode.title}

                            </h3>

                            <p className="text-gray-500 mt-1">

                                Season {episode.seasonNumber}
                                {" • "}
                                Episode {episode.episodeNumber}

                            </p>

                            <div className="flex gap-6 mt-3 text-sm text-gray-500">

                                <span>

                                    ▶ {episode.plays}

                                </span>

                                <span>

                                    👁 {episode.views}

                                </span>

                                <span>

                                    🔄 {episode.shares}

                                </span>

                            </div>

                        </div>

                        <div className="flex gap-2">

                            <button

                                onClick={() => onView(episode)}

                                className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"

                            >

                                <PlayCircle size={18} />

                                View

                            </button>

                            <button

                                onClick={() => onEdit(episode)}

                                className="px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-2"

                            >

                                <Edit3 size={18} />

                                Edit

                            </button>

                            <button

                                onClick={() => onDelete(episode)}

                                className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"

                            >

                                <Trash2 size={18} />

                                Delete

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

};

EpisodeList.propTypes = {

    episodes: PropTypes.array,

    loading: PropTypes.bool,

    onEdit: PropTypes.func,

    onDelete: PropTypes.func,

    onView: PropTypes.func

};

export default EpisodeList;