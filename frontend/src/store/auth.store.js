import { create } from "zustand";

const useAuthStore = create(
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
  })
);

export default useAuthStore;
