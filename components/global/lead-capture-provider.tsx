"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { leadFormConfigs, type LeadField, type LeadFormRequest } from "@/lib/lead-forms"
import { submitLeadForm } from "@/lib/submit-lead-form"

export type LeadModalRequest = LeadFormRequest

type LeadModalContextValue = {
  openLeadModal: (request: LeadModalRequest) => void
  closeLeadModal: () => void
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

function renderField(
  field: LeadField,
  value: string,
  onChange: (name: string, value: string) => void
) {
  if (field.type === "textarea") {
    return (
      <Textarea
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        className="min-h-[120px]"
      />
    )
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        required={field.required}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }

  return (
    <Input
      type={field.type}
      value={value}
      onChange={(event) => onChange(field.name, event.target.value)}
      placeholder={field.placeholder}
      required={field.required}
    />
  )
}

export function LeadCaptureProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<LeadModalRequest | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, string>>({})

  const config = useMemo(() => (request ? leadFormConfigs[request.type] : null), [request])

  useEffect(() => {
    if (!request || !config) return

    const initialData: Record<string, string> = {}

    config.fields.forEach((field) => {
      initialData[field.name] = request.defaults?.[field.name] ?? ""
    })

    setFormData(initialData)
    setSubmitted(false)
    setIsSubmitting(false)
    setErrorMessage(null)
  }, [request, config])

  const openLeadModal = (nextRequest: LeadModalRequest) => {
    setRequest(nextRequest)
    setIsOpen(true)
  }

  const closeLeadModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!request || !config) return

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await submitLeadForm(request, formData)
      setSubmitted(true)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your request right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleValueChange = (name: string, value: string) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  return (
    <LeadModalContext.Provider value={{ openLeadModal, closeLeadModal }}>
      {children}
      {config && request && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl tracking-tight">
                {request.title || config.title}
              </DialogTitle>
              <DialogDescription>
                {request.description || config.description}
              </DialogDescription>
            </DialogHeader>

            {request.metadata && Object.keys(request.metadata).length > 0 && !submitted && (
              <div className="rounded-xl border border-border/50 bg-muted/40 p-4 space-y-1">
                {Object.entries(request.metadata).map(([key, value]) => (
                  <p key={key} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{key}:</span> {value}
                  </p>
                ))}
              </div>
            )}

            {submitted ? (
              <div className="py-6">
                <h3 className="font-serif text-xl text-foreground mb-2">{config.successTitle}</h3>
                <p className="text-muted-foreground mb-6">{config.successDescription}</p>
                <Button onClick={closeLeadModal} className="w-full">
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {config.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{field.label}</label>
                    {renderField(field, formData[field.name] || "", handleValueChange)}
                  </div>
                ))}

                {errorMessage && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {errorMessage}
                  </div>
                )}

                <div className="rounded-lg bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                  You will receive a confirmation email and the Luke Nass team will receive your full enquiry details.
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : config.submitLabel}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      )}
    </LeadModalContext.Provider>
  )
}

export function useLeadModal() {
  const context = useContext(LeadModalContext)

  if (!context) {
    throw new Error("useLeadModal must be used within LeadCaptureProvider")
  }

  return context
}
