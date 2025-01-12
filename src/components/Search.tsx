"use client"

import { useState, useCallback } from 'react'
import { allPosts } from 'contentlayer/generated'
import { Post } from 'contentlayer/generated'
import { PostCard } from './PostCard'

export function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(allPosts)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)

    const filtered = allPosts.filter((post) => {
      const searchContent = post.title + post.description + post.category + post.tags
      return searchContent.toLowerCase().includes(value.toLowerCase())
    })

    setFilteredPosts(filtered)
  }, [])

  return (
    <div className="w-full space-y-4">
      <input
        type="text"
        placeholder="搜索文章..."
        value={searchValue}
        onChange={handleSearch}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  )
} 