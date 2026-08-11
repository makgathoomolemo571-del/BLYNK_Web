// src/modules/episode/pages/EpisodeAnalyticsPage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Play,
    Eye,
    Heart,
    Share2,
    Clock,
    Radio
} from "lucide-react";

import episodeApi from "../services/episode.api";

export default function EpisodeAnalyticsPage() {

    const { id } = useParams();

    const [episode, setEpisode] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadEpisode();

    }, [id]);

    const loadEpisode = async () => {

        try {

            const data =
                await episodeApi.getById(id);

            setEpisode(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                Loading analytics...

            </div>

        );

    }

    if (!episode) {

        return (

            <div className="flex justify-center items-center h-96">

                Episode not found.

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Episode Analytics

                </h1>

                <p className="text-gray-500 mt-2">

                    {episode.title}

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                <AnalyticsCard
                    title="Plays"
                    value={episode.plays}
                    icon={<Play size={26} />}
                />

                <AnalyticsCard
                    title="Views"
                    value={episode.views}
                    icon={<Eye size={26} />}
                />

                <AnalyticsCard
                    title="Likes"
                    value={
                        episode.likes?.length || 0
                    }
                    icon={<Heart size={26} />}
                />

                <AnalyticsCard
                    title="Shares"
                    value={episode.shares}
                    icon={<Share2 size={26} />}
                />

                <AnalyticsCard
                    title="Duration"
                    value={`${episode.duration || 0} sec`}
                    icon={<Clock size={26} />}
                />

                <AnalyticsCard
                    title="Status"
                    value={episode.status}
                    icon={<Radio size={26} />}
                />

            </div>

            <div className="mt-10 rounded-xl border bg-white p-6">

                <h2 className="font-bold text-xl mb-4">

                    Episode Information

                </h2>

                <div className="space-y-3">

                    <Row
                        label="Podcast"
                        value={episode.podcast}
                    />

                    <Row
                        label="Season"
                        value={episode.seasonNumber}
                    />

                    <Row
                        label="Episode"
                        value={episode.episodeNumber}
                    />

                    <Row
                        label="Visibility"
                        value={episode.visibility}
                    />

                    <Row
                        label="Published"
                        value={
                            episode.publishDate ||
                            "Not published"
                        }
                    />

                    <Row
                        label="Created"
                        value={new Date(
                            episode.createdAt
                        ).toLocaleString()}
                    />

                </div>

            </div>

        </div>

    );

}

function AnalyticsCard({

    title,

    value,

    icon

}) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-blue-600">

                    {icon}

                </div>

            </div>

        </div>

    );

}

function Row({

    label,

    value

}) {

    return (

        <div className="flex justify-between border-b pb-2">

            <span className="font-medium">

                {label}

            </span>

            <span className="text-gray-600">

                {value}

            </span>

        </div>

    );

}