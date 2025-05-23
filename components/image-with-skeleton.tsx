"use client"

import { useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImageWithSkeletonProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  skeletonClassName?: string
  priority?: boolean
}

export function ImageWithSkeleton({
  src,
  alt,
  fill,
  width,
  height,
  className,
  skeletonClassName,
  priority = false,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative", className)}>
      {isLoading && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10",
            fill ? "w-full h-full" : `w-[${width}px] h-[${height}px]`,
            skeletonClassName,
          )}
        />
      )}
      {!hasError && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          priority={priority}
          className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
      {hasError && (
        <div className={cn("flex items-center justify-center bg-muted text-muted-foreground", className)}>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  )
}
