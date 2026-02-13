import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function BuilderPage() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await api.get("/dashboard/builder/overview")
        setData(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOverview()
  }, [])

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    )
  }

  if (!data || data.state === "empty") {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>No Portfolio Yet</CardTitle>
            <CardDescription>
              Create your portfolio to start building.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/builder/details")}>
              Start Building
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 w-full mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Builder Overview</h1>
          <p className="text-sm text-muted-foreground">
            Manage and complete your portfolio
          </p>
        </div>

        <Badge variant={data.state === "live" ? "default" : "outline"}>
          {data.state === "live" ? "Live" : "Draft"}
        </Badge>
      </div>

      {/* COMPLETION */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Completion Progress</CardTitle>
          <CardDescription>
            Your portfolio is {data.completionPercentage}% complete
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={data.completionPercentage} />
        </CardContent>
      </Card>

      {/* SECTION CARDS */}
      <div className="grid md:grid-cols-2 gap-6">

        <SectionCard
          title="Details"
          description="Personal info, projects, skills, experience"
          completed={data.completion.personal && data.completion.projects}
          onClick={() => navigate("/builder/details")}
          extra={`Projects: ${data.counts.projects}`}
        />

        <SectionCard
          title="Theme"
          description="Colors, layout and styling"
          completed={data.completion.theme}
          onClick={() => navigate("/builder/theme")}
        />

        <SectionCard
          title="Template"
          description="Switch portfolio layout"
          completed={true}
          onClick={() => navigate("/builder/template")}
          extra={`Current: ${data.template}`}
        />

        <SectionCard
          title="Deploy"
          description="Publish your portfolio live"
          completed={data.state === "live"}
          onClick={() => navigate("/builder/deploy")}
        />

      </div>

      <Separator />

      {/* QUICK ACTIONS */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => navigate("/builder/details")}>
          Continue Editing
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/builder/deploy")}
        >
          Publish Portfolio
        </Button>
      </div>

    </div>
  )
}


/* --------------------------
   SECTION CARD COMPONENT
--------------------------- */

function SectionCard({ title, description, completed, onClick, extra }) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition rounded-2xl"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        <Badge variant={completed ? "default" : "outline"}>
          {completed ? "Complete" : "Incomplete"}
        </Badge>
      </CardHeader>

      {extra && (
        <CardContent className="text-sm text-muted-foreground">
          {extra}
        </CardContent>
      )}
    </Card>
  )
}