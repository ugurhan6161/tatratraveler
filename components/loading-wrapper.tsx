"use client"

import { useState, useEffect, type ReactNode } from "react"

interface LoadingWrapperProps {
  children: ReactNode
  skeleton: ReactNode
  delay?: number
}

export function LoadingWrapper({ children, skeleton, delay = 1000 }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isLoading ? skeleton : children
}
