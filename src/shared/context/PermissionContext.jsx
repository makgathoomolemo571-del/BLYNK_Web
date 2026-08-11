import { createContext, useContext } from "react";

const PermissionContext = createContext();

export const PermissionProvider = ({ user, children }) => {

  const hasPermission = (permission) => {

    if (!user) return false;

    return user.permissions?.includes(permission);

  };

  const hasRole = (role) => {

    return user?.role === role;

  };

  return (
    <PermissionContext.Provider value={{
      hasPermission,
      hasRole,
      user
    }}>
      {children}
    </PermissionContext.Provider>
  );

};

export const usePermission = () =>
  useContext(PermissionContext);