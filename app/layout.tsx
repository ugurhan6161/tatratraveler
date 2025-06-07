import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import WhatsAppButton from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

// Dynamic metadata for SEO with multi-language support
export const metadata: Metadata = {
  title: "TatraTraveler - Premium Travel Services | We're not the cheapest, but your satisfaction is our priority",
  description:
    "We're not the cheapest, but your satisfaction is our priority. Book premium flights, luxury hotels, and reliable car rentals worldwide with TatraTraveler. Expert travel services since 2023.",
  keywords:
    "travel agency, flights booking, hotel reservations, car rental, premium travel, Saudi Arabia travel, international travel, vacation packages, travel services, تاترا ترافيلر, وكالة سفر, حجز طيران, seyahat acentesi, uçak bileti",
  authors: [{ name: "TatraTraveler" }],
  creator: "TatraTraveler",
  publisher: "TatraTraveler",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA", "tr_TR"],
    url: "https://www.tatratraveler.com",
    siteName: "TatraTraveler",
    title: "TatraTraveler - Premium Travel Services | Your Satisfaction is Our Priority",
    description:
      "We're not the cheapest, but your satisfaction is our priority. Book premium flights, luxury hotels, and reliable car rentals worldwide with TatraTraveler.",
    images: [
      {
        url: "https://www.tatratraveler.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TatraTraveler - Premium Travel Services",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tatratraveler",
    creator: "@tatratraveler",
    title: "TatraTraveler - Premium Travel Services",
    description: "We're not the cheapest, but your satisfaction is our priority. Expert travel services worldwide.",
    images: ["https://www.tatratraveler.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.tatratraveler.com",
    languages: {
      "en-US": "https://www.tatratraveler.com/en",
      "ar-SA": "https://www.tatratraveler.com/ar",
      "tr-TR": "https://www.tatratraveler.com/tr",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "travel",
  classification: "Travel Agency",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
    generator: 'v0.dev'
}

// JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "TatraTraveler",
  description: "We're not the cheapest, but your satisfaction is our priority. Premium travel services worldwide.",
  url: "https://www.tatratraveler.com",
  logo: "https://www.tatratraveler.com/logo.png",
  image: "https://www.tatratraveler.com/og-image.jpg",
  telephone: "+966552012122",
  email: "tatratraveler12@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Olaya District",
    addressLocality: "Riyadh",
    postalCode: "12254",
    addressCountry: "SA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "24.7136",
    longitude: "46.6753",
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "$$-$$$",
  servedCuisine: [],
  serviceArea: {
    "@type": "Place",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Travel Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flight Booking",
          description: "Premium flight booking services worldwide",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hotel Reservations",
          description: "Luxury hotel booking and reservations",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Car Rental",
          description: "Reliable car rental services globally",
        },
      },
    ],
  },
  sameAs: ["https://instagram.com/tatratraveler12", "https://snapchat.com/add/hamad_albadrani"],
  slogan: "We're not the cheapest, but your satisfaction is our priority",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Canonical and alternate language links */}
        <link rel="canonical" href="https://www.tatratraveler.com" />
        <link rel="alternate" hrefLang="en" href="https://www.tatratraveler.com/en" />
        <link rel="alternate" hrefLang="ar" href="https://www.tatratraveler.com/ar" />
        <link rel="alternate" hrefLang="tr" href="https://www.tatratraveler.com/tr" />
        <link rel="alternate" hrefLang="x-default" href="https://www.tatratraveler.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Additional meta tags for social media */}
        <meta property="og:site_name" content="TatraTraveler" />
        <meta property="business:contact_data:street_address" content="Olaya District" />
        <meta property="business:contact_data:locality" content="Riyadh" />
        <meta property="business:contact_data:postal_code" content="12254" />
        <meta property="business:contact_data:country_name" content="Saudi Arabia" />
        <meta property="business:contact_data:email" content="tatratraveler12@gmail.com" />
        <meta property="business:contact_data:phone_number" content="+966552012122" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />

        {/* Additional SEO meta tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="language" content="English, Arabic, Turkish" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="Riyadh" />
        <meta name="geo.position" content="24.7136;46.6753" />
        <meta name="ICBM" content="24.7136, 46.6753" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
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
