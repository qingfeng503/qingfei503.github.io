'use client'

import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlurImage } from './BlurImage'
import { calculateReadingTime } from '@/lib/utils'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const readingTime = calculateReadingTime(post.body.raw)
  
  return (
    <Link href={post.url as `/posts/${string}/${string}`}>
      <motion.article
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/50 to-white/30 shadow-lg transition-all hover:shadow-xl dark:from-gray-800/50 dark:to-gray-800/30"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-2xl transition-all group-hover:rotate-45" />
        <div className="relative grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Link 
                href={`/categories/${post.category}`}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/70 dark:text-blue-200 dark:hover:bg-blue-900"
              >
                {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400 md:text-3xl">
                {post.title}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {post.description}
            </p>
            <div className="flex items-center gap-4">
              <time
                dateTime={post.date}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                {format(parseISO(post.date), 'yyyy年MM月dd日')}
              </time>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {readingTime} 分钟阅读
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[3/4]">
            <BlurImage
              src={post.cover}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </motion.article>
    </Link>
  )
} 