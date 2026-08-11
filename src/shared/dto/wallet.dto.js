export const WalletDTO = (data) => {
  return {
    id: data?._id,
    userId: data?.user,
    balance: data?.balance || 0,
    tokens: data?.tokens || 0,
    vigPoints: data?.vigPoints || 0,
    currency: "VIG_TOKEN",
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt
  };
};