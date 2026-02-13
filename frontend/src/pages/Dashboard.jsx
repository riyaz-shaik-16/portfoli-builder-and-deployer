"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import api from "@/services/api"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard/")
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    )
  }

  const state = data?.state
  const portfolio = data?.portfolio

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <Card className="shadow-sm border rounded-2xl">
        <CardHeader>
          <CardTitle>Portfolio Status</CardTitle>
          <CardDescription>
            Current state of your portfolio
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">

          {state === "empty" && (
            <>
              <Badge variant="secondary">No Portfolio</Badge>
              <p className="text-sm text-muted-foreground">
                You haven’t created a portfolio yet.
              </p>
              <Button>Create Portfolio</Button>
            </>
          )}

          {state === "draft" && (
            <>
              <Badge variant="outline">Draft</Badge>

              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Template:</span> {portfolio.template}</p>
                <p className="text-muted-foreground">
                  Last Updated: {new Date(portfolio.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <Button>Continue Editing</Button>
                <Button variant="secondary">Deploy</Button>
              </div>
            </>
          )}

          {state === "live" && (
            <>
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                Live
              </Badge>

              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Template:</span> {portfolio.template}</p>
                <p>
                  <span className="font-medium">Live URL:</span>{" "}
                  <a
                    href={portfolio.deployedUrl}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {portfolio.deployedUrl}
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Last Updated: {new Date(portfolio.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Edit Portfolio</Button>
                <Button>View Live</Button>
              </div>
            </>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
