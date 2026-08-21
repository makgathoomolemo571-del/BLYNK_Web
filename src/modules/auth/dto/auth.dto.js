export const AuthDTO = {

  fromLogin: (data) => {

    return {
      user: UserDTO(data.user),
      tokens: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      },
      subscription: data.subscription || null
    };

  },

  fromRegister: (data) => {

    return {
      user: UserDTO(data.user),
      verificationRequired: data.verificationRequired,
      message: data.message,
       referralCode:
        data.referralCode ||
        data.user?.referralCode ||
        null,
      referral:
        data.referral || null
    };

  },

  fromMe: (data) => {

    return {
      user: UserDTO(data.user),
      subscription: data.subscription,
      permissions: data.permissions,
      wallet: WalletDTO(data.wallet)
    };

  },

  fromRefresh: (data) => {

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };

  }

};


// ======================
// USER DTO (embedded clean mapping)
// ======================

const UserDTO = (user) => {

  if (!user) return null;

  return {

    id: user._id,
    username: user.username,
    email: user.email,

    role: user.role,
    status: user.status,

    profilePicture: user.profilePicture || null,

    isVerified: user.isVerified,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt

  };

};


// ======================
// WALLET DTO (light mapping for auth layer)
// ======================

const WalletDTO = (wallet) => {

  if (!wallet) return null;

  return {

    balance: wallet.balance || 0,
    tokens: wallet.tokens || 0,
    vigPoints: wallet.vigPoints || 0,
    currency: wallet.currency || "VIG"

  };

};