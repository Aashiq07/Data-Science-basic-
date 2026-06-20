"use client"

import { useRef, useEffect } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { motion, useInView } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitContact, type ContactState } from "@/app/actions/contact"

const initialState: ContactState = { success: false, error: null }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
    >
      {pending ? (
        "Sending..."
      ) : (
        <>
          Send Message
          <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+91 90435 42304",
    href: "https://wa.me/919043542304",
  },
  {
    icon: Mail,
    label: "Email",
    value: "raredrop007@gmail.com",
    href: "mailto:raredrop007@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@raredropmedia",
    href: "https://instagram.com/raredropmedia",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "1/153 Bharathiyar Street, Jalladianpet, Pallikaranai, Chennai, Tamil Nadu - 600100",
    href: "https://maps.google.com/?q=Pallikaranai,Chennai",
  },
]

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [state, formAction] = useActionState(submitContact, initialState)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div ref={sectionRef} className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Let&apos;s Start Your
            <br />
            <span className="text-primary">Digital Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to transform your brand? Get in touch and let&apos;s create
            something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} action={formAction} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="business"
                        className="block text-sm font-medium mb-2"
                      >
                        Business Type
                      </label>
                      <Input
                        id="business"
                        name="business"
                        placeholder="e.g., Restaurant, Startup"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your project..."
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                    />
                  </div>

                  {state.error && (
                    <p className="text-sm text-destructive" role="alert">
                      {state.error}
                    </p>
                  )}

                  <SubmitButton />
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-3xl bg-card border border-border">
              <h3 className="text-2xl font-bold mb-6">Get in touch</h3>

              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          {info.label}
                        </span>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Map embed placeholder */}
            <div className="rounded-3xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8267891095!2d80.19749431482221!3d12.930619990882387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d16d53ed4a1%3A0x7ebf5a5f4c9b5c9c!2sPallikaranai%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rare Drop Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
