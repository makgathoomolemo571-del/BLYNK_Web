export const StoryDTO = (story) => {

  if (!story) return null;

  return {

    id: story._id,

    creator: {
      id: story.creator?._id,
      username: story.creator?.username,
      profilePicture: story.creator?.profilePicture
    },

    media: story.media,

    caption: story.caption,

    type: story.type,

    views: story.views || 0,

    viewers: story.viewers?.length || 0,

    reactions: story.reactions?.length || 0,

    expiresAt: story.expiresAt,

    createdAt: story.createdAt

  };

};