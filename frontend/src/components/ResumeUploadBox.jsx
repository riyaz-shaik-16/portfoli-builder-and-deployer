import { useRef, useState } from "react";
import { RiUploadCloudLine, RiCloseLine } from "@remixicon/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import usePortfolioStore from "@/store/portfolio.store";

export default function ResumeUploadBox() {
  const inputRef = useRef(null);
  const maxSizeMB = 5;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const {setPortfolio} = usePortfolioStore();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.warning("Only PDF files are allowed", { position: "top-right" });
      return;
    }

    if (selected.size > maxSizeMB * 1024 * 1024) {
      toast.warning(`File must be under ${maxSizeMB}MB`, {
        position: "top-right",
      });
      return;
    }

    setFile(selected);
  };


  const handleResumeUpload = async () => {
    try {
      setLoading(true);
      if (!file) {
        toast.warning("Upload File!!", { position: "top-right" });
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await api.post("/portfolio/get-details", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPortfolio({data:data?.details});
    } catch (error) {
      toast.error("Data extraction isn't available right now! Please fill details manually! :)", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Upload Resume (pdf)</label>

      <div
        onClick={!file ? handleClick : undefined}
        className="mt-3 relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-primary transition"
      >
        {!file ? (
          <>
            <RiUploadCloudLine className="text-muted-foreground size-6 mb-2" />
            <p className="text-sm text-muted-foreground">Click to upload PDF</p>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <span className="text-sm truncate">{file.name}</span>

            <button
              type="button"
              onClick={handleRemove}
              className="text-destructive hover:opacity-70"
            >
              <RiCloseLine size={18} />
            </button>
          </div>
        )}
      </div>

      <form>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />
        <Button
          className={`${!file ? "cursor-not-allowed" : "cursor-pointer"} w-35`}
          variant={`${!file ? "outline" : "default"}`}
          onClick={handleResumeUpload}
        >
          {loading ? (
            <Loader2 className="animate-spin h-8 w-8" />
          ) : (
            "Extract Details!"
          )}
        </Button>
      </form>
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>
    </div>
  );
}
