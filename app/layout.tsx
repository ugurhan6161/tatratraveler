import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import WhatsAppButton from "@/components/whatsapp-button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

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
    generator: 'v0.dev'
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
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tatratraveler.com" />
        <link rel="alternate" hrefLang="en" href="https://www.tatratraveler.com/en" />
        <link rel="alternate" hrefLang="tr" href="https://www.tatratraveler.com/tr" />
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
