"use client"

import Link from 'next/link'
import { useState, useCallback } from 'react'
import { allPosts } from 'contentlayer/generated'
import { Post } from 'contentlayer/generated'
import { useRouter } from 'next/navigation'

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const router = useRouter()

  // 获取所有分类和标签
  const categories = Array.from(new Set(allPosts.map((post) => post.category)))
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags.split(','))))

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }, [])

  const handleFilter = useCallback(() => {
    let filtered = allPosts

    if (searchValue) {
      filtered = filtered.filter((post) => {
        const searchContent = post.title + post.description + post.category + post.tags
        return searchContent.toLowerCase().includes(searchValue.toLowerCase())
      })
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    return filtered
  }, [searchValue, selectedCategory, selectedTag])

  const filteredPosts = handleFilter()

  return (
    <div className="relative w-full">
      <nav className="flex items-center justify-between">
        <Link className="pr-4" href="/">
          <h1 className="inline text-xl font-bold">Gino Notes</h1>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchValue}
              onChange={handleSearch}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
            >
              <option value="">所有分类</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
            >
              <option value="">所有标签</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          {filteredPosts.length > 0 && (
            <div className="max-h-96 overflow-auto">
              {filteredPosts.map((post) => (
                <button
                  key={post._id}
                  className="block w-full rounded-lg p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    router.push(post.url as `/posts/${string}/${string}`)
                    setIsSearchOpen(false)
                  }}
                >
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {post.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
