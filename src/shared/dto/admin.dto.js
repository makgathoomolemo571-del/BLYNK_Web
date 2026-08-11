export const AdminDTO = (data) => {
  return {
    id: data?.id,
    email: data?.email,
    role: data?.role,

    permissions: data?.permissions || [],

    status: data?.status,

    lastLogin: data?.lastLogin,

    createdAt: data?.createdAt,

    profile: {
      name: data?.profile?.name,
      avatar: data?.profile?.avatar
    }
  };
};