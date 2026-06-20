"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    business: "Spice Route Restaurant",
    rating: 5,
    content:
      "Rare Drop transformed our social media presence completely. Our engagement increased by 400% in just 3 months. Their creative content and strategic approach helped us reach new customers we never thought possible.",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    business: "TechStart Solutions",
    rating: 5,
    content:
      "The team at Rare Drop understands digital marketing like no other. They built our brand from scratch and helped us establish a strong online identity. Highly recommend their services!",
  },
  {
    id: 3,
    name: "Anitha Menon",
    business: "Coastal Resorts",
    rating: 5,
    content:
      "Working with Rare Drop has been a game-changer for our resort. Their video content and reels have brought in countless new guests. Professional, creative, and always on time.",
  },
  {
    id: 4,
    name: "Mohammed Faiz",
    business: "Elite Fitness Studio",
    rating: 5,
    content:
      "The influencer marketing strategy Rare Drop created for us was incredible. We saw a 300% increase in membership signups within two months. They truly understand the fitness industry.",
  },
  {
    id: 5,
    name: "Lakshmi Venkat",
    business: "Greenfield Academy",
    rating: 5,
    content:
      "Rare Drop helped us reach more parents and students through targeted digital campaigns. Our admissions increased significantly thanks to their strategic marketing approach.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "text-primary fill-primary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: (typeof testimonials)[0]
  isActive: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className={`relative p-8 rounded-3xl glass ${
        isActive ? "border-primary/30" : "border-transparent"
      }`}
    >
      {/* Quote icon */}
      <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/20" />

      {/* Content */}
      <div className="relative">
        <StarRating rating={testimonial.rating} />
        <p className="mt-6 text-lg leading-relaxed text-foreground/90">
          &quot;{testimonial.content}&quot;
        </p>
        <div className="mt-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <h4 className="font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.business}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
            What Our Clients
            <br />
            <span className="text-primary">Say About Us</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentIndex}
              testimonial={testimonials[currentIndex]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
