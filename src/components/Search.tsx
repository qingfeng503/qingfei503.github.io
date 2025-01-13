"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Search as SearchIcon } from 'lucide-react'

export function Search() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus()
    }
  }, [isSearchOpen])

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-600 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:text-blue-500 dark:bg-zinc-800/90 dark:text-gray-400 dark:ring-white/10 dark:hover:ring-white/20 sm:w-72"
      >
        <SearchIcon className="h-4 w-4 flex-none" />
        <span className="hidden sm:block flex-1 text-left">搜索文章...</span>
        <kbd className="hidden sm:block rounded bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">⌘K</kbd>
      </button>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur">
          <div
            ref={searchRef}
            className="container mx-auto mt-20 max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
          >
            <div className="flex items-center gap-2 mb-4">
              <SearchIcon className="h-5 w-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索文章..."
                className="w-full rounded-lg border-0 bg-transparent px-4 py-2 outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd className="hidden sm:block rounded bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">ESC</kbd>
            </div>

            {filteredPosts.length > 0 && (
              <div className="mt-4 max-h-96 overflow-auto divide-y divide-gray-100 dark:divide-gray-800">
                {filteredPosts.map((post) => (
                  <button
                    key={post._id}
                    className="block w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      router.push(post.url as `/posts/${string}/${string}`)
                      setIsSearchOpen(false)
                    }}
                  >
                    <div className="font-medium">{post.title}</div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {post.description}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
} 