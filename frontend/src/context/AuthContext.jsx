import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { changePassword, login, logout, me } from "../services/auth.service";

const AuthContext = createContext(undefined);

function extractAdmin(payload) {
  return payload?.admin || payload?.user || payload || null;
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const data = await me();
      setAdmin(extractAdmin(data));
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = async (credentials) => {
    const data = await login(credentials);
    const nextAdmin = extractAdmin(data);
    setAdmin(nextAdmin);
    return nextAdmin;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setAdmin(null);
    }
  };

  const handleChangePassword = async (payload) => {
    return changePassword(payload);
  };

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: Boolean(admin),
      login: handleLogin,
      logout: handleLogout,
      changePassword: handleChangePassword,
      checkAuth,
    }),
    [admin, loading, checkAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return ctx;
}
