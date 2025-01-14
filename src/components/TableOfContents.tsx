"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const elements = Array.from(article.querySelectorAll('h2, h3, h4'))
    const headingElements = elements.map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1)),
    }))
    setHeadings(headingElements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-4 max-h-[calc(100vh-4rem)] w-full overflow-auto rounded-lg bg-gray-50/50 p-4 backdrop-blur-sm dark:bg-gray-900/50 lg:p-6">
      <h2 className="mb-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent lg:text-lg">目录</h2>
      <motion.ul 
        className="space-y-1.5 text-xs lg:space-y-2 lg:text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <a
              href={`#${heading.id}`}
              className={`block rounded-lg py-1 transition-all duration-200 hover:text-blue-500 ${
                activeId === heading.id
                  ? 'text-blue-500 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              {heading.text}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
} 