import { Post } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

export function PostCard(post: Post) {
  return (
    <article className="group relative flex flex-col space-y-2">
      <h2 className="text-2xl font-extrabold">
        <Link className="link" href={post.url}>
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h2>
      <p className="text-muted-foreground line-clamp-5">
        {post.description}
      </p>
      <div className="text-sm text-muted-foreground">
        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
      </div>
    </article>
  )
}
