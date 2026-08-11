export const BusinessFindDTO = (data) => {
  return {
    id: data?._id || data?.id,
    businessName: data?.businessName,
    owner: {
      id: data?.owner?._id,
      name: data?.owner?.name,
      username: data?.owner?.username,
      profilePicture: data?.owner?.profilePicture
    },
    category: data?.category,
    description: data?.description,
    location: data?.location,
    media: data?.media || [],
    budget: data?.budget,
    status: data?.status,
    applicants: data?.applicants || [],
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt
  };
};