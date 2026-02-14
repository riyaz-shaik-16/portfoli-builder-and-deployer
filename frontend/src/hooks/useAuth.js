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
  const hasCheckedAuth = useAuthStore((s) => s.hasCheckedAuth);
  const setCheckedAuth = useAuthStore((s) => s.setCheckedAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCheckedAuth();
      return;
    }

    if (isAuthenticated || isAuthLoading) return;

    const fetchUser = async () => {
      try {
        setAuthLoading(true);
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch {
        logout();
      } finally {
        setAuthLoading(false);
        setCheckedAuth();
      }
    };

    fetchUser();
  }, []);

  return { user, isAuthenticated, isAuthLoading };
};

export default useAuth;
