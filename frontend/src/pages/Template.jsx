"use client";

import usePortfolioStore from "@/store/portfolio.store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";

const templates = [
  {
    id: "modern",
    name: "Modern Minimal",
    description: "Clean, professional, safe choice for developers.",
  },
  {
    id: "dark",
    name: "Dark Professional",
    description: "Bold dark layout for serious engineers.",
  },
  {
    id: "saas",
    name: "SaaS Product",
    description: "Looks like a startup landing page.",
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Visual-heavy layout for designers.",
  },
  {
    id: "ai",
    name: "AI Futuristic",
    description: "Neon accents and tech-forward vibe.",
  },
  {
    id: "resume",
    name: "Resume Classic",
    description: "Traditional structured resume layout.",
  },
  {
    id: "narrative",
    name: "One Page Story",
    description: "Scroll-based storytelling portfolio.",
  },
  {
    id: "corporate",
    name: "Corporate Executive",
    description: "Formal and leadership-focused.",
  },
  {
    id: "terminal",
    name: "Developer Terminal",
    description: "Hacker-style terminal aesthetic.",
  },
  {
    id: "luxury",
    name: "Luxury Personal Brand",
    description: "Elegant editorial premium layout.",
  },
];

export default function TemplatesPage() {
  const { template, setTemplate } = usePortfolioStore();
  const [loading, setLoading] = useState(false);


  const handleUpdateTemplate = async () => {
    try {
      if (!template) {
        toast.warning("Select a template!", { position: "top-right" });
        return;
      }
      setLoading(true);
      const { data } = await api.post("/portfolio/update-template", {
        template,
      });
      toast.success("Template updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error updating theme!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const getTempalte = async ()=>{
      try {
        const {data} = await api.get("/portfolio/get-template");
        setTemplate(data?.template);
      } catch (error) {
        console.log("Error: ", error);
        toast.error("Something went wrong!",{position:"top-right"});
      }
    }

    getTempalte();
  },[])

  console.log("Template in store: ", template);

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Choose a Template</h1>
        <p className="text-muted-foreground">
          Select a design style for your portfolio.
        </p>
      </div>

      {template && (
        <Button onClick={handleUpdateTemplate}>
          {loading ? "Updating!" : "Update Template"}
        </Button>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((item) => (
          <Card
            key={item.id}
            className={`transition-all ${
              template === item.id ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{item.name}</CardTitle>
                {template === item.id && <Badge>Selected</Badge>}
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                variant={template === item.id ? "secondary" : "default"}
                onClick={() => setTemplate(item.id)}
              >
                {template === item.id
                  ? "Currently Selected"
                  : "Select Template"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
