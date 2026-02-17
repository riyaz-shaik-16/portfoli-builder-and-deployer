import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Palette, LayoutTemplate, Sparkles } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

  const goToLogin = () => navigate("/login")

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ---------------- HERO ---------------- */}
      <section className="relative px-6 py-32 text-center">
        <div className="absolute inset-0 bg-linear-to-b from-indigo-600/20 via-transparent to-transparent blur-3xl" />

        <div className="relative max-w-4xl mx-auto space-y-8">

          {/* Logo + Brand */}
          <div className="flex flex-col items-center gap-4">
            <img src="/logo.jpg" alt="Craftly Logo" className="h-14 w-14 rounded-4xl" />
            <h1 className="text-3xl font-semibold tracking-tight">
              Craftly
            </h1>
          </div>

          <Badge className="px-4 py-1 text-sm">
            Built for Instant Deployment
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Build. Customize.  
            <br />
            <span className="bg-linear-to-r from-indigo-400 to-violet-500 bg-clip-text text-transparent">
              Deploy Instantly.
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select a template. Choose your theme. Add details. Click deploy.  
            We handle hosting and domain automatically.
          </p>

          <div className="pt-6">
            <Button size="lg" className="px-12" onClick={goToLogin}>
              Get Started
            </Button>
          </div>
        </div>
      </section>


      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="px-6 py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto text-center space-y-16">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              How Craftly Works
            </h2>
            <p className="text-muted-foreground mt-4">
              No setup. No confusion. Just results.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="rounded-2xl hover:shadow-lg transition">
              <CardContent className="p-8 space-y-4">
                <LayoutTemplate className="mx-auto" />
                <h3 className="font-semibold text-lg">Select Template</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a modern layout.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-lg transition">
              <CardContent className="p-8 space-y-4">
                <Palette className="mx-auto" />
                <h3 className="font-semibold text-lg">Choose Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Pick colors that match your style.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-lg transition">
              <CardContent className="p-8 space-y-4">
                <Sparkles className="mx-auto" />
                <h3 className="font-semibold text-lg">Add Details</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your information. No coding needed.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-lg transition">
              <CardContent className="p-8 space-y-4">
                <Rocket className="mx-auto" />
                <h3 className="font-semibold text-lg">Click Deploy</h3>
                <p className="text-sm text-muted-foreground">
                  We handle hosting and domain allocation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* ---------------- LIVE SECTION ---------------- */}
      <section className="px-6 py-28 text-center">
        <div className="max-w-4xl mx-auto space-y-10">

          <h2 className="text-3xl md:text-5xl font-bold">
            Your Website. Live. In Seconds.
          </h2>

          <div className="bg-muted rounded-2xl p-12 space-y-6 shadow-inner">
            <div className="text-sm text-muted-foreground">
              Example Live URL
            </div>

            <div className="text-xl font-mono text-indigo-400">
              yourname.craftly.site
            </div>

            <Button size="lg" className="px-12" onClick={goToLogin}>
              Deploy Now
            </Button>
          </div>
        </div>
      </section>


      {/* ---------------- FINAL CTA ---------------- */}
      <section className="px-6 py-28 text-center border-t">
        <div className="max-w-3xl mx-auto space-y-8">

          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Launch with Craftly?
          </h2>

          <p className="text-muted-foreground">
            Stop wasting time on setup. Start building instantly.
          </p>

          <Button size="lg" className="px-14" onClick={goToLogin}>
            Get Started Free
          </Button>
        </div>
      </section>

    </div>
  )
}