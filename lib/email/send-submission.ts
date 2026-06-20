import { Resend } from "resend"
import { getFromAddress, getNotificationRecipients } from "./recipients"

export type SubmissionPayload = {
  name: string
  email: string
  phone: string | null
  business: string | null
  message: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function buildHtml(data: SubmissionPayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#111;vertical-align:top;white-space:nowrap;">${label}</td>
      <td style="padding:8px 12px;color:#333;">${value}</td>
    </tr>`

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="color:#111;margin-bottom:4px;">New contact form submission</h2>
    <p style="color:#666;margin-top:0;">Someone just reached out through your website.</p>
    <table style="border-collapse:collapse;width:100%;border:1px solid #eee;border-radius:8px;overflow:hidden;">
      ${row("Name", escapeHtml(data.name))}
      ${row("Email", escapeHtml(data.email))}
      ${row("Phone", data.phone ? escapeHtml(data.phone) : "—")}
      ${row("Business", data.business ? escapeHtml(data.business) : "—")}
      ${row("Message", escapeHtml(data.message).replace(/\n/g, "<br/>"))}
    </table>
  </div>`
}

function buildText(data: SubmissionPayload): string {
  return [
    "New contact form submission",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone ?? "—"}`,
    `Business: ${data.business ?? "—"}`,
    "",
    "Message:",
    data.message,
  ].join("\n")
}

// Sends the submission to all configured recipients.
// Returns true on success, false on failure (failures are logged, never thrown,
// so a failed email never blocks the form submission).
export async function sendSubmissionEmail(
  data: SubmissionPayload,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY is not set; skipping email notification.")
    return false
  }

  try {
    const resend = new Resend(apiKey)
    const recipients = getNotificationRecipients()

    const { error } = await resend.emails.send({
      from: getFromAddress(),
      to: recipients,
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      html: buildHtml(data),
      text: buildText(data),
    })

    if (error) {
      console.log("[v0] Resend send error:", error)
      return false
    }

    return true
  } catch (err) {
    console.log("[v0] Email notification error:", err)
    return false
  }
}
