export const AuthDTO = (data) => {
  return {
    userId: data?.user?._id || data?.userId,
    email: data?.email,
    token: data?.token,
    refreshToken: data?.refreshToken,
    role: data?.role,
    plan: data?.plan,
    isVerified: data?.isVerified || false
  };
};