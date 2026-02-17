import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/components/signup-form";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <img
                src="/logo.png"
                alt="Craftly Logo"
                className="size-10 rounded-4xl object-contain"
              />
            </div>
            Craftly
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="/photo.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
