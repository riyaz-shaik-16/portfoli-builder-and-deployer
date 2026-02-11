import { createRoot } from "react-dom/client"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

import "./index.css"
import App from "./App.jsx"
import { TooltipProvider } from "./components/ui/tooltip"

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <TooltipProvider>
      <App />
    </TooltipProvider>
    <Toaster/>
  </ThemeProvider>
)
