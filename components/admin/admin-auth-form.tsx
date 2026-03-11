'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminAuthForm() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) {
      const data = (await response.json()) as { error?: string }
      setError(data.error || "Unable to sign in.")
      setIsSubmitting(false)
      return
    }

    router.refresh()
  }

  return (
    <div className="max-w-md mx-auto rounded-2xl border border-border/50 bg-card p-8 shadow-xl">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3">
        Admin Access
      </p>
      <h1 className="font-serif text-3xl tracking-tight text-foreground mb-3">
        Luke Nass Admin
      </h1>
      <p className="text-muted-foreground mb-6">
        Enter the password to manage sales and marketing materials.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Unlock Admin"}
        </Button>
      </form>
    </div>
  )
}
