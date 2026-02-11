"use client"

import { useEffect, useState } from "react"
import api from "@/services/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function PreviewPage() {
  const [html, setHtml] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true)
        const response = await api.post("/preview")

        setHtml(response.data.html)
      } catch (err) {
        console.error(err)
        setError(
          err.response?.data?.message ||
          "Failed to load preview"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [])

  return (
    <div className="p-6 w-full mx-auto">

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Preview</CardTitle>
        </CardHeader>

        <CardContent className="min-h-150">

          {loading && (
            <div className="flex items-center justify-center h-125">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          {!loading && !error && (
            <iframe
              srcDoc={html}
              title="Portfolio Preview"
              className="w-full h-200 border rounded-xl"
            />
          )}

        </CardContent>
      </Card>

    </div>
  )
}
