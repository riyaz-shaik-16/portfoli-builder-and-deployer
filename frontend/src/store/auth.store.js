import { create } from "zustand";
import usePortfolioStore from "./portfolio.store";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  setAuthLoading: (status) =>
    set({
      isAuthLoading: status,
    }),

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