"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { heroSlides } from "@/lib/slides"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import { HeroSkeleton } from "./skeleton-loaders"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const t = translations[language]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const getTitle = (slide) => {
    if (language === "ar") return slide.arTitle
    if (language === "tr") return slide.trTitle
    return slide.enTitle
  }

  const getSubtitle = (slide) => {
    if (language === "ar") return slide.arSubtitle
    if (language === "tr") return slide.trSubtitle
    return slide.enSubtitle
  }

  if (isLoading) {
    return <HeroSkeleton />
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4 z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">{getTitle(slide)}</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fadeIn animation-delay-200">{getSubtitle(slide)}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="animate-fadeIn animation-delay-400">
                {t.bookNow}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="animate-fadeIn animation-delay-600 bg-black/30 text-white border-white hover:bg-white hover:text-black"
              >
                {t.learnMore}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
