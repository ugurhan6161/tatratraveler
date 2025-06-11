"use client"
import Hero from "@/components/hero"
import PopularDestinations from "@/components/popular-destinations"
import Footer from "@/components/footer"
import NavBar from "@/components/nav-bar"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { HeroSkeleton, DestinationsSkeleton } from "@/components/skeleton-loaders"
import { AiTravelButton } from "@/components/ai-travel-button"

export default function Home() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <NavBar />
      <main className="flex-1 w-full">
        <LoadingWrapper skeleton={<HeroSkeleton />} delay={1500}>
          <Hero />
        </LoadingWrapper>

        {/* AI Travel Planning Section */}
        <section className="w-full px-4 py-16 -mt-24 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <AiTravelButton />
          </div>
        </section>

        <section id="destinations" className="w-full px-4 py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">{t.popularDestinations}</h2>
            <LoadingWrapper skeleton={<DestinationsSkeleton />} delay={2000}>
              <PopularDestinations />
            </LoadingWrapper>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
