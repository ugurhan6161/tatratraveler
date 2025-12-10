"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar" | "tr"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/* ---------- helpers & constants ---------- */
const countryToLanguage: Record<string, Language> = {
  TR: "tr",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  SA: "ar",
  AE: "ar",
  EG: "ar",
  JO: "ar",
  LB: "ar",
  SY: "ar",
  IQ: "ar",
  KW: "ar",
  QA: "ar",
  BH: "ar",
  OM: "ar",
  YE: "ar",
}

function getBrowserInfo() {
  const ua = navigator.userAgent
  const browser = ua.includes("Edg")
    ? { name: "Edge", ver: ua.match(/Edg\/([\d.]+)/)?.[1] }
    : ua.includes("Chrome")
      ? { name: "Chrome", ver: ua.match(/Chrome\/([\d.]+)/)?.[1] }
      : ua.includes("Firefox")
        ? { name: "Firefox", ver: ua.match(/Firefox\/([\d.]+)/)?.[1] }
        : ua.includes("Safari")
          ? { name: "Safari", ver: ua.match(/Version\/([\d.]+)/)?.[1] }
          : { name: "Unknown", ver: "Unknown" }

  const os = ua.includes("Windows NT")
    ? "Windows"
    : ua.includes("Mac OS X")
      ? "macOS"
      : ua.includes("Linux")
        ? "Linux"
        : ua.includes("Android")
          ? "Android"
          : /iPhone|iPad/.test(ua)
            ? "iOS"
            : "Unknown"

  return {
    browserName: browser.name,
    browserVersion: browser.ver ?? "Unknown",
    osName: os,
    deviceType: /Mobi|Android/.test(ua) ? "Mobile" : /Tablet|iPad/.test(ua) ? "Tablet" : "Desktop",
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages?.join(", ") ?? navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    doNotTrack: navigator.doNotTrack,
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    screenPixelDepth: screen.pixelDepth,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: ua,
  }
}

/* ---------- server-side notification helper ---------- */
async function sendWhatsappNotification(message: string) {
  try {
    const res = await fetch("/api/notify-whatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      console.error("notify-whatsapp api error:", res.status, data?.error ?? res.statusText)
    }
  } catch (err) {
    console.error("notify-whatsapp api network error:", err)
  }
}

async function sendTelegramNotification(message: string) {
  try {
    console.log("[v0] [CLIENT] Telegram mesaj gönderimi başlıyor...")
    console.log("[v0] [CLIENT] Message length:", message.length)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const res = await fetch("/api/notify-telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    console.log("[v0] [CLIENT] Response status:", res.status)

    const data = await res.json()
    console.log("[v0] [CLIENT] Response data:", data)

    if (!res.ok) {
      console.error("[v0] [CLIENT] API Hatası:", data?.error || "Unknown error")
      return
    }

    console.log("[v0] [CLIENT] ✅ Telegram mesajı başarıyla gönderildi!")
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("[v0] [CLIENT] TIMEOUT: Telegram API yanıt vermedi (10s)")
    } else {
      console.error("[v0] [CLIENT] Fetch Hatası:", err?.message || err)
    }
  }
}

/* ---------- provider ---------- */
export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: {
  children: ReactNode
  defaultLanguage?: Language
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage)
  const [hasDetectedLocation, setHasDetectedLocation] = useState(false)

  const setLanguage = (lng: Language) => {
    setLanguageState(lng)
    document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`
  }

  useEffect(() => {
    const cookieLang =
      document.cookie
        .split("; ")
        .find((r) => r.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] ?? ""

    if (["en", "ar", "tr"].includes(cookieLang)) {
      setLanguageState(cookieLang as Language)
      setHasDetectedLocation(true)
      return
    }

    const detect = async () => {
      if (hasDetectedLocation) return

      try {
        const browserInfo = getBrowserInfo()
        const now = new Date().toLocaleString("tr-TR", {
          timeZone: browserInfo.timezone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })

        // parallel geo calls
        const [ipapi, ipinfo] = await Promise.allSettled([
          fetch("https://ipapi.co/json/"),
          fetch("https://ipinfo.io/json"),
        ])

        const locData = ipapi.status === "fulfilled" && ipapi.value.ok ? await ipapi.value.json() : {}
        const ipData = ipinfo.status === "fulfilled" && ipinfo.value.ok ? await ipinfo.value.json() : {}

        const countryCode = locData.country_code || ipData.country
        const detectedLang: Language = countryToLanguage[countryCode] ?? "en"
        setLanguage(detectedLang)
        setHasDetectedLocation(true)

        /* ---------- build message & notify ---------- */
        const msg = `
🌍 *NEW VISITOR - TATRATRAVELER.COM*

📅 *Visit Time:* ${now}

👤 *Location:*
• IP: ${locData.ip || ipData.ip || "N/A"}
• Country: ${locData.country_name || ipData.country || "N/A"} (${countryCode || "??"})
• City: ${locData.city || ipData.city || "N/A"}

💻 *Device:*
• Type: ${browserInfo.deviceType}
• OS: ${browserInfo.osName}
• Browser: ${browserInfo.browserName} ${browserInfo.browserVersion}

🗣️ *Detected Lang:* ${detectedLang.toUpperCase()}
`.trim()

        sendTelegramNotification(msg)
      } catch (err) {
        console.error("detect lang error:", err)
      }
    }

    if (!hasDetectedLocation) detect()
  }, [hasDetectedLocation])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
