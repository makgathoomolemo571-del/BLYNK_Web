import permissions from "../../config/permissions";

export default function usePermissions(user) {

  const role = user?.role;

  const plan = user?.subscription?.plan;

  const can = (feature) => {

    if (
      role === permissions.ADMIN ||
      role === permissions.SUPERADMIN
    ) {
      return true;
    }

    const allowed =
      permissions.MATRIX[plan] || [];

    return allowed.includes(feature);

  };

  return {

    role,

    plan,

    can

  };

}