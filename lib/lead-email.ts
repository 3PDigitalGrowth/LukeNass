import { buildLeadFormText, leadFormConfigs, type LeadFormRequest, type LeadFormType } from "@/lib/lead-forms"

export const AGENCY_NOTIFICATION_RECIPIENTS = [
  "luke@lukenass.com.au",
  "andrew@lukenass.com.au",
  "admin@lukenass.com.au",
  "alex@3pdigital.com.au",
]

export const OFFICE_PHONE = "08 9495 2226"
export const LUKE_PHONE = "0418 928 082"
export const ANDREW_PHONE = "0419 600 504"
export const OFFICE_EMAIL = "admin@lukenass.com.au"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function formatKeyLabel(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

function getSiteUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://lukenass.com.au"

  return candidate.startsWith("http") ? candidate : `https://${candidate}`
}

export function getLeadEmailSettings() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL || "Luke Nass Real Estate <hello@lukenass.com.au>",
    siteUrl: getSiteUrl(),
  }
}

function buildSubmittedRows(type: LeadFormType, request: LeadFormRequest, data: Record<string, string>) {
  const config = leadFormConfigs[type]
  const knownLabels = new Map(config.fields.map((field) => [field.name, field.label]))
  const rows: Array<{ label: string; value: string }> = []

  if (request.source) {
    rows.push({ label: "Form Source", value: request.source })
  }

  if (request.metadata) {
    Object.entries(request.metadata).forEach(([key, value]) => {
      if (value) {
        rows.push({ label: formatKeyLabel(key), value })
      }
    })
  }

  Object.entries(data).forEach(([key, value]) => {
    if (!value) return
    rows.push({
      label: knownLabels.get(key) || formatKeyLabel(key),
      value,
    })
  })

  return rows
}

function renderRows(rows: Array<{ label: string; value: string }>) {
  return rows
    .map(
      ({ label, value }) => `
        <tr>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e7ddd0; width: 34%; font-weight: 600; color: #43302b; vertical-align: top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding: 12px 14px; border-bottom: 1px solid #e7ddd0; color: #5a463f; vertical-align: top; white-space: pre-wrap;">
            ${escapeHtml(value)}
          </td>
        </tr>
      `
    )
    .join("")
}

export function buildAgencyNotificationEmail(type: LeadFormType, request: LeadFormRequest, data: Record<string, string>) {
  const config = leadFormConfigs[type]
  const rows = buildSubmittedRows(type, request, data)
  const submittedAt = new Date().toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  })
  const summaryText = buildLeadFormText(config, request, data)
  const contactName = data.name || "New website lead"
  const contactEmail = data.email || "Not provided"
  const contactPhone = data.phone || "Not provided"
  const followUpText =
    type === "market-report-download"
      ? "Please email this user directly with the requested market outlook and offer RP Data guidance until logins are available."
      : "Reply directly to this email or contact the team using the details below."

  return {
    subject: config.buildSubject(data, request),
    text: `New website enquiry\n\n${summaryText}`,
    html: `
      <div style="margin: 0; padding: 32px 16px; background: #f6f1ea; font-family: Arial, Helvetica, sans-serif; color: #43302b;">
        <div style="max-width: 760px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7ddd0;">
          <div style="padding: 28px 32px; background: linear-gradient(135deg, #43302b 0%, #6b4f45 100%); color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.8;">New Website Form Submission</div>
            <h1 style="margin: 10px 0 8px; font-size: 30px; line-height: 1.2;">${escapeHtml(request.title || config.title)}</h1>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; opacity: 0.9;">Submitted ${escapeHtml(submittedAt)}</p>
          </div>

          <div style="padding: 28px 32px 0;">
            <div style="background: #f8f4ee; border: 1px solid #eadfce; border-radius: 16px; padding: 20px;">
              <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a6e63; margin-bottom: 12px;">Primary Contact</div>
              <p style="margin: 0 0 6px; font-size: 20px; font-weight: 700;">${escapeHtml(contactName)}</p>
              <p style="margin: 0 0 4px; font-size: 15px;">Email: ${escapeHtml(contactEmail)}</p>
              <p style="margin: 0; font-size: 15px;">Phone: ${escapeHtml(contactPhone)}</p>
            </div>
          </div>

          <div style="padding: 24px 32px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #e7ddd0; border-radius: 14px; overflow: hidden;">
              <tbody>
                ${renderRows(rows)}
              </tbody>
            </table>
          </div>

          <div style="padding: 24px 32px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: separate; border-spacing: 12px 0;">
              <tr>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">3000+</div>
                  <div style="font-size: 13px; color: #6b5a54;">Happy Buyers &amp; Sellers</div>
                </td>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">65+</div>
                  <div style="font-size: 13px; color: #6b5a54;">Years Combined Experience</div>
                </td>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">1996</div>
                  <div style="font-size: 13px; color: #6b5a54;">Luke Nass Real Estate Brand</div>
                </td>
              </tr>
            </table>
          </div>

          <div style="padding: 24px 32px 32px;">
            <div style="background: #43302b; color: #ffffff; border-radius: 16px; padding: 20px;">
              <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.8; margin-bottom: 10px;">Follow Up</div>
              <p style="margin: 0 0 10px; font-size: 15px; line-height: 1.6;">${escapeHtml(followUpText)}</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.8;">
                Office: ${escapeHtml(OFFICE_PHONE)}<br />
                Luke Nass: ${escapeHtml(LUKE_PHONE)}<br />
                Andrew Hill: ${escapeHtml(ANDREW_PHONE)}<br />
                ${escapeHtml(OFFICE_EMAIL)}
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  }
}

export function buildConfirmationEmail(type: LeadFormType, request: LeadFormRequest, data: Record<string, string>) {
  const config = leadFormConfigs[type]
  const siteUrl = getSiteUrl()
  const contactName = data.name || "there"
  const enquirySubject = config.buildSubject(data, request)
  const summaryText = buildLeadFormText(config, request, data)

  return {
    subject: `We received your enquiry: ${request.title || config.title}`,
    text: `Hi ${contactName},\n\nThank you for contacting Luke Nass Real Estate. We have received your enquiry and one of the team will follow up shortly.\n\nReference: ${enquirySubject}\n\nOffice: ${OFFICE_PHONE}\nLuke Nass: ${LUKE_PHONE}\nAndrew Hill: ${ANDREW_PHONE}\nEmail: ${OFFICE_EMAIL}\n\nYour submitted details:\n${summaryText}`,
    html: `
      <div style="margin: 0; padding: 32px 16px; background: #f6f1ea; font-family: Arial, Helvetica, sans-serif; color: #43302b;">
        <div style="max-width: 760px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7ddd0;">
          <div style="padding: 28px 32px; background: linear-gradient(135deg, #355d4f 0%, #4e7c6c 100%); color: #ffffff;">
            <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.82;">Luke Nass Real Estate</div>
            <h1 style="margin: 10px 0 10px; font-size: 30px; line-height: 1.2;">Thanks for reaching out, ${escapeHtml(contactName)}.</h1>
            <p style="margin: 0; font-size: 16px; line-height: 1.7; opacity: 0.92;">
              We have received your enquiry and one of the team will follow up personally as soon as possible.
            </p>
          </div>

          <div style="padding: 28px 32px 0;">
            <div style="background: #f8f4ee; border: 1px solid #eadfce; border-radius: 16px; padding: 20px;">
              <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #8a6e63; margin-bottom: 10px;">Enquiry Received</div>
              <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700;">${escapeHtml(request.title || config.title)}</p>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5a463f;">Reference: ${escapeHtml(enquirySubject)}</p>
            </div>
          </div>

          <div style="padding: 24px 32px 0;">
            <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.7; color: #5a463f;">
              You contacted a boutique agency trusted across Perth's southeast corridor for strategy-led campaigns,
              clear communication, and hands-on guidance from start to finish.
            </p>
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: separate; border-spacing: 12px 0;">
              <tr>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">3000+</div>
                  <div style="font-size: 13px; color: #6b5a54;">Happy Buyers &amp; Sellers</div>
                </td>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">65+</div>
                  <div style="font-size: 13px; color: #6b5a54;">Years Combined Experience</div>
                </td>
                <td style="background: #f5efe6; border-radius: 14px; padding: 16px; text-align: center;">
                  <div style="font-size: 24px; font-weight: 700; color: #43302b;">Kelmscott</div>
                  <div style="font-size: 13px; color: #6b5a54;">Local Office &amp; Team Support</div>
                </td>
              </tr>
            </table>
          </div>

          <div style="padding: 24px 32px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" style="width: 100%; border-collapse: collapse; border: 1px solid #e7ddd0; border-radius: 14px; overflow: hidden;">
              <tbody>
                ${renderRows(buildSubmittedRows(type, request, data))}
              </tbody>
            </table>
          </div>

          <div style="padding: 24px 32px 32px;">
            <div style="background: #43302b; color: #ffffff; border-radius: 16px; padding: 20px; margin-bottom: 16px;">
              <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.8; margin-bottom: 10px;">Need Us Sooner?</div>
              <p style="margin: 0; font-size: 14px; line-height: 1.9;">
                Office: ${escapeHtml(OFFICE_PHONE)}<br />
                Luke Nass: ${escapeHtml(LUKE_PHONE)}<br />
                Andrew Hill: ${escapeHtml(ANDREW_PHONE)}<br />
                Email: ${escapeHtml(OFFICE_EMAIL)}
              </p>
            </div>
            <a
              href="${escapeHtml(siteUrl)}"
              style="display: inline-block; padding: 14px 22px; border-radius: 999px; background: #355d4f; color: #ffffff; text-decoration: none; font-weight: 600;"
            >
              Visit Luke Nass Real Estate
            </a>
          </div>
        </div>
      </div>
    `,
  }
}
