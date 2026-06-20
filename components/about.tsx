"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import {
  Lightbulb,
  Target,
  TrendingUp,
  Video,
  Code,
} from "lucide-react"

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description: "Started as a video editor, learning the craft of visual storytelling",
    icon: Video,
  },
  {
    year: "2020",
    title: "Expanding Skills",
    description: "Expanded into DOP, design, and creative direction",
    icon: Lightbulb,
  },
  {
    year: "2022",
    title: "Tech Evolution",
    description: "Mastered Figma, HTML, CSS, JavaScript, and React JS",
    icon: Code,
  },
  {
    year: "2024",
    title: "Rare Drop Founded",
    description: "Launched Rare Drop to help brands grow digitally",
    icon: Target,
  },
  {
    year: "Now",
    title: "Growing Impact",
    description: "Helping 100+ brands create lasting digital presence",
    icon: TrendingUp,
  },
]

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center gap-6 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div
        className={`flex-1 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 ${
          index % 2 === 0 ? "md:text-right" : "md:text-left"
        }`}
      >
        <span className="text-primary font-bold text-lg">{item.year}</span>
        <h3 className="text-xl font-semibold mt-1 mb-2">{item.title}</h3>
        <p className="text-muted-foreground">{item.description}</p>
      </div>

      {/* Icon */}
      <div className="hidden md:flex w-12 h-12 rounded-full bg-primary/10 border border-primary/30 items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      {/* Spacer for alignment */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* About Content */}
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl border border-border overflow-hidden relative">
              {/* Owner photo */}
              <Image
                src="/owner/jones-asir.jpeg"
                alt="Jones Asir, founder of Rare Drop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <span className="text-lg font-medium text-muted-foreground">
                  Founded by
                </span>
                <br />
                <span className="text-2xl text-primary font-bold">
                  Jones Asir
                </span>
              </div>
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
              <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Building Powerful
              <br />
              <span className="text-primary">Digital Identities</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Rare Drop is a creative digital marketing and social media agency
              focused on building powerful online identities for brands. We
              specialize in content creation, branding, social media management,
              website development, paid advertising, and performance-driven
              marketing strategies.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded by Jones Asir, Rare Drop combines creativity, storytelling,
              and strategic marketing to help businesses increase visibility,
              engagement, and growth in the digital world.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              From Vision to Reality
            </h2>
          </motion.div>

          {/* Timeline line */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <TimelineItem key={item.year} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
