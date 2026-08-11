export const ReelDTO = (reel) => {

  if (!reel) return null;

  return {

    id: reel._id,

    creator: {
      id: reel.creator?._id,
      username: reel.creator?.username,
      profilePicture: reel.creator?.profilePicture
    },

    media: reel.media,

    caption: reel.caption,

    duration: reel.duration,

    views: reel.views,

    likes: reel.likes?.length || 0,

    comments: reel.comments?.length || 0,

    shares: reel.shares?.length || 0,

    isLiked: reel.isLiked || false,

    createdAt: reel.createdAt

  };

};