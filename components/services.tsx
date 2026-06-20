"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Share2,
  Palette,
  Video,
  Globe,
  Target,
  Search,
  Users,
  TrendingUp,
} from "lucide-react"

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Strategic planning, content scheduling, and community management across all major platforms.",
  },
  {
    icon: Palette,
    title: "Content Creation",
    description:
      "Eye-catching graphics, compelling copy, and scroll-stopping content that engages your audience.",
  },
  {
    icon: Video,
    title: "Video Production & Reels",
    description:
      "Professional video content and trending reels that capture attention and drive engagement.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Modern, responsive websites that convert visitors into customers with seamless UX.",
  },
  {
    icon: Target,
    title: "Meta Ads Management",
    description:
      "Data-driven Facebook & Instagram advertising campaigns that maximize your ROI.",
  },
  {
    icon: Search,
    title: "Google Ads Management",
    description:
      "Strategic Google advertising to reach customers actively searching for your services.",
  },
  {
    icon: Users,
    title: "Influencer Marketing",
    description:
      "Connect with the right influencers to amplify your brand message authentically.",
  },
  {
    icon: TrendingUp,
    title: "Business Growth Strategy",
    description:
      "Comprehensive digital strategies tailored to accelerate your business growth.",
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden rounded-br-2xl">
        <div className="absolute bottom-0 right-0 w-full h-full bg-primary/10 transform translate-x-1/2 translate-y-1/2 rotate-45 group-hover:bg-primary/20 transition-colors duration-300" />
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-background">
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
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            Everything You Need to
            <br />
            <span className="text-primary">Dominate Digital</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital marketing solutions tailored to elevate your
            brand and drive measurable results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
