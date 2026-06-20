"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Sparkles,
  HeadphonesIcon,
  MessageSquare,
  Settings,
  Clock,
  Rocket,
} from "lucide-react"

const reasons = [
  {
    icon: Sparkles,
    title: "Creative & Result-Driven",
    description:
      "We blend creativity with data-driven strategies to deliver campaigns that captivate and convert.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description:
      "A dedicated team assigned to your brand, ensuring consistent quality and personalized attention.",
  },
  {
    icon: MessageSquare,
    title: "Easy to Reach",
    description:
      "Direct communication channels for quick responses and seamless collaboration on all projects.",
  },
  {
    icon: Settings,
    title: "Customized Solutions",
    description:
      "Tailored marketing strategies designed specifically for your unique business goals and audience.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Round-the-clock support to address your needs and keep your campaigns running smoothly.",
  },
  {
    icon: Rocket,
    title: "Growth Focused",
    description:
      "Every strategy is designed with one goal in mind: accelerating your business growth.",
  },
]

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[0]
  index: number
}) {
  const Icon = reason.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl glass hover:bg-card/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {reason.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
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
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            What Makes Us
            <br />
            <span className="text-primary">Different</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We&apos;re not just another agency. We&apos;re your growth partners
            committed to your success.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
