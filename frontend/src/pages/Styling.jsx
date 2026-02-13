"use client"

import usePortfolioStore from "@/store/portfolio.store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import {palettes} from "../constants/palettes"
import { toast } from "sonner"
import api from "@/services/api"
import { useState } from "react"



export default function Styling() {
  const { theme, updateTheme } = usePortfolioStore()
  const [loading, setLoading] = useState();

  const isSelected = (palette) =>
    palette.primary === theme.primary &&
    palette.background === theme.background

  const applyPalette = (palette) => {
    updateTheme({
      primary: palette.primary,
      accent: palette.accent,
      background: palette.background,
      text: palette.text
    })
  }
  

  const handleUpdateTheme = async()=>{
    try {
      setLoading(true);
      const {data} = await api.post("/portfolio/update-theme",{theme});
      toast.success("Theme updated successfully!",{position:"top-right"});
      console.log(data.theme)
    } catch (error) {
      toast.error("Error updating theme!",{position:"top-right"});
    } finally{
      setLoading(false);
    }
  }

  return (
    <div className="w-full mx-auto p-6 space-y-8">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Choose a Color Theme
        </h1>
        <p className="text-muted-foreground">
          Select a palette that matches your personality.
        </p>
      </div>
      <Button
        onClick={handleUpdateTheme}
      >
        {loading ? "Updating!" : "Update Theme"}
      </Button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {palettes.map((palette) => (
          <Card
            key={palette.name}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isSelected(palette) ? "border-primary shadow-md" : ""
            }`}
            onClick={() => applyPalette(palette)}
          >

            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">
                {palette.name}
              </CardTitle>

              {isSelected(palette) && (
                <Badge className="flex items-center gap-1">
                  <Check size={14} /> Selected
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              <div className="flex h-20 rounded-lg overflow-hidden border">

                <div
                  className="flex-1"
                  style={{ backgroundColor: palette.primary }}
                />

                <div
                  className="flex-1"
                  style={{ backgroundColor: palette.accent }}
                />

                <div
                  className="flex-1"
                  style={{ backgroundColor: palette.background }}
                />

                <div
                  className="flex-1"
                  style={{ backgroundColor: palette.text }}
                />

              </div>
            </CardContent>

          </Card>
        ))}

      </div>

    </div>
  )
}
