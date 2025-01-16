import { useState, useEffect, useMemo } from 'react'
import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { PostRoute } from '@/lib/routes'
import { FaSearch } from 'react-icons/fa'

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function SearchDialog({ isOpen, onClose, onOpen }: SearchDialogProps) {
  const [query, setQuery] = useState('')

  // 重置搜索状态
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC 关闭搜索
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      }
      // CMD/CTRL + K 切换搜索
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        isOpen ? onClose() : onOpen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onOpen])

  // 使用 useMemo 优化搜索结果计算
  const results = useMemo(() => {
    if (!query || query.trim().length <= 1) return []
    return allPosts
      .filter((post) => {
        const searchContent = post.title + post.description + post.category
        return searchContent.toLowerCase().includes(query.toLowerCase())
      })
      .slice(0, 5)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999]">
      {/* 遮罩层 */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 搜索框 */}
      <div className="relative mx-auto max-w-xl px-4 pt-16">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-zinc-800">
          {/* 搜索输入框 */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700">
            <FaSearch className="mx-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full bg-transparent py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-gray-100"
              autoFocus
            />
            <kbd className="hidden sm:block mr-4 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              ESC
            </kbd>
          </div>

          {/* 搜索结果 */}
          {results.length > 0 && (
            <ul className="max-h-[60vh] overflow-auto py-2">
              {results.map((post) => (
                <li key={post.url} className="group">
                  <Link
                    href={post.url as PostRoute}
                    onClick={onClose}
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-700/50"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* 空状态 */}
          {query && !results.length && (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              未找到相关文章
            </div>
          )}

          {/* 快捷键提示 */}
          {!query && (
            <div className="p-4 text-center text-xs text-gray-500 dark:text-gray-400">
              按 ESC 关闭 · 按 ⌘K 重新打开
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 