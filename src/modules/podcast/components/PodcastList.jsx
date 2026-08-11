import { memo } from "react";
import PropTypes from "prop-types";
import PodcastCard from "./PodcastCard";

const PodcastList = ({
  podcasts = [],
  loading = false,
  emptyMessage = "No podcasts found."
}) => {

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!podcasts.length) {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 text-center">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {emptyMessage}
        </h3>
      </div>
    );
  }

  return (
    <section
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-6
      "
    >
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
        />
      ))}
    </section>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      creator: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ]),
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string,
      coverImage: PropTypes.string,
      visibility: PropTypes.string,
      totalEpisodes: PropTypes.number,
      totalViews: PropTypes.number,
      totalListeners: PropTypes.number,
      createdAt: PropTypes.string
    })
  ),
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string
};

export default memo(PodcastList);