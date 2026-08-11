import { createContext, useContext } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ user, children }) => {

  const plan = user?.subscription?.plan;

  const hasPlan = (plans) => {

    if (!plan) return false;

    return plans.includes(plan);

  };

  const isPremium = () => {

    return plan?.includes("PLUS") ||
           plan?.includes("PRO") ||
           plan?.includes("VIP");

  };

  return (
    <SubscriptionContext.Provider value={{
      plan,
      hasPlan,
      isPremium
    }}>
      {children}
    </SubscriptionContext.Provider>
  );

};

export const useSubscription = () =>
  useContext(SubscriptionContext);