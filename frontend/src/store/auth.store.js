import { create } from "zustand";
import usePortfolioStore from "./portfolio.store";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  hasCheckedAuth: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      hasCheckedAuth: true,
    }),

  setAuthLoading: (status) => set({ isAuthLoading: status }),

  setCheckedAuth: () => set({ hasCheckedAuth: true }),

  logout: () => {
    localStorage.removeItem("token");

    // Reset portfolio state
    usePortfolioStore.getState().resetPortfolio();

    set({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
    });
  },
}));

export default useAuthStore;
