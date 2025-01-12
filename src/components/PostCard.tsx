import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { calculateReadingTime } from '@/lib/utils'
import Image from 'next/image'

export function PostCard(post: Post) {
  const readingTime = calculateReadingTime(post.body.raw)

  return (
    <article className="group relative flex flex-col space-y-2">
      {post.cover && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(min-width: 1024px) 64rem, 100vw"
            priority={false}
            loading="lazy"
          />
        </div>
      )}
      <h2 className="text-2xl font-extrabold">
        <Link className="link" href={post.url as `/posts/${string}/${string}`}>
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h2>
      <p className="text-muted-foreground line-clamp-3">
        {post.description}
      </p>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
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
    </article>
  )
}
