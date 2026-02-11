import { create } from "zustand"
import { persist } from "zustand/middleware"

const usePortfolioStore = create(
  persist(
    (set) => ({
      template: "modern",

      theme: {
        primary: "#6366f1",
        background: "#ffffff",
        text: "#111827",
        accent: "#22c55e",
        font: "inter",
        layout: "default"
      },

      data: {
        personal: {
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          bio: "",
          avatar: ""
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
          website: ""
        }
      },

      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: []
      },

      analytics: {
        views: 0
      },

      previewHTML: "",
      isPreviewLoading: false,

      setTemplate: (template) => set({ template }),

      updateTheme: (theme) =>
        set((state) => ({
          theme: { ...state.theme, ...theme }
        })),

      updatePersonal: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            personal: {
              ...state.data.personal,
              [field]: value
            }
          }
        })),

      updateSocialLinks: (field, value) =>
        set((state) => ({
          data: {
            ...state.data,
            socialLinks: {
              ...state.data.socialLinks,
              [field]: value
            }
          }
        })),

      updateSection: (section, value) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: value
          }
        })),


      addItem: (section, item) =>
        set((state) => ({
          data: {
            ...state.data,
            [section]: [...state.data[section], item]
          }
        })),

      updateItem: (section, index, updatedItem) =>
        set((state) => {
          const updatedArray = [...state.data[section]]
          updatedArray[index] = updatedItem
          return {
            data: {
              ...state.data,
              [section]: updatedArray
            }
          }
        }),

      removeItem: (section, index) =>
        set((state) => {
          const updatedArray = [...state.data[section]]
          updatedArray.splice(index, 1)
          return {
            data: {
              ...state.data,
              [section]: updatedArray
            }
          }
        }),

      updateSEO: (field, value) =>
        set((state) => ({
          seo: {
            ...state.seo,
            [field]: value
          }
        })),

      setPreviewHTML: (html) => set({ previewHTML: html }),

      setPreviewLoading: (status) => set({ isPreviewLoading: status }),

      resetPortfolio: () =>
        set({
          template: "modern",
          theme: {
            primary: "#6366f1",
            background: "#ffffff",
            text: "#111827",
            accent: "#22c55e",
            font: "inter",
            layout: "default"
          },
          data: {
            personal: {
              name: "",
              title: "",
              email: "",
              phone: "",
              location: "",
              bio: "",
              avatar: ""
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
              website: ""
            }
          },
          seo: {
            metaTitle: "",
            metaDescription: "",
            keywords: []
          },
          analytics: {
            views: 0
          },
          previewHTML: "",
          isPreviewLoading: false
        })
    }),
    {
      name: "portfolio-storage"
    }
  )
)

export default usePortfolioStore
