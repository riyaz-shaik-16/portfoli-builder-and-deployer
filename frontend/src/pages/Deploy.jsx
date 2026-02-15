import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import api from "@/services/api"
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function DeployPage() {
  const [loading, setLoading] = useState(false)
  const [deploying, setDeploying] = useState(false);
  const [portfolio, setPortfolio] = useState(null)
  const [state, setState] = useState(null)

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/dashboard/")
      console.log(data);

      setState(data.state)
      setPortfolio(data.portfolio)
    } catch (err) {
      toast.error("Something went wrong!",{positon:"top-right"})
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const handleDeploy = async () => {
    try {
      setDeploying(true)

      const {data} = await api.post("/portfolio/deploy")
      setPortfolio(data.portfolio);
      setState(data.state);

      toast.success("Deployment Successful!",{position:"top-right"});


    } catch (err) {
      toast.error("Something went wrong!",{positon:"top-right"})
    } finally {
      setDeploying(false)
    }
  }

  const isLive = state === "live"

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Deploy Portfolio</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span>Status</span>

            {isLive ? (
              <Badge className="bg-green-600">Live</Badge>
            ) : (
              <Badge variant="secondary">Not Deployed</Badge>
            )}
          </div>

          {isLive && portfolio?.deployedUrl && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Live URL</p>
              <a
                href={portfolio.deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {portfolio.deployedUrl}
              </a>
            </div>
          )}

          <Button
            onClick={handleDeploy}
            disabled={loading}
            className="w-full"
          >
            {deploying
              ? <Loader2 className="animate-spin h-8 w-8" />
              : isLive
              ? "Redeploy"
              : "Deploy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}