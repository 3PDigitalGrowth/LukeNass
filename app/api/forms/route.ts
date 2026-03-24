import { NextRequest, NextResponse } from "next/server"

import {
  AGENCY_NOTIFICATION_RECIPIENTS,
  buildAgencyNotificationEmail,
  buildConfirmationEmail,
  getLeadEmailSettings,
  OFFICE_EMAIL,
} from "@/lib/lead-email"
import { leadFormConfigs, type LeadFormRequest, type LeadFormType } from "@/lib/lead-forms"

type FormSubmissionPayload = {
  type?: string
  source?: string
  title?: string
  description?: string
  metadata?: Record<string, unknown>
  data?: Record<string, unknown>
}

class ResendApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function isLeadFormType(value: string): value is LeadFormType {
  return value in leadFormConfigs
}

function sanitizeStringMap(value: Record<string, unknown> | undefined) {
  const sanitized: Record<string, string> = {}

  if (!value) {
    return sanitized
  }

  Object.entries(value).forEach(([key, entry]) => {
    if (typeof entry === "string") {
      sanitized[key] = entry.trim()
      return
    }

    if (entry === null || entry === undefined) {
      return
    }

    sanitized[key] = String(entry).trim()
  })

  return sanitized
}

async function sendResendEmail(options: {
  apiKey: string
  from: string
  to: string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new ResendApiError(response.status, detail)
  }
}

function buildFriendlyResendError(error: ResendApiError) {
  const detail = error.message

  if (
    error.status === 403 &&
    detail.includes("verify a domain") &&
    detail.includes("change the `from` address")
  ) {
    return "Email sending is blocked because Resend is still using an unverified sender. Verify the sending domain in Resend and set RESEND_FROM_EMAIL to a verified lukenass.com.au address."
  }

  if (error.status === 403 && detail.includes("testing emails")) {
    return "Email sending is still in Resend testing mode. Update RESEND_FROM_EMAIL to a verified lukenass.com.au sender and redeploy."
  }

  return `Resend request failed (${error.status}): ${detail}`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as FormSubmissionPayload

    if (!body.type || !isLeadFormType(body.type)) {
      return NextResponse.json({ error: "Invalid form type." }, { status: 400 })
    }

    const formRequest: LeadFormRequest = {
      type: body.type,
      source: typeof body.source === "string" ? body.source : undefined,
      title: typeof body.title === "string" ? body.title : undefined,
      description: typeof body.description === "string" ? body.description : undefined,
      metadata: sanitizeStringMap(body.metadata),
    }

    const formData = sanitizeStringMap(body.data)
    const email = formData.email

    if (!email) {
      return NextResponse.json({ error: "Email address is required." }, { status: 400 })
    }

    const { apiKey, fromEmail } = getLeadEmailSettings()

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY is not set. Add it to local .env and your production environment variables before using form submissions.",
        },
        { status: 500 }
      )
    }

    const agencyEmail = buildAgencyNotificationEmail(body.type, formRequest, formData)
    const confirmationEmail = buildConfirmationEmail(body.type, formRequest, formData)

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: AGENCY_NOTIFICATION_RECIPIENTS,
      subject: agencyEmail.subject,
      html: agencyEmail.html,
      text: agencyEmail.text,
      replyTo: email,
    })

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: [email],
      subject: confirmationEmail.subject,
      html: confirmationEmail.html,
      text: confirmationEmail.text,
      replyTo: OFFICE_EMAIL,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message =
      error instanceof ResendApiError
        ? buildFriendlyResendError(error)
        : error instanceof Error
          ? error.message
          : "Unable to send form email."

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
