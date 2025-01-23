"use client"

import { useEffect, useState } from 'react'
import { slugify } from '@/lib/utils'

interface TableOfContentsProps {
  headings: { level: number; text: string }[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    const headingElements = document.querySelectorAll('h2, h3, h4')
    headingElements.forEach((element) => observer.observe(element))

    return () => {
      headingElements.forEach((element) => observer.unobserve(element))
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="w-full">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">目录</h2>
        <ul className="space-y-3 text-base">
          {headings.map((heading) => {
            const id = slugify(heading.text)
            return (
              <li
                key={id}
                style={{ paddingLeft: `${(heading.level - 2) * 1.25}rem` }}
              >
                <a
                  href={`#${id}`}
                  className={`inline-block transition-colors hover:text-primary ${
                    activeId === id 
                      ? 'text-primary font-medium' 
                      : 'text-muted-foreground'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(id)
                    if (element) {
                      element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                      // 更新 URL
                      window.history.pushState({}, '', `#${id}`)
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
} 