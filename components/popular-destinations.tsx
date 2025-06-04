"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { popularDestinations } from "@/lib/destinations"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import { DestinationsSkeleton } from "./skeleton-loaders"
import { DestinationModal } from "./destination-modal"

export default function PopularDestinations() {
  const [startIndex, setStartIndex] = useState(0)
  const { language } = useLanguage()
  const t = translations[language]
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const visibleDestinations = popularDestinations.slice(startIndex, startIndex + 4)

  const handleNext = () => {
    setStartIndex((prev) => (prev + 4 >= popularDestinations.length ? 0 : prev + 4))
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 4 < 0 ? Math.max(0, popularDestinations.length - 4) : prev - 4))
  }

  const getDestinationName = (destination) => {
    return destination.name[language] || destination.name.en
  }

  const getDestinationDescription = (destination) => {
    return destination.description[language] || destination.description.en
  }

  const handleExploreClick = (destination) => {
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDestination(null)
  }

  if (isLoading) {
    return <DestinationsSkeleton />
  }

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative rounded-lg overflow-hidden shadow-lg w-full"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={getDestinationName(destination)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                <h3 className="text-lg md:text-xl font-bold mb-1 line-clamp-1">{getDestinationName(destination)}</h3>
                <p className="text-xs md:text-sm text-white/80 mb-2 md:mb-3 line-clamp-2">
                  {getDestinationDescription(destination)}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-black transition-colors text-xs md:text-sm bg-black/30 dark:bg-transparent"
                  onClick={() => handleExploreClick(destination)}
                >
                  {t.explore}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {popularDestinations.length > 4 && (
          <div className="flex justify-center mt-6 md:mt-8 gap-4">
            <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Destination Modal */}
      <DestinationModal destination={selectedDestination} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
