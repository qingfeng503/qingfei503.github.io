"use client"

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const article = document.querySelector('.article-content')
    if (!article) return

    const elements = Array.from(article.querySelectorAll('h2, h3'))
    const headingItems = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1))
    }))

    setHeadings(headingItems)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="table-of-contents">
      <h2 className="toc-title">目录</h2>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item ${heading.level === 3 ? 'ml-4' : ''} ${
              activeId === heading.id ? 'active' : ''
            }`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
} 