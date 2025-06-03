"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import { NavBarSkeleton } from "./skeleton-loaders"

export default function NavBar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isLoading) {
    return <NavBarSkeleton />
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <a href="/" className="font-bold text-xl md:text-2xl text-primary truncate">
            TatraTraveler
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
            {t.home}
          </a>
          <a
            href="#destinations"
            className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
          >
            {t.destinations}
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
            {t.about}
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
            {t.contact}
          </a>
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1 border rounded-md overflow-hidden">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-xs whitespace-nowrap ${language === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 text-xs whitespace-nowrap ${language === "ar" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              AR
            </button>
            <button
              onClick={() => setLanguage("tr")}
              className={`px-2 py-1 text-xs whitespace-nowrap ${language === "tr" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              TR
            </button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex-shrink-0"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden flex-shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <a href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.home}
                </a>
                <a href="#destinations" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.destinations}
                </a>
                <a href="#about" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.about}
                </a>
                <a href="#contact" className="text-lg font-medium hover:text-primary transition-colors">
                  {t.contact}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
