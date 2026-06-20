// Recipients that receive an email whenever the contact form is submitted.
//
// To add more recipients in the future, simply add their email addresses to
// this array (or set the NOTIFICATION_RECIPIENTS env var to a comma-separated
// list, which takes precedence over this list).
const DEFAULT_RECIPIENTS = ["raredrop007@gmail.com"]

export function getNotificationRecipients(): string[] {
  const fromEnv = process.env.NOTIFICATION_RECIPIENTS

  if (fromEnv) {
    const parsed = fromEnv
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)

    if (parsed.length > 0) {
      return parsed
    }
  }

  return DEFAULT_RECIPIENTS
}

// The "from" address shown on the notification email.
// This must be an address on a domain you have verified in Resend.
// Falls back to Resend's shared test sender if not configured.
export function getFromAddress(): string {
  return process.env.EMAIL_FROM ?? "Rare Drop <onboarding@resend.dev>"
}
