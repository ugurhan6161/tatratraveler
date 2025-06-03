import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import WhatsAppButton from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"
import geoip from "geoip-lite"
import axios from "axios"
import { headers } from "next/headers"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

// Define supported languages and country-to-language mapping
const supportedLanguages = ["en", "tr"] // Add more as needed
const countryToLanguage: { [key: string]: string } = {
  TR: "tr", // Turkey -> Turkish
  US: "en", // United States -> English
  // Add more mappings as needed
  default: "en", // Fallback language
}

// Dynamic metadata for SEO
export const metadata: Metadata = {
  title: "TatraTraveler - Your Journey Begins Here",
  description: "Book flights, hotels, and car rentals worldwide with TatraTraveler",
  openGraph: {
    title: "TatraTraveler - Your Journey Begins Here",
    description: "Book flights, hotels, and car rentals worldwide with TatraTraveler",
    url: "https://www.tatratraveler.com",
    type: "website",
    images: [
      {
        url: "https://www.tatratraveler.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TatraTraveler",
      },
    ],
  },
  alternates: {
    canonical: "https://www.tatratraveler.com",
    languages: {
      "en-US": "/en",
      "tr-TR": "/tr",
    },
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get headers to extract IP address
  const headersList = headers()
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("x-real-ip") ||
    "127.0.0.1" // Fallback to localhost for local testing

  // Get geolocation data
  const geo = geoip.lookup(ip)
  const country = geo?.country || "US" // Fallback to US if country not detected
  const language = countryToLanguage[country] || countryToLanguage.default

  // Prepare WhatsApp notification
  const encodedMessage = encodeURIComponent(`${country} konumundan web sitesine giriş yapıldı!`)
  const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=905550009261&text=${encodedMessage}&apikey=8845842`

  // Send WhatsApp notification silently
  try {
    await axios.get(whatsappUrl, { timeout: 5000 })
  } catch (error) {
    console.error("Failed to send WhatsApp notification:", error)
  }

  return (
    <html lang={language} suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tatratraveler.com" />
        {supportedLanguages.map((lang) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`https://www.tatratraveler.com/${lang}`}
          />
        ))}
      </Head>
      <body className={inter.className}>
        <LanguageProvider defaultLanguage={language}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <WhatsAppButton />
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
