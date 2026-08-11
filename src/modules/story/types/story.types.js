export const StoryType = {
  id: String,
  creator: {
    id: String,
    username: String,
    profilePicture: String,
  },
  media: Array,
  caption: String,
  type: String,
  views: Number,
  viewers: Array,
  reactions: Array,
  replies: Array,
  visibility: String,
  expiresAt: Date,
  createdAt: Date,
};