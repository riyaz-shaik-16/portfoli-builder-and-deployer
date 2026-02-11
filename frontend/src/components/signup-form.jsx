import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import api from "@/services/api"
import useAuthStore from "@/store/auth.store"

export function SignupForm({ className, ...props }) {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  // UI-only (for now)
  const [fullName, setFullName] = useState("")

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const res = await api.post("/auth/register", {
        username,
        email,
        password,
        fullName
      })

      localStorage.setItem("token", res.data.token)
      setUser(res.data.user)

      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>

        {/* Full Name (UI-only for now) */}
        <Field>
          <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
          <Input
            id="full-name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-background"
          />
          <FieldDescription>
            This will be shown on your portfolio.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="riyaz-dev"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="bg-background"
          />
          <FieldDescription>
            This will be your public portfolio URL.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-background"
          />
        </Field>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator />

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
