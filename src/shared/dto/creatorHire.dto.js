export const CreatorHireDTO = (data) => {
  return {
    id: data?._id,
    creatorId: data?.creator,
    businessId: data?.business,
    title: data?.title,
    description: data?.description,
    budget: data?.budget,
    status: data?.status,
    skills: data?.skills || [],
    appliedAt: data?.appliedAt,
    createdAt: data?.createdAt
  };
};