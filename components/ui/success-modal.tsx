"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  bookingType: string
}

export function SuccessModal({ isOpen, onClose, title, message, bookingType }: SuccessModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // Auto close after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  const getIcon = () => {
    switch (bookingType) {
      case "flight":
        return "✈️"
      case "hotel":
        return "🏨"
      case "car":
        return "🚗"
      default:
        return "🎉"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col items-center text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-4"
          >
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 text-2xl"
              >
                {getIcon()}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-semibold text-green-600">{t.successLabel}</h3>
            <p className="text-gray-600 max-w-sm">{message}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>{t.processingLabel}</span>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center pb-4">
          <Button onClick={onClose} className="w-full sm:w-auto">
            {t.modalOk}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
