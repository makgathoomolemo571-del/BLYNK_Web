export const storyDTO = (story) => ({
  id: story._id,
  creator: {
    id: story.creator?._id,
    username: story.creator?.username,
    profilePicture: story.creator?.profilePicture,
  },
  media: story.media,
  caption: story.caption,
  type: story.type,
  views: story.views?.length || 0,
  viewers: story.viewers || [],
  reactions: story.reactions || [],
  replies: story.replies || [],
  visibility: story.visibility,
  expiresAt: story.expiresAt,
  createdAt: story.createdAt,
});