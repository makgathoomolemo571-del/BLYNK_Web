export const PostDTO = (data) => {
  return {
    id: data?._id,
    author: {
      id: data?.author?._id,
      username: data?.author?.username,
      profilePicture: data?.author?.profilePicture
    },
    caption: data?.caption,
    media: data?.media,
    type: data?.type, // text | image | video
    likes: data?.likes || 0,
    comments: data?.comments || 0,
    shares: data?.shares || 0,
    isLiked: data?.isLiked || false,
    createdAt: data?.createdAt
  };
};