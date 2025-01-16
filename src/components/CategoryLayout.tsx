"use client"

import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'
import { motion } from 'framer-motion'

interface CategoryLayoutProps {
  category: string
  posts: Post[]
}

export function CategoryLayout({ category, posts }: CategoryLayoutProps) {
  const categoryName = getCategoryName(category as keyof typeof CATEGORY_MAP)

  return (
    <div className="min-h-screen w-full">
      {/* 类目头部 */}
      <div className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 mb-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {categoryName}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              共 {posts.length} 篇文章
            </p>
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* 文章封面图 */}
              <div className="relative h-48 sm:h-52 rounded-t-xl overflow-hidden">
                <Image
                  src={post.cover || '/images/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* 文章内容 */}
              <div className="p-4 sm:p-6">
                {/* 文章元信息 */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <time dateTime={post.date} className="tabular-nums">
                    {format(parseISO(post.date), 'yyyy年MM月dd日')}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 dark:bg-blue-400/60" />
                    {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                  </span>
                </div>

                {/* 文章标题 */}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                {/* 文章描述 */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {post.description || post.body.raw.slice(0, 150)}
                </p>

                {/* 阅读更多 */}
                <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>阅读全文</span>
                  <svg 
                    className="w-4 h-4 ml-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>

                {/* 文章链接 */}
                <Link 
                  href={`/${post.url}`} 
                  className="absolute inset-0"
                  aria-label={`阅读文章：${post.title}`}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
} 