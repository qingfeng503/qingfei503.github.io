import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { calculateReadingTime } from '@/lib/utils'
import Image from 'next/image'

export function PostCard(post: Post) {
  const readingTime = calculateReadingTime(post.body.raw)

  return (
    <article className="group relative flex flex-col space-y-3 border-b border-gray-200 pb-8 dark:border-gray-700">
      <div className="flex flex-col-reverse gap-6 sm:flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            <Link href={post.url as `/posts/${string}/${string}`} className="hover:text-blue-500">
              {post.title}
            </Link>
          </h2>
          <p className="mt-2 text-gray-600 line-clamp-2 dark:text-gray-400">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>
              {format(parseISO(post.date), 'yyyy年MM月dd日')}
            </time>
            <span>·</span>
            <span>{readingTime} 分钟阅读</span>
            {post.category && (
              <>
                <span>·</span>
                <span>{post.category}</span>
              </>
            )}
          </div>
        </div>
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:w-[240px]">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(min-width: 640px) 240px, 100vw"
              priority={false}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </article>
  )
}
