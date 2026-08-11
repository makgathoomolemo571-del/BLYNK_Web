import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mediaApi from "../../media/services/media.api";
import EpisodeForm from "../components/EpisodeForm";
import episodeApi from "../services/episode.api";

export default function CreateEpisodePage() {
    const navigate = useNavigate();

    // GET PODCAST ID FROM URL
    const { podcastId } = useParams();

    const [loading, setLoading] = useState(false);

async function uploadMedia(file, type) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("module", "episode");
    formData.append("type", type);

    const res = await mediaApi.upload(formData);

    return res.data?.url || res.url;
}

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);

            let audioUrl = "";
let videoUrl = "";

if (formData.audio) {
    audioUrl = await uploadMedia(formData.audio, "audio");
}

if (formData.video) {
    videoUrl = await uploadMedia(formData.video, "video");
}

const payload = {
    ...formData,
    audio: audioUrl,
    video: videoUrl,
    podcast: podcastId
};



            console.log("Submitting episode:", payload);

            await episodeApi.create(payload);

            navigate(`/podcasts`);

        } catch (err) {
            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Unable to create episode."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Create Podcast Episode
                </h1>

                <p className="text-gray-500 mt-2">
                    Upload your episode audio, video and publish it to your podcast.
                </p>
            </div>

            <EpisodeForm
                initialValues={{
                    podcast: podcastId
                }}
                loading={loading}
                onSubmit={handleSubmit}
            />

        </div>
    );
}