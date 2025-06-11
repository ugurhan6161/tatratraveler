"use client"

import { useEffect, useState } from "react"
import { X, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "./language-provider"
import { translations } from "@/lib/translations"

interface AiChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AiChatModal({ isOpen, onClose }: AiChatModalProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = "unset"
      setIsLoading(true)
      setHasError(false)
    }
  }, [isOpen])

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleExternalOpen = () => {
    window.open("https://chat.tatratraveler.com", "_blank", "noopener,noreferrer")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full h-full max-w-none max-h-none m-0 bg-white rounded-none md:w-[95vw] md:h-[95vh] md:max-w-7xl md:max-h-[95vh] md:m-4 md:rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <span className="text-lg">🤖</span>
                </motion.div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold">{t.aiChatTitle}</h2>
                  <p className="text-sm opacity-90">{t.aiChatSubtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExternalOpen}
                  className="text-white hover:bg-white/20 hidden md:flex"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.openInNewTab}
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="relative w-full h-[calc(100%-80px)]">
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mb-4"
                  >
                    <Loader2 className="h-12 w-12 text-purple-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aiLoadingTitle}</h3>
                  <p className="text-gray-600 text-center max-w-md">{t.aiLoadingMessage}</p>

                  {/* Loading animation */}
                  <div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Error State */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-8">
                  <div className="text-6xl mb-4">😔</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{t.aiErrorTitle}</h3>
                  <p className="text-gray-600 text-center max-w-md mb-6">{t.aiErrorMessage}</p>
                  <div className="flex gap-4">
                    <Button onClick={handleExternalOpen} className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t.openInNewTab}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      {t.close}
                    </Button>
                  </div>
                </div>
              )}

              {/* Iframe */}
              {!hasError && (
                <iframe
                  src="https://chat.tatratraveler.com"
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={t.aiChatTitle}
                  allow="camera; microphone; geolocation"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              )}
            </div>

            {/* Mobile bottom bar */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-between items-center">
              <Button variant="outline" size="sm" onClick={handleExternalOpen}>
                <ExternalLink className="h-4 w-4 mr-2" />
                {t.openInNewTab}
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                {t.close}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
