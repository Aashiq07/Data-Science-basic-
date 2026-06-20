"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Client = {
  name: string
  logo: string
  // when true, the logo fills the whole circle (used for logos that already
  // include their own circular/solid background)
  fill?: boolean
  // background color of the circle container
  bg?: "white" | "black"
  // extra zoom applied to fill logos so their own background reaches the edges
  zoom?: string
  // when true, the logo is shown as-is with no circle, border, or background
  bare?: boolean
}

const clients: Client[] = [
  { name: "Zion Planners", logo: "/clients/zion-planners.png" },
  { name: "Tempt", logo: "/clients/tempt.jpeg", fill: true, bg: "white", zoom: "scale-[1.4]" },
  { name: "SOHO The Burger Co", logo: "/clients/soho-burger.png", fill: true, bg: "black", zoom: "scale-[1.45]" },
  { name: "Twisty Tails", logo: "/clients/twisty-tails.jpeg" },
  { name: "Thamil Mithiran", logo: "/clients/thamil-mithiran.png" },
  { name: "Dream Fit Designing", logo: "/clients/dream-fit.png" },
  { name: "Wangs Kitchen", logo: "/clients/wangs-kitchen.jpeg", bare: true },
  { name: "Chennai Mandala Seithigal", logo: "/clients/chennai-seithigal.jpeg" },
  { name: "KNK Eshkol", logo: "/clients/knk-eshkol.jpeg", fill: true, bg: "black", zoom: "scale-[1.08]" },
  { name: "Junior Kuppanna", logo: "/clients/junior-kuppanna.png", bare: true },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6 text-balance">
            CREATING CONTENT THAT
            <br />
            <span className="text-primary">PEOPLE REMEMBER</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by brands across industries. Here are some of the clients
            we&apos;ve helped grow.
          </p>
        </motion.div>
      </div>

      {/* Infinite logo marquee */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-secondary/30 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-secondary/30 to-transparent" />

        <motion.div
          className="flex w-max gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        >
          {[...clients, ...clients].map((client, index) =>
            client.bare ? (
              <div
                key={`${client.name}-${index}`}
                className="flex h-40 w-40 shrink-0 items-center justify-center"
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={`${client.name} logo`}
                  width={160}
                  height={160}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                key={`${client.name}-${index}`}
                className={`flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border shadow-sm ${
                  client.bg === "black" ? "bg-black" : "bg-white"
                } ${client.fill ? "" : "p-3"}`}
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={`${client.name} logo`}
                  width={160}
                  height={160}
                  className={`h-full w-full ${
                    client.fill ? `object-cover ${client.zoom ?? "scale-105"}` : "object-contain"
                  }`}
                />
              </div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  )
}
