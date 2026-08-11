// src/modules/episode/pages/EditEpisodePage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EpisodeForm from "../components/EpisodeForm";
import episodeApi from "../services/episode.api";

export default function EditEpisodePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [episode, setEpisode] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        loadEpisode();

    }, [id]);

    const loadEpisode = async () => {

        try {

            setLoading(true);

            const data =
                await episodeApi.getById(id);

            setEpisode(data);

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Unable to load episode."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);

            await episodeApi.update(
                id,
                formData
            );

            navigate(`/episodes/${id}`);

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Failed to update episode."
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-96">

                Loading episode...

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

        <div className="max-w-5xl mx-auto py-8 px-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Edit Episode

                </h1>

                <p className="text-gray-500 mt-2">

                    Update your podcast episode.

                </p>

            </div>

            <EpisodeForm

                initialValues={episode}

                loading={saving}

                onSubmit={handleSubmit}

            />

        </div>

    );

}