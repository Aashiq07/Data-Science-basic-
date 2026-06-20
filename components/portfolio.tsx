"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const clients = [
  { name: "Coastal Cuisine", logo: "/clients/client-1.png" },
  { name: "Paradise Resort", logo: "/clients/client-2.png" },
  { name: "Future Academy", logo: "/clients/client-3.png" },
  { name: "Fitness Influencer", logo: "/clients/client-4.png" },
  { name: "Product Launch", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Tech Startup", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Brew Cafe", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Serene Spa", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Urban Eats", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Luxe Travel", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Bright Minds", logo: "/placeholder.svg?height=120&width=120" },
  { name: "Pulse Media", logo: "/placeholder.svg?height=120&width=120" },
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
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card"
            >
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={`${client.name} logo`}
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
