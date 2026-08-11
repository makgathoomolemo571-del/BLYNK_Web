import { createContext, useContext } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ user, children }) => {

  const balance = user?.wallet?.tokens || 0;
  const vigPoints = user?.wallet?.vigPoints || 0;

  const canSpend = (amount) => {

    return balance >= amount;

  };

  const canRedeem = (points) => {

    return vigPoints >= points;

  };

  return (
    <WalletContext.Provider value={{
      balance,
      vigPoints,
      canSpend,
      canRedeem
    }}>
      {children}
    </WalletContext.Provider>
  );

};

export const useWallet = () =>
  useContext(WalletContext);s