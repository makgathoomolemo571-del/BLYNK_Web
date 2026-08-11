import { createContext, useContext } from "react";

import { usePermission } from "./PermissionContext";
import { useSubscription } from "./SubscriptionContext";
import { useNotification } from "./NotificationContext";
import { useWallet } from "./WalletContext";

const AppContext = createContext();

export const AppProvider = ({ user, children }) => {

  const permission = usePermission(user);
  const subscription = useSubscription(user);
  const notification = useNotification();
  const wallet = useWallet(user);

  return (
    <AppContext.Provider value={{

      user,

      ...permission,
      ...subscription,
      ...notification,
      ...wallet

    }}>
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () =>
  useContext(AppContext);