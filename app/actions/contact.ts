"use server"

import { createClient } from "@/lib/supabase/server"
import { sendSubmissionEmail } from "@/lib/email/send-submission"

export type ContactState = {
  success: boolean
  error: string | null
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const phone = (formData.get("phone") as string)?.trim() || null
  const business = (formData.get("business") as string)?.trim() || null
  const message = (formData.get("message") as string)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone,
      business,
      message,
    })

    if (error) {
      console.log("[v0] Supabase insert error:", error.message)
      return {
        success: false,
        error: "Something went wrong. Please try again.",
      }
    }

    // Notify the owner(s) by email. This never blocks the submission:
    // if the email fails, the data is still safely saved in the database.
    await sendSubmissionEmail({ name, email, phone, business, message })

    return { success: true, error: null }
  } catch (err) {
    console.log("[v0] Contact submission error:", err)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
