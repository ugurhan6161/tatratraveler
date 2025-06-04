"use client"
import { X, MapPin, Star, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import Image from "next/image"

interface DestinationModalProps {
  destination: any
  isOpen: boolean
  onClose: () => void
}

export function DestinationModal({ destination, isOpen, onClose }: DestinationModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  if (!isOpen || !destination) return null

  const getDestinationName = (destination) => {
    return destination.name[language] || destination.name.en
  }

  const getDestinationDescription = (destination) => {
    return destination.description[language] || destination.description.en
  }

  const getDetailedDescription = (destination) => {
    return destination.detailedDescription[language] || destination.detailedDescription.en
  }

  const getHighlights = (destination) => {
    return destination.highlights[language] || destination.highlights.en
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={destination.image || "/placeholder.svg"}
            alt={getDestinationName(destination)}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{getDestinationName(destination)}</h2>
            <p className="text-lg opacity-90 max-w-2xl">{getDestinationDescription(destination)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
          {/* Detailed Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.aboutDestination}</h3>
            <p className="text-gray-600 leading-relaxed text-base">{getDetailedDescription(destination)}</p>
          </div>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{t.highlights}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getHighlights(destination).map((highlight, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">{t.location}</p>
                <p className="text-sm text-gray-600">{getDestinationName(destination)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">{t.bestTime}</p>
                <p className="text-sm text-gray-600">{t.yearRound}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">{t.suitableFor}</p>
                <p className="text-sm text-gray-600">{t.allTravelers}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 h-12 text-base"
              onClick={() => {
                onClose()
                // Scroll to booking section
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t.bookNow}
            </Button>
            <Button variant="outline" className="flex-1 h-12 text-base" onClick={onClose}>
              {t.viewMore}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
