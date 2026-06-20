"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Restaurants",
  "Resorts",
  "Schools",
  "Personal Brands",
  "Reels",
  "Branding",
]

const portfolioItems = [
  {
    id: 1,
    title: "Coastal Cuisine Restaurant",
    category: "Restaurants",
    image: "/portfolio/restaurant-1.jpg",
    stats: { engagement: "+340%", followers: "+12K" },
    isVideo: false,
  },
  {
    id: 2,
    title: "Paradise Beach Resort",
    category: "Resorts",
    image: "/portfolio/resort-1.jpg",
    stats: { engagement: "+520%", followers: "+25K" },
    isVideo: false,
  },
  {
    id: 3,
    title: "Future Academy",
    category: "Schools",
    image: "/portfolio/school-1.jpg",
    stats: { engagement: "+280%", followers: "+8K" },
    isVideo: false,
  },
  {
    id: 4,
    title: "Fitness Influencer",
    category: "Personal Brands",
    image: "/portfolio/personal-1.jpg",
    stats: { engagement: "+450%", followers: "+50K" },
    isVideo: false,
  },
  {
    id: 5,
    title: "Product Launch Reel",
    category: "Reels",
    image: "/portfolio/reel-1.jpg",
    stats: { views: "1.2M", shares: "45K" },
    isVideo: true,
  },
  {
    id: 6,
    title: "Tech Startup Branding",
    category: "Branding",
    image: "/portfolio/brand-1.jpg",
    stats: { awareness: "+300%", leads: "+150" },
    isVideo: false,
  },
]

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border"
    >
      {/* Image/Video Placeholder */}
      <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-4xl font-bold text-primary/30">
              {item.id}
            </span>
          </div>
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {item.isVideo ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Watch
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                View
              </>
            )}
          </Button>
        </div>

        {/* Video indicator */}
        {item.isVideo && (
          <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Play className="h-4 w-4 text-primary-foreground fill-current" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {item.category}
        </span>
        <h3 className="text-lg font-semibold mt-1 mb-3">{item.title}</h3>

        {/* Stats */}
        <div className="flex gap-4">
          {Object.entries(item.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <span className="block text-lg font-bold text-primary">
                {value}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
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
            Explore our portfolio of successful campaigns and transformations
            across various industries.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
