'use client'

import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlurImage } from './BlurImage'
import { calculateReadingTime } from '@/lib/utils'
import { getCategoryName, CATEGORY_MAP } from '@/lib/images'

interface PostCardProps extends Post {
    priority?: boolean
}

export function PostCard({ priority = false, ...post }: PostCardProps) {
    const readingTime = calculateReadingTime(post.body.raw)
    const tags = post.tags ? post.tags.split(',') : []

    return (
        <Link href={post.url as `/posts/${string}/${string}`} className="block h-full w-full">
            <motion.article
                whileHover={{ scale: 1.02 }}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white/50 shadow-md transition-all hover:shadow-xl dark:bg-gray-800/50"
            >
                {/* 渐变装饰 */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rotate-12 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-2xl transition-all group-hover:rotate-45" />

                {/* 内容区域 */}
                <div className="relative flex h-full flex-col space-y-4 p-6">
                    {/* 封面图 */}
                    <div className="aspect-[2/1] overflow-hidden rounded-xl">
                        <BlurImage
                            src={post.cover}
                            alt={post.title}
                            width={600}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={priority}
                        />
                    </div>

                    {/* 文章信息 */}
                    <div className="flex flex-1 flex-col justify-between space-y-4">
                        <div className="space-y-3">
                            <Link
                                href={`/categories/${post.category}`}
                                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ring-1 ring-blue-100/50 transition-colors hover:bg-blue-200 dark:bg-blue-900/70 dark:text-blue-200 dark:ring-blue-900/50 dark:hover:bg-blue-900"
                            >
                                {getCategoryName(post.category as keyof typeof CATEGORY_MAP)}
                            </Link>
                            <h2 className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-500 dark:text-gray-100 dark:group-hover:text-blue-400">
                                {post.title}
                            </h2>
                            <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                {post.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <time dateTime={post.date}>
                                    {format(parseISO(post.date), 'yyyy年MM月dd日')}
                                </time>
                                <span className="flex items-center gap-1">
                                    <span>{readingTime}</span>
                                    <span>分钟阅读</span>
                                </span>
                            </div>

                            {/* 标签 */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 ring-1 ring-gray-100/50 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-800/50"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}
