import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authApi from "../api/auth.api";

const AuthContext = createContext(null);

const normalizeError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    "Something went wrong";

  const errors = error?.response?.data?.errors || [];

  return {
    message,
    errors,
    status: error?.response?.status || null,
    raw: error,
  };
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const clearSessionState = useCallback(() => {
    setAdmin(null);
    setError(null);
    setRefreshing(false);
    setLoading(false);
    setInitialized(true);
  }, []);

  const bootstrapSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.me();
      const currentAdmin = response?.data?.admin || null;
      setAdmin(currentAdmin);
      return currentAdmin;
    } catch (err) {
      setAdmin(null);
      return null;
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login({ email, password });
      const loggedInAdmin = response?.data?.admin || null;
      setAdmin(loggedInAdmin);
      setInitialized(true);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:login"));
      }

      return loggedInAdmin;
    } catch (err) {
      const normalized = normalizeError(err);
      setError(normalized);
      setAdmin(null);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (_err) {
      // Ignore network/server errors; clear local state anyway.
    } finally {
      clearSessionState();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    }
  }, [clearSessionState]);

  const refreshSession = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    try {
      const response = await authApi.refresh();
      const refreshedAdmin = response?.data?.admin || null;
      setAdmin(refreshedAdmin);
      setInitialized(true);
      return refreshedAdmin;
    } catch (err) {
      const normalized = normalizeError(err);
      setError(normalized);
      setAdmin(null);
      throw normalized;
    } finally {
      setRefreshing(false);
    }
  }, []);

  const changePassword = useCallback(
    async ({ currentPassword, newPassword, confirmPassword }) => {
      try {
        const response = await authApi.changePassword({
          currentPassword,
          newPassword,
          confirmPassword,
        });

        const updatedAdmin = response?.data?.admin || null;
        setAdmin(updatedAdmin);
        return updatedAdmin;
      } catch (err) {
        const normalized = normalizeError(err);
        setError(normalized);
        throw normalized;
      }
    },
    [],
  );

  const clearAuthError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    bootstrapSession();
  }, [bootstrapSession]);

  useEffect(() => {
    const handleForcedLogout = () => {
      clearSessionState();
    };

    const handleForcedLoginRefresh = async () => {
      // Optional sync hook for future multi-tab support.
      // No-op for now because login already updates local state.
    };

    window.addEventListener("auth:logout", handleForcedLogout);
    window.addEventListener("auth:login", handleForcedLoginRefresh);

    return () => {
      window.removeEventListener("auth:logout", handleForcedLogout);
      window.removeEventListener("auth:login", handleForcedLoginRefresh);
    };
  }, [clearSessionState]);

  const value = useMemo(
    () => ({
      admin,
      setAdmin,
      loading,
      refreshing,
      initialized,
      error,
      isAuthenticated: !!admin,
      login,
      logout,
      refreshSession,
      bootstrapSession,
      changePassword,
      clearAuthError,
    }),
    [
      admin,
      loading,
      refreshing,
      initialized,
      error,
      login,
      logout,
      refreshSession,
      bootstrapSession,
      changePassword,
      clearAuthError,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthContext;
