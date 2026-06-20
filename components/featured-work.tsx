"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Instagram } from "lucide-react"
import Image from "next/image"

const btsImages = [
  { src: "/work/bts-1.jpeg", alt: "Behind the scenes: scripting the shoot at the table" },
  { src: "/work/bts-2.jpeg", alt: "Behind the scenes: directing a take beside the camera" },
  { src: "/work/bts-3.jpeg", alt: "Behind the scenes: reviewing a shot with the client" },
]

const REEL_URL = "https://www.instagram.com/reel/DV8ObCOgeUN/"

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Load Instagram's embed script and (re)process the embed
  useEffect(() => {
    const SCRIPT_SRC = "https://www.instagram.com/embed.js"
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    )

    if (existing) {
      window.instgrm?.Embeds.process()
      return
    }

    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => window.instgrm?.Embeds.process()
    document.body.appendChild(script)
  }, [])

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div ref={sectionRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-balance">
            FROM CONCEPT TO
            <br />
            <span className="text-primary">FINAL CUT</span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            A reel we produced for one of our clients, and the behind-the-scenes
            moments captured while bringing it to life.
          </p>
        </motion.div>

        {/* Instagram reel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[400px]">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={REEL_URL}
              data-instgrm-version="14"
              style={{
                background: "#0a0a0a",
                borderRadius: "16px",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              <a
                href={REEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border glass p-10 text-center"
                style={{ aspectRatio: "9 / 16" }}
              >
                <Instagram className="h-10 w-10 text-primary" />
                <span className="text-base font-semibold">Watch the reel on Instagram</span>
                <span className="text-sm text-muted-foreground">
                  Tap to play the full video
                </span>
              </a>
            </blockquote>
          </div>
        </motion.div>

        {/* BTS label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16 mb-8"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Behind the Scenes
          </span>
          <p className="text-muted-foreground mt-2">
            How we shot this reel for our client.
          </p>
        </motion.div>

        {/* BTS images row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {btsImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
