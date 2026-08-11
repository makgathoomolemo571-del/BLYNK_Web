export const ROLES = {
  MEMBER: "member",
  CREATOR: "creator",
  BUSINESS: "business",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

export const can = (user, permission) => {
  if (!user) return false;

  const userPermissions = user?.permissions || [];
  const role = user?.role;

  // Admin bypass
  if (role === ROLES.ADMIN || role === ROLES.SUPERADMIN) {
    return true;
  }

  return userPermissions.includes(permission);
};

export const hasRole = (user, roles = []) => {
  if (!user) return false;
  return roles.includes(user.role);
};