export type LeadFormType =
  | "seller-report"
  | "seller-appraisal"
  | "seller-strategy"
  | "strategy-session"
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
  | "market-report-download"

export type FieldType = "text" | "email" | "tel" | "textarea" | "select"

export type LeadField = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
}

export type LeadFormRequest = {
  type: LeadFormType
  source?: string
  title?: string
  description?: string
  defaults?: Record<string, string>
  metadata?: Record<string, string>
  recipients?: string[]
}

export type LeadFormConfig = {
  title: string
  description: string
  submitLabel: string
  successTitle: string
  successDescription: string
  fields: LeadField[]
  buildSubject: (data: Record<string, string>, request: LeadFormRequest) => string
  buildIntro: (request: LeadFormRequest) => string[]
}

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

export const leadFormConfigs: Record<LeadFormType, LeadFormConfig> = {
  "seller-report": {
    title: "Request Your Free Property Report",
    description: "Tell us a little about your property and we will prepare the right next-step conversation.",
    submitLabel: "Send Property Report Request",
    successTitle: "Your property report request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to request a free property report."],
  },
  "seller-appraisal": {
    title: "Request Your Confidential Appraisal",
    description: "Share your details and Luke or Andy will follow up personally.",
    submitLabel: "Send Appraisal Request",
    successTitle: "Your appraisal request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to request a confidential appraisal."],
  },
  "seller-strategy": {
    title: "Request Your Strategy Session",
    description: "Tell us about your property and goals so we can tailor the conversation.",
    submitLabel: "Send Strategy Request",
    successTitle: "Your strategy request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to request a strategy session."],
  },
  "strategy-session": {
    title: "Request Your Confidential Strategy Session",
    description: "Share your contact details and tell us whether your enquiry relates to buying, selling, or renting.",
    submitLabel: "Send Strategy Session Request",
    successTitle: "Your strategy session request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
    fields: [
      {
        name: "reason",
        label: "Reason",
        type: "select",
        required: true,
        options: ["Buying", "Selling", "Renting"],
      },
      {
        name: "message",
        label: "Anything helpful to know?",
        type: "textarea",
        placeholder: "Tell us a little about what you need help with.",
      },
      ...commonContactFields,
    ],
    buildSubject: (data) => `Confidential Strategy Session Request: ${data.reason || "New enquiry"}`,
    buildIntro: () => ["I would like to request a confidential strategy session."],
  },
  "buyer-brief": {
    title: "Tell Us What You Are Looking For",
    description: "Share your brief and we will follow up with tailored buyer guidance.",
    submitLabel: "Send Buyer Brief",
    successTitle: "Your buyer brief has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like help with my property search."],
  },
  "buyer-guidance": {
    title: "Explore This Buying Segment",
    description: "Tell us what appeals to you and we will help you compare suitable opportunities.",
    submitLabel: "Send Guidance Request",
    successTitle: "Your guidance request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like buying guidance for a specific segment of the corridor."],
  },
  "partner-introduction": {
    title: "Request a Trusted Partner Introduction",
    description: "We will connect you with the right contact for your next step.",
    submitLabel: "Send Introduction Request",
    successTitle: "Your introduction request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like an introduction to one of your trusted partners."],
  },
  "general-contact": {
    title: "Get in Touch",
    description: "Send us your enquiry and the team will follow up personally.",
    submitLabel: "Send Enquiry",
    successTitle: "Your enquiry has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to get in touch."],
  },
  "team-contact": {
    title: "Book a Call",
    description: "Tell us who you would like to speak with and what you need help with.",
    submitLabel: "Send Call Request",
    successTitle: "Your call request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to book a call with one of your team members."],
  },
  "property-enquiry": {
    title: "Property Enquiry",
    description: "Ask a question about this property and we will follow up personally.",
    submitLabel: "Send Property Enquiry",
    successTitle: "Your property enquiry has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like more information about a property."],
  },
  "inspection-request": {
    title: "Book an Inspection",
    description: "Let us know your preferred timing and we will follow up with the next steps.",
    submitLabel: "Send Inspection Request",
    successTitle: "Your inspection request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to book an inspection."],
  },
  "offer-request": {
    title: "Make an Offer",
    description: "Share the basics and we will guide you through the next step.",
    submitLabel: "Send Offer Request",
    successTitle: "Your offer request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to discuss making an offer on a property."],
  },
  "brochure-request": {
    title: "Download Brochure",
    description: "Request the brochure and we will send it through with any relevant next steps.",
    submitLabel: "Send Brochure Request",
    successTitle: "Your brochure request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to receive the brochure for a property."],
  },
  "price-update": {
    title: "Get Your Price Update",
    description: "Tell us about your home and we will follow up with a fresh market conversation.",
    submitLabel: "Send Price Update Request",
    successTitle: "Your price update request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like an updated price conversation for my property."],
  },
  "property-discussion": {
    title: "Discuss This Sale",
    description: "Ask about this result and the team will follow up with context that is relevant to your property.",
    submitLabel: "Send Discussion Request",
    successTitle: "Your discussion request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to discuss a recent sale."],
  },
  "buyer-updates": {
    title: "Get Buyer Updates",
    description: "Tell us what you are looking for and we will tailor future updates to your brief.",
    submitLabel: "Send Buyer Updates Request",
    successTitle: "Your buyer updates request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
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
    buildIntro: () => ["I would like to receive buyer updates tailored to my search."],
  },
  "market-report-download": {
    title: "Download the Perth Southeast Corridor Outlook",
    description: "Enter your email and we will send you a confirmation while your download starts.",
    submitLabel: "Send Report Request",
    successTitle: "Your report request has been sent",
    successDescription: "Check your inbox for a confirmation email from the team.",
    fields: [
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
    ],
    buildSubject: () => "Perth Southeast Corridor Outlook Download Request",
    buildIntro: () => ["I would like to download the Perth Southeast Corridor Outlook report."],
  },
}

export function buildLeadFormText(
  config: LeadFormConfig,
  request: LeadFormRequest,
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

  if (request.source || request.metadata) {
    lines.push("")
  }

  config.fields.forEach((field) => {
    const value = data[field.name]
    if (value) {
      lines.push(`${field.label}: ${value}`)
    }
  })

  return lines.join("\n")
}
