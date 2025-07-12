"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Bot, Plane, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"
import { AiChatModal } from "./ai-chat-modal"

export function AiTravelButton() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-green-600/20 rounded-2xl md:rounded-3xl blur-xl"></div>

        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-white/20 w-full"
        >
          {/* Floating icons - hidden on mobile for better performance */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl hidden sm:block">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-purple-400 opacity-30"
            >
              <Sparkles className="h-6 w-6 md:h-8 md:w-8" />
            </motion.div>

            <motion.div
              animate={{
                x: [0, -25, 0],
                y: [0, 15, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-blue-400 opacity-30"
            >
              <Plane className="h-5 w-5 md:h-6 md:w-6" />
            </motion.div>

            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute top-1/2 left-4 md:left-8 text-green-400 opacity-30"
            >
              <MapPin className="h-6 w-6 md:h-7 md:w-7" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center w-full">
            {/* AI Icon with pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4 md:mb-6 shadow-lg"
            >
              <Bot className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-3 md:mb-4 px-2"
            >
              {t.aiTravelTitle}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2"
            >
              {t.aiTravelDescription}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 px-2"
            >
              <div className="flex items-center justify-center gap-2 text-purple-600 text-sm md:text-base">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="font-medium">{t.aiFeature1}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600 text-sm md:text-base">
                <Bot className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="font-medium">{t.aiFeature2}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600 text-sm md:text-base">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="font-medium">{t.aiFeature3}</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-md mx-auto px-2"
            >
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white font-semibold px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full shadow-xl transition-all duration-300 group w-full"
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
                  </motion.div>
                  <span className="truncate">{t.aiTravelButton}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Bot className="h-4 w-4 md:h-6 md:w-6 flex-shrink-0" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 px-2"
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span>{t.aiTrustIndicator1}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span>{t.aiTrustIndicator2}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse flex-shrink-0"
                  style={{ animationDelay: "1s" }}
                ></div>
                <span>{t.aiTrustIndicator3}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* AI Chat Modal */}
      <AiChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
