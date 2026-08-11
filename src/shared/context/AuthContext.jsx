import { createContext, useContext, useState, useEffect } from "react";
import api from "../../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ======================
  // LOAD USER
  // ======================
  const loadUser = async () => {
    try {
      if (!token) return setLoading(false);

      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  // ======================
  // LOGIN
  // ======================
  const login = async (data) => {
    const res = await api.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  // ======================
  // LOGOUT
  // ======================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      loading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);