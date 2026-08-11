import { createContext, useContext, useState } from "react";
import api from "../config/api";
import { useAuth } from "../AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const { token } = useAuth();

  const [profile, setProfile] = useState(null);

  const getProfile = async (userId) => {
    const res = await api.get(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setProfile(res.data);
  };

  const updateProfile = async (data) => {
    const res = await api.patch("/profile/update", data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setProfile(res.data);
  };

  return (
    <UserContext.Provider value={{
      profile,
      getProfile,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);