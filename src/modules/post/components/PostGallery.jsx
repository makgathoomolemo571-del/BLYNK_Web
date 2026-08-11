// modules/post/components/PostGallery.jsx

import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    FaPlay,
    FaFileAlt,
    FaMusic,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

const EMPTY_IMAGE =
    "https://placehold.co/800x800?text=No+Media";

function MediaItem({ item, onClick }) {
    switch (item.type) {
        case "image":
            return (
                <img
                    src={item.url || EMPTY_IMAGE}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={onClick}
                />
            );

        case "video":
            return (
                <div
                    onClick={onClick}
                    className="relative w-full h-full cursor-pointer bg-black"
                >
                    <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="bg-white rounded-full p-4 shadow-lg">
                            <FaPlay size={18} />
                        </div>
                    </div>
                </div>
            );

        case "audio":
            return (
                <div
                    onClick={onClick}
                    className="flex flex-col items-center justify-center h-full bg-zinc-900 text-white cursor-pointer"
                >
                    <FaMusic size={50} />
                    <span className="mt-4 text-sm">
                        Audio
                    </span>
                </div>
            );

        default:
            return (
                <div
                    onClick={onClick}
                    className="flex flex-col items-center justify-center h-full bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                >
                    <FaFileAlt size={50} />
                    <span className="mt-3 text-sm">
                        Document
                    </span>
                </div>
            );
    }
}

MediaItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

function PostGallery({ media = [] }) {
    const [index, setIndex] = useState(0);

    const items = useMemo(
        () => media.filter(Boolean),
        [media]
    );

    if (!items.length)
        return null;

    const current = items[index];

    const previous = () =>
        setIndex((p) =>
            p === 0
                ? items.length - 1
                : p - 1
        );

    const next = () =>
        setIndex((p) =>
            p === items.length - 1
                ? 0
                : p + 1
        );

    return (
        <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black relative">

            <div className="aspect-square md:aspect-video">

                <MediaItem
                    item={current}
                    onClick={() =>
                        window.open(
                            current.url,
                            "_blank"
                        )
                    }
                />

            </div>

            {items.length > 1 && (
                <>
                    <button
                        onClick={previous}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3"
                    >
                        <FaChevronRight />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">

                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() =>
                                    setIndex(i)
                                }
                                className={`w-2.5 h-2.5 rounded-full transition ${
                                    i === index
                                        ? "bg-white"
                                        : "bg-white/40"
                                }`}
                            />
                        ))}

                    </div>

                    <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                        {index + 1}/{items.length}
                    </div>
                </>
            )}

            {items.length > 1 && (
                <div className="grid grid-cols-6 md:grid-cols-8 gap-1 p-2 bg-zinc-950">

                    {items.map((item, i) => (

                        <button
                            key={i}
                            onClick={() =>
                                setIndex(i)
                            }
                            className={`aspect-square overflow-hidden rounded border-2 ${
                                i === index
                                    ? "border-blue-500"
                                    : "border-transparent"
                            }`}
                        >
                            {item.type ===
                            "image" ? (
                                <img
                                    src={item.url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            ) : item.type ===
                              "video" ? (
                                <video
                                    src={item.url}
                                    className="w-full h-full object-cover"
                                    muted
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white">
                                    {item.type ===
                                    "audio" ? (
                                        <FaMusic />
                                    ) : (
                                        <FaFileAlt />
                                    )}
                                </div>
                            )}
                        </button>

                    ))}

                </div>
            )}

        </div>
    );
}

PostGallery.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            type: PropTypes.oneOf([
                "image",
                "video",
                "audio",
                "document"
            ]),
            thumbnail:
                PropTypes.string
        })
    )
};

export default memo(PostGallery);