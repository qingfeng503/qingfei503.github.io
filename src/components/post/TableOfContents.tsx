"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
    id: string
    text: string
    level: number
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const articleHeadings = Array.from(
            document.querySelector('.article-content')?.querySelectorAll('h2, h3') || []
        ).map(heading => ({
            id: heading.id,
            text: heading.textContent || '',
            level: Number(heading.tagName[1])
        }))
        setHeadings(articleHeadings)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            {
                rootMargin: '-20% 0% -35% 0%',
                threshold: 1.0
            }
        )

        articleHeadings.forEach(heading => {
            const element = document.getElementById(heading.id)
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [])

    if (headings.length === 0) return null

    return (
        <nav className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                目录
            </h2>
            <ul className="space-y-2.5">
                {headings.map(heading => (
                    <li
                        key={heading.id}
                        className={cn(
                            heading.level === 2 ? 'ml-0' : 'ml-4',
                        )}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                'block text-sm transition-colors duration-200',
                                heading.level === 2
                                    ? 'font-medium'
                                    : 'font-normal',
                                activeId === heading.id
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                            )}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
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