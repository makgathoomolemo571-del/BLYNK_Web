import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import podcastApi from "../services/podcast.api";

const PodcastDetailsPage = () => {
 
  const navigate = useNavigate();
const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [error, setError] = useState("");

  const loadPodcast = async () => {
    try {
      setLoading(true);

      const { data } = await podcastApi.getById(podcastId);

      setPodcast(data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Failed to load podcast."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPodcast();
  }, [podcastId]);





 

  const removePodcast = async () => {
    if (
      !window.confirm(
        "Delete this podcast permanently?"
      )
    )
      return;

    try {
     const podcast = await podcastApi.getById(podcastId);

console.log("Podcast:", podcast);

setPodcast(podcast);

      navigate("/podcasts/my");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to delete podcast."
      );
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-5">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );

  if (!podcast)
    return (
      <div className="alert alert-warning">
        Podcast not found.
      </div>
    );

  return (
    <div className="container py-4">

      <div className="card shadow-sm">

        <img
          src={
            podcast.coverImage ||
            "/images/podcast-placeholder.png"
          }
          alt={podcast.name}
          className="card-img-top"
          style={{
            maxHeight: 380,
            objectFit: "cover"
          }}
        />

        <div className="card-body">

          <h2 className="mb-3">
            {podcast.name}
          </h2>

          <p className="text-muted">
            {podcast.description}
          </p>

          <div className="row mt-4">

            <div className="col-md-3">
              <strong>Category</strong>

              <p>{podcast.category}</p>
            </div>

            <div className="col-md-3">
              <strong>Visibility</strong>

              <p>{podcast.visibility}</p>
            </div>

            <div className="col-md-2">
              <strong>Episodes</strong>

              <p>{podcast.totalEpisodes}</p>
            </div>

            <div className="col-md-2">
              <strong>Views</strong>

              <p>{podcast.totalViews}</p>
            </div>

            <div className="col-md-2">
              <strong>Listeners</strong>

              <p>{podcast.totalListeners}</p>
            </div>

          </div>

<div className="mt-4 d-flex gap-2 flex-wrap">



  <button
    className="btn btn-success"
    onClick={() =>
      navigate(`/podcasts/${podcast.id}/episodes/create`)
    }
  >
    ➕ Add Episode
  </button>

  <button
    className="btn btn-warning"
    onClick={() =>
      navigate(`/podcasts/${podcast.id}/edit`)
    }
  >
    ✏ Edit Podcast
  </button>

  <button
    className="btn btn-info text-white"
    onClick={() =>
      navigate(`/podcasts/${podcast.id}`)
    }
  >
    📂 Open
  </button>

  <button
    className="btn btn-danger ms-auto"
    onClick={removePodcast}
  >
    🗑 Delete Podcast
  </button>

</div>

        </div>

      </div>

    </div>
  );
};

export default PodcastDetailsPage;