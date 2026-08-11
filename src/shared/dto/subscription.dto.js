export const SubscriptionDTO = (data) => {
  return {
    id: data?._id,
    userId: data?.user,
    plan: data?.plan,
    status: data?.status,
    startDate: data?.startDate,
    endDate: data?.endDate,
    autoRenew: data?.autoRenew,
    isActive: data?.status === "active"
  };
};