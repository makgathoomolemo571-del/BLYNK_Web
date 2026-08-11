const UserProfileDTO = (profile, user) => ({
  id: profile._id,
  userId: user._id,

  username: user.username,
  email: user.email,
  role: user.role,
  verified: user.verified,

  profilePicture: profile.profilePicture,
  coverBanner: profile.coverBanner,

  firstName: profile.firstName,
  lastName: profile.lastName,
  displayName: profile.displayName,
  bio: profile.bio,

  location: profile.location,
  website: profile.website,
  socials: profile.socials,

  followers: profile.followersCount || 0,
  following: profile.followingCount || 0,
  posts: profile.postsCount || 0,

  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});

module.exports = UserProfileDTO;