export const PodcastDTO = (podcast) => {

  if (!podcast) return null;

  return {

    id: podcast._id,

    owner: {
      id: podcast.owner?._id,
      username: podcast.owner?.username,
      profilePicture: podcast.owner?.profilePicture
    },

    title: podcast.title,

    description: podcast.description,

    coverImage: podcast.coverImage,

    category: podcast.category,

    episodesCount: podcast.episodes?.length || 0,

    subscribers: podcast.subscribers?.length || 0,

    isSubscribed: podcast.isSubscribed || false,

    createdAt: podcast.createdAt

  };

};