export const EpisodeDTO = (episode) => {

  if (!episode) return null;

  return {

    id: episode._id,

    podcast: {
      id: episode.podcast?._id,
      title: episode.podcast?.title
    },

    title: episode.title,

    description: episode.description,

    audioUrl: episode.audioUrl,

    duration: episode.duration,

    plays: episode.plays || 0,

    views: episode.views || 0,

    likes: episode.likes?.length || 0,

    shares: episode.shares?.length || 0,

    createdAt: episode.createdAt

  };

};