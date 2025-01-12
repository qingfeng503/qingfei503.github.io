"use client"

import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'
import Link from 'next/link'

const components = {
  Image: ({ alt = '', src, ...props }: { alt?: string; src: string; [key: string]: any }) => (
    <Image
      alt={alt}
      src={src}
      {...props}
      loading="lazy"
      className="rounded-lg"
      sizes="(min-width: 1024px) 64rem, 100vw"
      width={1200}
      height={630}
    />
  ),
  a: ({ href, children }: { href: string; children: React.ReactNode }) => {
    if (href.startsWith('/')) {
      return (
        <Link href={href as `/posts/${string}/${string}`} className="text-blue-500 hover:text-blue-600">
          {children}
        </Link>
      )
    }

    if (href.startsWith('#')) {
      return (
        <a href={href} className="text-blue-500 hover:text-blue-600">
          {children}
        </a>
      )
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600"
      >
        {children}
      </a>
    )
  },
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
} 