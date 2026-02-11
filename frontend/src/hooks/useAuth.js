import { useEffect } from "react";
import useAuthStore from "../store/auth.store";
import api from "../services/api";

const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isAuthLoading,
    setUser,
    setAuthLoading,
    logout
  } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Case: token exists but store not hydrated
    if (token && !isAuthenticated && !isAuthLoading) {
      const fetchUser = async () => {
        try {
          setAuthLoading(true);

          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch (err) {
          // Token invalid or expired
          logout();
        } finally {
          setAuthLoading(false);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, isAuthLoading, setUser, setAuthLoading, logout]);

  return {
    user,
    isAuthenticated,
    isAuthLoading
  };
};

export default useAuth;
