import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import podcastApi from "../../podcast/services/podcast.api";
import episodeApi from "../services/episode.api";
import EpisodeCard from "../components/EpisodeCard";

export default function PodcastEpisodesPage() {

  const { podcastId } = useParams();

  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [podcastId]);

  const loadData = async () => {

    try {

      setLoading(true);

      const podcast =
    await podcastApi.getById(podcastId);

setPodcast(podcast);

const episodes =
    await episodeApi.getByPodcast(podcastId);

setEpisodes(episodes);

    } finally {

      setLoading(false);

    }

  };

  if (loading) return <div>Loading...</div>;

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* Podcast Header */}

      <div className="bg-white rounded-xl shadow p-6">

        <img
          src={
            podcast.coverImage ||
            "/images/podcast-placeholder.png"
          }
          className="w-full h-72 object-cover rounded-lg"
        />

        <h1 className="text-4xl font-bold mt-5">
          {podcast.name}
        </h1>

        <p className="text-gray-600 mt-3">
          {podcast.description}
        </p>

      </div>

      {/* Episodes */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-6">
          Episodes
        </h2>

        {episodes.length === 0 ? (

          <div>No episodes yet.</div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {episodes.map((episode) => (

              <EpisodeCard
                key={episode.id}
                episode={episode}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}