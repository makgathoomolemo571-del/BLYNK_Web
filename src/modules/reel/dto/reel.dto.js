const ReelDTO = (reel) => ({
  id: reel._id,
  user: {
    id: reel.user?._id,
    username: reel.user?.username,
    profilePicture: reel.user?.profilePicture
  },
  caption: reel.caption,
  mediaUrl: reel.mediaUrl,
  thumbnail: reel.thumbnail,
  duration: reel.duration,
  views: reel.views || 0,
  likes: reel.likes || 0,
  shares: reel.shares || 0,
  isDeleted: reel.isDeleted || false,
  createdAt: reel.createdAt
});

module.exports = ReelDTO;