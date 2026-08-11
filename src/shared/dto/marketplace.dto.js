export const MarketplaceDTO = (data) => {
  return {
    id: data?._id,
    title: data?.title,
    description: data?.description,
    category: data?.category,
    price: data?.price,
    currency: data?.currency || "TOKEN",
    images: data?.images || [],
    ownerId: data?.owner,
    status: data?.status,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt
  };
};