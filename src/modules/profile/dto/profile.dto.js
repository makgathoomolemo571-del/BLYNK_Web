const ProfileDTO = (profile) => ({
  id: profile._id,
  userId: profile.user,
  profilePicture: profile.profilePicture,
  coverBanner: profile.coverBanner,
  firstName: profile.firstName,
  lastName: profile.lastName,
  displayName: profile.displayName,
  bio: profile.bio,
  location: profile.location,
  website: profile.website,
  socials: profile.socials,
  visibility: profile.visibility,
  createdAt: profile.createdAt,
  referralCode: data.user.referralCode || null,
          referredBy: data.user.referredBy || null,
});

module.exports = ProfileDTO;