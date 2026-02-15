"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle, FileX } from "lucide-react";

export default function PreviewPage() {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewAvailable, setPreviewAvailable] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await api.post("/preview");

        if (!data?.previewAvailable) {
          setPreviewAvailable(false);
          setError(data?.message || "Preview not available yet.");
          return;
        }

        setPreviewAvailable(true);
        setHtml(data?.html);
      } catch (err) {
        setError(
          err.response?.data?.message || "Something went wrong while loading preview."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, []);

  return (
    <div className="p-6 w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Preview</CardTitle>
        </CardHeader>

        <CardContent className="min-h-125">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-112.5 gap-3 text-muted-foreground">
              <Loader2 className="animate-spin h-8 w-8" />
              <p>Generating your preview...</p>
            </div>
          )}

          {/* Preview Not Available */}
          {!loading && !previewAvailable && !error && (
            <div className="flex flex-col items-center justify-center h-112.5 gap-3 text-muted-foreground">
              <FileX className="h-10 w-10" />
              <p>Your portfolio is not ready for preview yet.</p>
              <p className="text-sm">
                Complete template selection and required details first.
              </p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center h-112.5 gap-3 text-red-500">
              <AlertCircle className="h-10 w-10" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Success */}
          {!loading && previewAvailable && !error && (
            <iframe
              srcDoc={html}
              title="Portfolio Preview"
              className="w-full h-175 border rounded-md"
            />
          )}

        </CardContent>
      </Card>
    </div>
  );
}