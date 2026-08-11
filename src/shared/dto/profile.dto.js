export const ProfileDTO = (data) => {
  return {
    userId: data?.user?._id || data?.userId,
    firstName: data?.firstName,
    lastName: data?.lastName,
    displayName: data?.displayName,
    bio: data?.bio,
    location: data?.location,
    gender: data?.gender,
    dateOfBirth: data?.dateOfBirth,
    profilePicture: data?.profilePicture,
    coverBanner: data?.coverBanner,
    socials: data?.socials || {},
    updatedAt: data?.updatedAt
  };
};