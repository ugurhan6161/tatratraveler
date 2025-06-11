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
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-green-600/20 rounded-3xl blur-xl"></div>

        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
        >
          {/* Floating icons */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
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
              className="absolute top-4 right-4 text-purple-400 opacity-30"
            >
              <Sparkles className="h-8 w-8" />
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
              className="absolute bottom-4 left-4 text-blue-400 opacity-30"
            >
              <Plane className="h-6 w-6" />
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
              className="absolute top-1/2 left-8 text-green-400 opacity-30"
            >
              <MapPin className="h-7 w-7" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg"
            >
              <Bot className="h-10 w-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4"
            >
              {t.aiTravelTitle}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {t.aiTravelDescription}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">{t.aiFeature1}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Bot className="h-5 w-5" />
                <span className="font-medium">{t.aiFeature2}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <MapPin className="h-5 w-5" />
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
            >
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 hover:from-purple-700 hover:via-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-xl transition-all duration-300 group"
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

                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="h-6 w-6" />
                  </motion.div>
                  {t.aiTravelButton}
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <Bot className="h-6 w-6" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{t.aiTrustIndicator1}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <span>{t.aiTrustIndicator2}</span>
              </div>
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
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
