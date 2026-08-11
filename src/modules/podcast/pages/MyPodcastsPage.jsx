import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import usePodcasts from "../hooks/usePodcasts";

import PodcastCard from "../components/PodcastCard";

const MyPodcastsPage = () => {
  const {
    podcasts,
    loading,
    error,
    getMyPodcasts,
  } = usePodcasts();

  useEffect(() => {
    getMyPodcasts();
  }, [getMyPodcasts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Podcasts
          </h1>

          <p className="text-zinc-500 mt-1">
            Manage all your podcasts.
          </p>
        </div>

        <Link
          to="/podcasts/create"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          <FaPlus />
          Create Podcast
        </Link>

      </div>

      {!podcasts.length ? (
        <div className="rounded-2xl border bg-white p-12 text-center">

          <h2 className="text-xl font-semibold mb-2">
            No Podcasts Yet
          </h2>

          <p className="text-zinc-500 mb-6">
            Create your first podcast and start growing your audience.
          </p>

          <Link
            to="/podcasts/create"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            <FaPlus />
            Create Podcast
          </Link>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {podcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default MyPodcastsPage;