import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  template: "modern",
  theme: {},
  data: {
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      avatar: "",
    },
    projects: [],
    experience: [],
    skills: [],
    education: [],
    certifications: [],
    achievements: [],
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  },
  previewHTML: "",
  isPreviewLoading: false,
};

const usePortfolioStore = create(
  persist(
    (set) => ({
      ...initialState,

      setTemplate: (template) => set({ template }),

      updateTheme: (theme) =>
        set((state) => ({
          theme: { ...state.theme, ...theme },
        })),

      updatePersonal: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: {
              ...state.data.personal,
              [field]: value,
            },
          },
        })),

      updateSocialLinks: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            socialLinks: {
              ...state.data.socialLinks,
              [field]: value,
            },
          },
        })),

      updateSection: (section, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: value,
          },
        })),

      addItem: (section, item) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: [...state.data[section], item],
          },
        })),

      updateItem: (section, index, updatedItem) =>
        set((state) => {
          const updatedArray = [...state.data[section]];
          updatedArray[index] = updatedItem;
          return {
            data: {
              ...state.data,
              [section]: updatedArray,
            },
          };
        }),

      removeItem: (section, index) =>
        set((state) => {
          const updatedArray = [...state.data[section]];
          updatedArray.splice(index, 1);
          return {
            data: {
              ...state.data,
              [section]: updatedArray,
            },
          };
        }),

      setPreviewHTML: (html) => set({ previewHTML: html }),
      setPreviewLoading: (status) => set({ isPreviewLoading: status }),

      resetPortfolio: () => set(initialState),

      setPortfolio: (portfolio) =>
        set({
          template: portfolio.template || "modern",
          theme: portfolio.theme || {},
          data: portfolio.data || initialState.data,
        }),
    }),
    {
      name: "portfolio-storage", // localStorage key
    }
  )
);

export default usePortfolioStore;