import { useEffect } from "react";
import useAuthStore from "../store/auth.store";
import api from "../services/api";

const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/profile");
        setUser(data?.user);
      } catch (err) {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();
  }, []);

  return { user, isAuthenticated, isAuthLoading };
};

export default useAuth;