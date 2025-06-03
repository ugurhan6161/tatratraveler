"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar" | "tr"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Country to language mapping
const countryToLanguage: { [key: string]: Language } = {
  TR: "tr", // Turkey -> Turkish
  US: "en", // United States -> English
  GB: "en", // United Kingdom -> English
  CA: "en", // Canada -> English
  AU: "en", // Australia -> English
  SA: "ar", // Saudi Arabia -> Arabic
  AE: "ar", // UAE -> Arabic
  EG: "ar", // Egypt -> Arabic
  JO: "ar", // Jordan -> Arabic
  LB: "ar", // Lebanon -> Arabic
  SY: "ar", // Syria -> Arabic
  IQ: "ar", // Iraq -> Arabic
  KW: "ar", // Kuwait -> Arabic
  QA: "ar", // Qatar -> Arabic
  BH: "ar", // Bahrain -> Arabic
  OM: "ar", // Oman -> Arabic
  YE: "ar", // Yemen -> Arabic
}

// Function to get browser and device information
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  const language = navigator.language
  const languages = navigator.languages?.join(", ") || language
  const cookieEnabled = navigator.cookieEnabled
  const onLine = navigator.onLine
  const doNotTrack = navigator.doNotTrack

  // Screen information
  const screenWidth = screen.width
  const screenHeight = screen.height
  const screenColorDepth = screen.colorDepth
  const screenPixelDepth = screen.pixelDepth

  // Window information
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Browser detection
  let browserName = "Unknown"
  let browserVersion = "Unknown"

  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browserName = "Chrome"
    browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.includes("Firefox")) {
    browserName = "Firefox"
    browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browserName = "Safari"
    browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Unknown"
  } else if (userAgent.includes("Edg")) {
    browserName = "Edge"
    browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown"
  }

  // Operating System detection
  let osName = "Unknown"
  if (userAgent.includes("Windows NT")) {
    osName = "Windows"
  } else if (userAgent.includes("Mac OS X")) {
    osName = "macOS"
  } else if (userAgent.includes("Linux")) {
    osName = "Linux"
  } else if (userAgent.includes("Android")) {
    osName = "Android"
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    osName = "iOS"
  }

  // Device type detection
  let deviceType = "Desktop"
  if (/Mobi|Android/i.test(userAgent)) {
    deviceType = "Mobile"
  } else if (/Tablet|iPad/i.test(userAgent)) {
    deviceType = "Tablet"
  }

  return {
    browserName,
    browserVersion,
    osName,
    deviceType,
    platform,
    language,
    languages,
    cookieEnabled,
    onLine,
    doNotTrack,
    screenWidth,
    screenHeight,
    screenColorDepth,
    screenPixelDepth,
    windowWidth,
    windowHeight,
    timezone,
    userAgent,
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = "en",
}: { children: ReactNode; defaultLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)
  const [hasDetectedLocation, setHasDetectedLocation] = useState(false)

  useEffect(() => {
    // Detect user's location and set language accordingly
    const detectLocationAndLanguage = async () => {
      if (hasDetectedLocation) return

      try {
        // Get browser and device information
        const browserInfo = getBrowserInfo()

        // Get current date and time
        const now = new Date()
        const visitTime = now.toLocaleString("tr-TR", {
          timeZone: browserInfo.timezone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })

        // Try to get user's location using multiple APIs for comprehensive data
        const [ipapiResponse, ipinfoResponse] = await Promise.allSettled([
          fetch("https://ipapi.co/json/", { timeout: 5000 }),
          fetch("https://ipinfo.io/json", { timeout: 5000 }),
        ])

        let locationData: any = {}
        let ipData: any = {}

        // Process ipapi.co response
        if (ipapiResponse.status === "fulfilled" && ipapiResponse.value.ok) {
          locationData = await ipapiResponse.value.json()
        }

        // Process ipinfo.io response
        if (ipinfoResponse.status === "fulfilled" && ipinfoResponse.value.ok) {
          ipData = await ipinfoResponse.value.json()
        }

        // Combine all available data
        const combinedData = {
          ...locationData,
          ...ipData,
          // Prefer more detailed data from ipapi.co
          ip: locationData.ip || ipData.ip,
          city: locationData.city || ipData.city,
          region: locationData.region || ipData.region,
          country: locationData.country_name || ipData.country,
          countryCode: locationData.country_code || ipData.country,
        }

        const detectedLanguage = countryToLanguage[combinedData.countryCode] || "en"
        setLanguage(detectedLanguage)
        setHasDetectedLocation(true)

        // Create comprehensive visitor information message
        const visitorInfo = `
🌍 *YENİ ZİYARETÇİ - TATRATRAVELER.COM*

📅 *Ziyaret Zamanı:* ${visitTime}

🌐 *Konum Bilgileri:*
• IP Adresi: ${combinedData.ip || "Bilinmiyor"}
• Ülke: ${combinedData.country || "Bilinmiyor"} (${combinedData.countryCode || "N/A"})
• Şehir: ${combinedData.city || "Bilinmiyor"}
• Bölge: ${combinedData.region || "Bilinmiyor"}
• Posta Kodu: ${combinedData.postal || "Bilinmiyor"}
• Enlem/Boylam: ${combinedData.latitude || "N/A"}, ${combinedData.longitude || "N/A"}
• Zaman Dilimi: ${combinedData.timezone || browserInfo.timezone}

💻 *Cihaz Bilgileri:*
• Cihaz Türü: ${browserInfo.deviceType}
• İşletim Sistemi: ${browserInfo.osName}
• Platform: ${browserInfo.platform}
• Tarayıcı: ${browserInfo.browserName} ${browserInfo.browserVersion}

🖥️ *Ekran Bilgileri:*
• Ekran Çözünürlüğü: ${browserInfo.screenWidth}x${browserInfo.screenHeight}
• Pencere Boyutu: ${browserInfo.windowWidth}x${browserInfo.windowHeight}
• Renk Derinliği: ${browserInfo.screenColorDepth} bit

🌐 *İnternet Bilgileri:*
• ISP: ${combinedData.org || "Bilinmiyor"}
• AS: ${combinedData.asn || "Bilinmiyor"}
• Bağlantı Türü: ${combinedData.connection?.type || "Bilinmiyor"}
• Mobil: ${combinedData.mobile ? "Evet" : "Hayır"}
• Proxy: ${combinedData.proxy ? "Evet" : "Hayır"}

🗣️ *Dil Bilgileri:*
• Tespit Edilen Dil: ${detectedLanguage.toUpperCase()}
• Tarayıcı Dili: ${browserInfo.language}
• Desteklenen Diller: ${browserInfo.languages}

⚙️ *Tarayıcı Ayarları:*
• Çerezler Aktif: ${browserInfo.cookieEnabled ? "Evet" : "Hayır"}
• Çevrimiçi: ${browserInfo.onLine ? "Evet" : "Hayır"}
• Do Not Track: ${browserInfo.doNotTrack || "Ayarlanmamış"}

🔍 *Para Birimi:* ${combinedData.currency || "Bilinmiyor"}
🏛️ *Başkent:* ${combinedData.country_capital || "Bilinmiyor"}
📞 *Ülke Kodu:* ${combinedData.country_calling_code || "Bilinmiyor"}

---
*Bu mesaj otomatik olarak gönderilmiştir.*
        `.trim()

        // Send comprehensive WhatsApp notification with updated credentials
        const encodedMessage = encodeURIComponent(visitorInfo)

        // Try to send via multiple methods with updated phone number and API key
        try {
          // Method 1: CallMeBot API with updated credentials
          const whatsappResponse = await fetch(
            `https://api.callmebot.com/whatsapp.php?phone=966552012122&text=${encodedMessage}&apikey=5305221`,
          )

          // Method 2: Alternative notification service (if first fails)
          if (!whatsappResponse.ok) {
            await fetch(
              `https://api.telegram.org/bot6789012345:AAHdqTcvbXorQeaJ-xh4dQAI0Q8rksMaB-c/sendMessage?chat_id=@tatratraveler&text=${encodedMessage}`,
            )
          }
        } catch (error) {
          // Silent fail for notifications
          console.log("Notification service unavailable")
        }
      } catch (error) {
        // Fallback: try to detect language from browser settings
        const browserLang = navigator.language.split("-")[0]
        if (browserLang === "tr") {
          setLanguage("tr")
        } else if (browserLang === "ar") {
          setLanguage("ar")
        } else {
          setLanguage("en")
        }
        setHasDetectedLocation(true)

        // Send basic browser info even if location detection fails with updated credentials
        const browserInfo = getBrowserInfo()
        const basicInfo = `
🌍 *YENİ ZİYARETÇİ - TATRATRAVELER.COM*
📅 Ziyaret: ${new Date().toLocaleString("tr-TR")}
💻 Tarayıcı: ${browserInfo.browserName} ${browserInfo.browserVersion}
🖥️ İşletim Sistemi: ${browserInfo.osName}
📱 Cihaz: ${browserInfo.deviceType}
🗣️ Dil: ${browserInfo.language}
⏰ Zaman Dilimi: ${browserInfo.timezone}
        `.trim()

        const encodedBasicMessage = encodeURIComponent(basicInfo)
        fetch(
          `https://api.callmebot.com/whatsapp.php?phone=966552012122&text=${encodedBasicMessage}&apikey=5305221`,
        ).catch(() => {})
      }
    }

    // Only run detection once
    if (!hasDetectedLocation) {
      detectLocationAndLanguage()
    }
  }, [hasDetectedLocation])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
