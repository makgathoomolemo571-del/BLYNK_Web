export const PostDTO = (data) => ({
  id: data._id,
  author: {
    id: data.author?._id,
    username: data.author?.username,
    profilePicture: data.author?.profilePicture
  },
  caption: data.caption,
  media: data.media || [],
  type: data.type,
  likes: data.likes || 0,
  comments: data.comments || 0,
  shares: data.shares || 0,
  visibility: data.visibility,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt
});