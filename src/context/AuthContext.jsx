import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi, logoutApi, getMeApi } from "../services/authService";
import { getAccessToken } from "../services/tokenService";

const AuthContext = createContext();

const defaultUser = {
  isAuthenticated: false,
  user_type: null,
  is_staff: false,
  name: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize auth state on app load
   * Only calls /me if token exists
   */
  useEffect(() => {
    const fetchUser = async () => {
      const token = getAccessToken();

      // If No token → skip API call
      if (!token) {
        setUser(defaultUser);
        setLoading(false);
        return;
      }

      try {
        const data = await getMeApi();

        setUser({
          ...defaultUser,
          ...data,
          isAuthenticated: true,
        });
      } catch {
        // token invalid or expired
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // LOGIN
  const login = async (form) => {
    const data = await loginApi(form);

    setUser({
      ...defaultUser,
      ...data.user,
      isAuthenticated: true,
    });

    return data;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Logout API failed (ignored)", err);
    }

    // clear everything
    localStorage.clear();
    sessionStorage.clear();

    setUser(defaultUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
