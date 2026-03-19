"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type LeadModalType =
  | "seller-report"
  | "seller-appraisal"
  | "seller-strategy"
  | "buyer-brief"
  | "buyer-guidance"
  | "partner-introduction"
  | "general-contact"
  | "team-contact"
  | "property-enquiry"
  | "inspection-request"
  | "offer-request"
  | "brochure-request"
  | "price-update"
  | "property-discussion"
  | "buyer-updates"

type FieldType = "text" | "email" | "tel" | "textarea" | "select"

type LeadField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
}

export type LeadModalRequest = {
  type: LeadModalType
  source?: string
  title?: string
  description?: string
  defaults?: Record<string, string>
  metadata?: Record<string, string>
  recipients?: string[]
}

type LeadModalConfig = {
  title: string
  description: string
  submitLabel: string
  successTitle: string
  successDescription: string
  recipients: string[]
  fields: LeadField[]
  buildSubject: (data: Record<string, string>, request: LeadModalRequest) => string
  buildIntro: (request: LeadModalRequest) => string[]
}

type LeadModalContextValue = {
  openLeadModal: (request: LeadModalRequest) => void
  closeLeadModal: () => void
}

const SALES_RECIPIENTS = ["luke@lukenass.com.au", "andrew@lukenass.com.au"]
const OFFICE_RECIPIENTS = ["luke@lukenass.com.au", "admin@lukenass.com.au"]

const LeadModalContext = createContext<LeadModalContextValue | null>(null)

const commonContactFields: LeadField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "you@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "08 9495 2226",
  },
]

const leadModalConfigs: Record<LeadModalType, LeadModalConfig> = {
  "seller-report": {
    title: "Request Your Free Property Report",
    description: "Tell us a little about your property and we will prepare the right next-step conversation.",
    submitLabel: "Prepare Property Report Request",
    successTitle: "Your property report request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street, Kelmscott",
      },
      {
        name: "timeframe",
        label: "Selling Timeframe",
        type: "select",
        options: ["Within 3 months", "3-6 months", "6-12 months", "Just exploring"],
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us about your property, timing, or any questions you have.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Free Property Report Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to request a free property report."],
  },
  "seller-appraisal": {
    title: "Request Your Confidential Appraisal",
    description: "Share your details and Luke or Andy will follow up personally.",
    submitLabel: "Prepare Appraisal Request",
    successTitle: "Your appraisal request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street, Kelmscott",
      },
      {
        name: "suburb",
        label: "Suburb",
        type: "text",
        placeholder: "Roleystone",
      },
      {
        name: "timeframe",
        label: "Selling Timeframe",
        type: "select",
        options: ["Within 3 months", "3-6 months", "6-12 months", "Just exploring"],
      },
      {
        name: "message",
        label: "What would you like help with?",
        type: "textarea",
        placeholder: "Tell us about your property, timing, or any concerns.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Confidential Appraisal Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to request a confidential appraisal."],
  },
  "seller-strategy": {
    title: "Request Your Strategy Session",
    description: "Tell us about your property and goals so we can tailor the conversation.",
    submitLabel: "Prepare Strategy Request",
    successTitle: "Your strategy request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property Address",
        type: "text",
        placeholder: "123 Main Street, Kelmscott",
      },
      {
        name: "timeframe",
        label: "Selling Timeframe",
        type: "select",
        options: ["Within 3 months", "3-6 months", "6-12 months", "Just exploring"],
      },
      {
        name: "message",
        label: "What would you like to discuss?",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your goals, communication preferences, or strategy questions.",
      },
      ...commonContactFields,
    ],
    buildSubject: (_, request) =>
      `${request.metadata?.Topic || request.metadata?.topic || "Strategy Session"} Request`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to request a strategy session."],
  },
  "buyer-brief": {
    title: "Tell Us What You Are Looking For",
    description: "Share your brief and we will follow up with tailored buyer guidance.",
    submitLabel: "Prepare Buyer Brief",
    successTitle: "Your buyer brief is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "preferredSuburbs",
        label: "Preferred Suburbs or Search Area",
        type: "text",
        placeholder: "Kelmscott, Roleystone, Bedfordale",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        placeholder: "$900,000 - $1.1M",
      },
      {
        name: "timeframe",
        label: "Buying Timeframe",
        type: "select",
        options: ["Flexible", "Within 3 months", "Within 6 months", "Within 12 months"],
      },
      {
        name: "message",
        label: "What matters most?",
        type: "textarea",
        placeholder: "Tell us about property type, must-haves, schools, or lifestyle goals.",
      },
      ...commonContactFields,
    ],
    buildSubject: (_, request) => `Buyer Brief Request${request.source ? ` - ${request.source}` : ""}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like help with my property search."],
  },
  "buyer-guidance": {
    title: "Explore This Buying Segment",
    description: "Tell us what appeals to you and we will help you compare suitable opportunities.",
    submitLabel: "Prepare Guidance Request",
    successTitle: "Your guidance request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "segment",
        label: "Area or Segment",
        type: "text",
        required: true,
        placeholder: "Affordable Family Living",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        placeholder: "$800,000 - $1M",
      },
      {
        name: "timeframe",
        label: "Buying Timeframe",
        type: "select",
        options: ["Flexible", "Within 3 months", "Within 6 months", "Within 12 months"],
      },
      {
        name: "message",
        label: "What are you hoping to find?",
        type: "textarea",
        placeholder: "Tell us what style of home, land size, or suburb mix you prefer.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Buyer Guidance Request: ${data.segment || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like buying guidance for a specific segment of the corridor."],
  },
  "partner-introduction": {
    title: "Request a Trusted Partner Introduction",
    description: "We will connect you with the right contact for your next step.",
    submitLabel: "Prepare Introduction Request",
    successTitle: "Your introduction request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: OFFICE_RECIPIENTS,
    fields: [
      {
        name: "serviceType",
        label: "Service Needed",
        type: "text",
        required: true,
        placeholder: "Mortgage Broker",
      },
      {
        name: "timeframe",
        label: "When do you need this?",
        type: "select",
        options: ["As soon as possible", "Within 1 week", "Within 1 month", "Just researching"],
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us what kind of support you need.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Partner Introduction Request: ${data.serviceType || "New enquiry"}`,
    buildIntro: () => ["Hi team,", "", "I would like an introduction to one of your trusted partners."],
  },
  "general-contact": {
    title: "Get in Touch",
    description: "Send us your enquiry and the team will follow up personally.",
    submitLabel: "Prepare Contact Request",
    successTitle: "Your contact request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: OFFICE_RECIPIENTS,
    fields: [
      {
        name: "topic",
        label: "Topic",
        type: "select",
        options: ["Buying", "Selling", "General Enquiry", "Office Visit", "Trusted Partners"],
      },
      {
        name: "message",
        label: "How can we help?",
        type: "textarea",
        required: true,
        placeholder: "Tell us what you need help with.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `General Contact Request: ${data.topic || "New enquiry"}`,
    buildIntro: () => ["Hi team,", "", "I would like to get in touch."],
  },
  "team-contact": {
    title: "Book a Call",
    description: "Tell us who you would like to speak with and what you need help with.",
    submitLabel: "Prepare Call Request",
    successTitle: "Your call request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: OFFICE_RECIPIENTS,
    fields: [
      {
        name: "teamMember",
        label: "Team Member",
        type: "text",
        required: true,
        placeholder: "Luke Nass",
      },
      {
        name: "message",
        label: "What would you like to discuss?",
        type: "textarea",
        required: true,
        placeholder: "Tell us what you would like help with.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Call Request: ${data.teamMember || "Team Member"}`,
    buildIntro: () => ["Hi team,", "", "I would like to book a call with one of your team members."],
  },
  "property-enquiry": {
    title: "Property Enquiry",
    description: "Ask a question about this property and we will follow up personally.",
    submitLabel: "Prepare Property Enquiry",
    successTitle: "Your property enquiry is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property",
        type: "text",
        required: true,
        placeholder: "Property address",
      },
      {
        name: "message",
        label: "Your Question",
        type: "textarea",
        required: true,
        placeholder: "Tell us what you would like to know about this property.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Property Enquiry: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like more information about a property."],
  },
  "inspection-request": {
    title: "Book an Inspection",
    description: "Let us know your preferred timing and we will follow up with the next steps.",
    submitLabel: "Prepare Inspection Request",
    successTitle: "Your inspection request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property",
        type: "text",
        required: true,
        placeholder: "Property address",
      },
      {
        name: "preferredDate",
        label: "Preferred Date",
        type: "text",
        placeholder: "Saturday morning",
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us your preferred time or any questions before the inspection.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Inspection Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to book an inspection."],
  },
  "offer-request": {
    title: "Make an Offer",
    description: "Share the basics and we will guide you through the next step.",
    submitLabel: "Prepare Offer Request",
    successTitle: "Your offer request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property",
        type: "text",
        required: true,
        placeholder: "Property address",
      },
      {
        name: "offerRange",
        label: "Offer Range",
        type: "text",
        placeholder: "$950,000 - $980,000",
      },
      {
        name: "conditions",
        label: "Conditions or Notes",
        type: "textarea",
        placeholder: "Tell us about finance, settlement, or any conditions you have in mind.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Offer Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to discuss making an offer on a property."],
  },
  "brochure-request": {
    title: "Download Brochure",
    description: "Request the brochure and we will send it through with any relevant next steps.",
    submitLabel: "Prepare Brochure Request",
    successTitle: "Your brochure request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property",
        type: "text",
        required: true,
        placeholder: "Property address",
      },
      {
        name: "message",
        label: "Anything else you would like included?",
        type: "textarea",
        placeholder: "Optional",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Brochure Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to receive the brochure for a property."],
  },
  "price-update": {
    title: "Get Your Price Update",
    description: "Tell us about your home and we will follow up with a fresh market conversation.",
    submitLabel: "Prepare Price Update Request",
    successTitle: "Your price update request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property Address",
        type: "text",
        required: true,
        placeholder: "123 Main Street, Roleystone",
      },
      {
        name: "timeframe",
        label: "Selling Timeframe",
        type: "select",
        options: ["Within 3 months", "3-6 months", "6-12 months", "Just exploring"],
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us about updates to the property or what you want to achieve.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Price Update Request: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like an updated price conversation for my property."],
  },
  "property-discussion": {
    title: "Discuss This Sale",
    description: "Ask about this result and the team will follow up with context that is relevant to your property.",
    submitLabel: "Prepare Discussion Request",
    successTitle: "Your discussion request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "propertyAddress",
        label: "Property Reference",
        type: "text",
        required: true,
        placeholder: "42 Hilltop Drive, Roleystone",
      },
      {
        name: "message",
        label: "What would you like to discuss?",
        type: "textarea",
        required: true,
        placeholder: "Tell us what you would like to understand about this sale.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Discuss This Sale: ${data.propertyAddress || "New enquiry"}`,
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to discuss a recent sale."],
  },
  "buyer-updates": {
    title: "Get Buyer Updates",
    description: "Tell us what you are looking for and we will tailor future updates to your brief.",
    submitLabel: "Prepare Buyer Updates Request",
    successTitle: "Your buyer updates request is ready",
    successDescription: "Your email draft has been prepared for the team.",
    recipients: SALES_RECIPIENTS,
    fields: [
      {
        name: "preferredSuburbs",
        label: "Preferred Suburbs",
        type: "text",
        placeholder: "Kelmscott, Roleystone, Bedfordale",
      },
      {
        name: "budget",
        label: "Budget",
        type: "text",
        placeholder: "$800,000 - $1M",
      },
      {
        name: "timeframe",
        label: "Buying Timeframe",
        type: "select",
        options: ["Flexible", "Within 3 months", "Within 6 months", "Within 12 months"],
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us the kind of property you are hoping to find.",
      },
      ...commonContactFields,
    ],
    buildSubject: () => "Buyer Updates Request",
    buildIntro: () => ["Hi Luke and Andy,", "", "I would like to receive buyer updates tailored to my search."],
  },
}

function buildMailtoBody(
  config: LeadModalConfig,
  request: LeadModalRequest,
  data: Record<string, string>
) {
  const lines = [...config.buildIntro(request), ""]

  if (request.source) {
    lines.push(`CTA Source: ${request.source}`)
  }

  if (request.metadata) {
    Object.entries(request.metadata).forEach(([key, value]) => {
      if (value) {
        lines.push(`${key}: ${value}`)
      }
    })
  }

  lines.push("")

  config.fields.forEach((field) => {
    const value = data[field.name]
    if (value) {
      lines.push(`${field.label}: ${value}`)
    }
  })

  return lines.join("\n")
}

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
  const [formData, setFormData] = useState<Record<string, string>>({})

  const config = useMemo(() => (request ? leadModalConfigs[request.type] : null), [request])

  useEffect(() => {
    if (!request || !config) return

    const initialData: Record<string, string> = {}

    config.fields.forEach((field) => {
      initialData[field.name] = request.defaults?.[field.name] ?? ""
    })

    setFormData(initialData)
    setSubmitted(false)
  }, [request, config])

  const openLeadModal = (nextRequest: LeadModalRequest) => {
    setRequest(nextRequest)
    setIsOpen(true)
  }

  const closeLeadModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!request || !config) return

    const recipients = request.recipients?.length ? request.recipients : config.recipients
    const subject = config.buildSubject(formData, request)
    const body = buildMailtoBody(config, request, formData)

    window.location.href = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
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

                <div className="rounded-lg bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                  This currently prepares an email request. We can switch the same form flow over to Resend later.
                </div>

                <Button type="submit" className="w-full">
                  {config.submitLabel}
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
