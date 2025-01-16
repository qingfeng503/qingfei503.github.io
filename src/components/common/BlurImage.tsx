'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface BlurImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  className?: string
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
}: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={cn(
        'duration-700 ease-in-out',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0',
        className
      )}
      onLoad={() => setLoading(false)}
    />
  )
} 