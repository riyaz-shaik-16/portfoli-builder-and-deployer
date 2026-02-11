import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true
        }),

      setAuthLoading: (status) =>
        set({ isAuthLoading: status }),

      logout: () => {
        localStorage.removeItem("token");
        set({
          user: null,
          isAuthenticated: false,
          isAuthLoading: false
        });
      }
    }),
    {
      name: "auth-store"
    }
  )
);

export default useAuthStore;
