// src/modules/episode/components/EpisodeMediaPreview.jsx

import PropTypes from "prop-types";
import {
    Music,
    Video,
    Image as ImageIcon,
    FileAudio,
    FileVideo
} from "lucide-react";

export default function EpisodeMediaPreview({

    audio,

    video,

    thumbnail,

    gallery = []

}) {

    return (

        <div className="space-y-6">

            {/* THUMBNAIL */}

            {thumbnail && (

                <div>

                    <h3 className="font-semibold mb-2">

                        Episode Cover

                    </h3>

                    <img

                        src={
                            typeof thumbnail === "string"
                                ? thumbnail
                                : URL.createObjectURL(thumbnail)
                        }

                        alt="Episode Cover"

                        className="
                            w-full
                            max-h-80
                            object-cover
                            rounded-xl
                            border
                        "

                    />

                </div>

            )}

            {/* AUDIO */}

            {audio && (

                <div className="border rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-3">

                        <Music
                            size={20}
                            className="text-purple-600"
                        />

                        <h3 className="font-semibold">

                            Episode Audio

                        </h3>

                    </div>

                    <audio
                        controls
                        className="w-full"
                    >

                        <source
                            src={
                                typeof audio === "string"
                                    ? audio
                                    : URL.createObjectURL(audio)
                            }
                        />

                    </audio>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                        <FileAudio size={16} />

                        {

                            typeof audio === "string"

                                ? audio.split("/").pop()

                                : audio.name

                        }

                    </div>

                </div>

            )}

            {/* VIDEO */}

            {video && (

                <div className="border rounded-xl p-4">

                    <div className="flex items-center gap-2 mb-3">

                        <Video
                            size={20}
                            className="text-blue-600"
                        />

                        <h3 className="font-semibold">

                            Episode Video

                        </h3>

                    </div>

                    <video
                        controls
                        className="w-full rounded-lg"
                    >

                        <source
                            src={
                                typeof video === "string"
                                    ? video
                                    : URL.createObjectURL(video)
                            }
                        />

                    </video>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">

                        <FileVideo size={16} />

                        {

                            typeof video === "string"

                                ? video.split("/").pop()

                                : video.name

                        }

                    </div>

                </div>

            )}

            {/* GALLERY */}

            {

                gallery.length > 0 && (

                    <div>

                        <div className="flex items-center gap-2 mb-4">

                            <ImageIcon
                                size={20}
                                className="text-pink-500"
                            />

                            <h3 className="font-semibold">

                                Gallery Images

                            </h3>

                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                            {

                                gallery.map((image, index) => (

                                    <img

                                        key={index}

                                        src={
                                            typeof image === "string"

                                                ? image

                                                : URL.createObjectURL(image)
                                        }

                                        alt={`Gallery ${index}`}

                                        className="
                                            w-full
                                            h-40
                                            object-cover
                                            rounded-xl
                                            border
                                        "

                                    />

                                ))

                            }

                        </div>

                    </div>

                )

            }

        </div>

    );

}

EpisodeMediaPreview.propTypes = {

    audio: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),

    video: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),

    thumbnail: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),

    gallery: PropTypes.array

};