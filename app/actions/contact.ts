"use server"

import { createClient } from "@/lib/supabase/server"

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

    return { success: true, error: null }
  } catch (err) {
    console.log("[v0] Contact submission error:", err)
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    }
  }
}
