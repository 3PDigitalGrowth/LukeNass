import type { LeadFormRequest } from "@/lib/lead-forms"

export async function submitLeadForm(
  request: LeadFormRequest,
  data: Record<string, string>
) {
  const response = await fetch("/api/forms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
      data,
    }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.error || "Unable to send your request right now.")
  }

  return payload
}
